import { Sportivo } from '../model/Sportivo';

import axios from 'axios';
import { AppThunk } from './store';
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
        }
    }
});

export const {
    setSportivo,
    setLoading,
    setErrors
} = SportivoAutenticatoSlice.actions

export const sportivoSelector = (state: { sportivo: SportivoAutenticatoState }) => state.sportivo

export const loginSportivo = (email: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get('http://localhost:8080/aggiornaOpzioni/sportivo', {params: {email: email}})
        dispatch(setSportivo(res.data))
    } catch (error) {
        dispatch(setErrors("Internal Server Error"))
    }

}

export default SportivoAutenticatoSlice.reducer;



