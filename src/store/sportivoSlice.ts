import { Sportivo } from '../model/Sportivo';

import axios from 'axios';
import { AppThunk } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SportivoState = {
    sportivi: Sportivo[]
    isLoading: boolean
    errors: string
}


export const SportivoSlice = createSlice({
    name: 'sportivi',
    initialState: {
        sportivi: [],
        isLoading: false,
        errors: ""
    } as SportivoState,
    reducers: {
        addListaInvitabili(state: SportivoState, action: PayloadAction<Sportivo[]>) {
            state.isLoading = false
            action.payload.forEach((sportivo) => {
                state.sportivi.push(sportivo)
            })
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
    addListaInvitabili,
    setLoading,
    setErrors
} = SportivoSlice.actions

export const sportivoSelector = (state: { sportivo: SportivoState }) => state.sportivo

export const fetchSportiviInvitabili = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/sportiviPolisportiva")
        dispatch(addListaInvitabili(res.data))
    } catch (error) {
        dispatch(setErrors("Internal Server Error"))
    }

}

export default SportivoSlice.reducer;



