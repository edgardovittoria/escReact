import { UtentePolisportiva } from '../model/UtentePolisportiva';
/* eslint-disable array-callback-return */

import axios from 'axios';
import { AppThunk } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UtentePolisportivaState = {
    sportivi: UtentePolisportiva[]
    isLoading: boolean
    errors: string
}


export const UtentePolisportivaSlice = createSlice({
    name: 'sportivi',
    initialState: {
        sportivi: [],
        isLoading: false,
        errors: ""
    } as UtentePolisportivaState,
    reducers: {
        addListaInvitabili(state: UtentePolisportivaState, action: PayloadAction<UtentePolisportiva[]>) {
            state.isLoading = false
            state.sportivi = action.payload
        },
        resetListaInvitabili(state: UtentePolisportivaState){
            state.sportivi = []
        },
        setLoading(state: UtentePolisportivaState, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        setErrors(state: UtentePolisportivaState, action: PayloadAction<string>){
            state.errors = action.payload
        }
    }
});

export const {
    addListaInvitabili,
    resetListaInvitabili,
    setLoading,
    setErrors
} = UtentePolisportivaSlice.actions

export const utentePolisportivaSelector = (state: { sportiviInvitabili: UtentePolisportivaState }) => state.sportiviInvitabili

export const fetchSportiviInvitabili = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/sportiviPolisportiva")
        dispatch(addListaInvitabili(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export default UtentePolisportivaSlice.reducer;



