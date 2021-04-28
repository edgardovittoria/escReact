import { Sportivo } from '../model/Sportivo';

import axios from 'axios';
import { AppThunk, RootState } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SportivoAutenticatoState = {
    sportivo: Sportivo
    isLoading: boolean
    errors: string
}


export const SportivoAutenticatoSlice = createSlice({
    name: 'sportivo',
    initialState: {
        sportivo: {},
        isLoading: false,
        errors: ""
    } as SportivoAutenticatoState,
    reducers: {
        setSportivo(state: SportivoAutenticatoState, action: PayloadAction<Sportivo>) {
           state.isLoading = false 
           state.sportivo = action.payload
        },
        setLoading(state: SportivoAutenticatoState, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        setErrors(state: SportivoAutenticatoState, action: PayloadAction<string>){
            state.errors = action.payload
        },
        resetLocalStorsageState(){
            localStorage.clear()
        }
    }
});

export const {
    setSportivo,
    setLoading,
    setErrors,
    resetLocalStorsageState
} = SportivoAutenticatoSlice.actions

export const sportivoAutenticatoSelector = (state: { sportivo: SportivoAutenticatoState }) => state.sportivo

export const loginSportivo = (email: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get('http://localhost:8080/aggiornaOpzioni/sportivo', {params: {email: email}})
        dispatch(setSportivo(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export default SportivoAutenticatoSlice.reducer;



