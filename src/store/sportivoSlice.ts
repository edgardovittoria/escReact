import { Sportivo } from './../model/Sportivo';

import axios from 'axios';
import { AppThunk } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SportivoState = {
    sportivo: Sportivo
    isLoading: boolean
    errors: string
}


export const SportivoSlice = createSlice({
    name: 'sportivo',
    initialState: {
        sportivo: {},
        isLoading: false,
        errors: ""
    } as SportivoState,
    reducers: {
        setSportivo(state: SportivoState, action: PayloadAction<Sportivo>) {
           state.isLoading = false 
           state.sportivo = action.payload
        },
        setLoading(state: SportivoState, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        setErrors(state: SportivoState, action: PayloadAction<string>){
            state.errors = action.payload
        }
    }
});

export const {
    setSportivo,
    setLoading,
    setErrors
} = SportivoSlice.actions

export const sportivoSelector = (state: { sportivo: SportivoState }) => state.sportivo

export const loginSportivo = (email: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get('http://localhost:8080/aggiornaOpzioni/sportivo', {params: {email: email}})
        dispatch(setSportivo(res.data))
    } catch (error) {
        dispatch(setErrors("Internal Server Error"))
    }

}

export default SportivoSlice.reducer;



