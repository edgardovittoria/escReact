import { Notifica } from './../model/Notifica';
/* eslint-disable array-callback-return */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from './store';

export type NotificheState = {
    notifiche: Notifica[]
    isLoading: boolean,
    errors: string
}

export const NotificheSlice = createSlice({
    name: 'notifiche',
    initialState: {
        notifiche: [],
        isLoading: false,
        errors: ""
    } as NotificheState,
    reducers: {
        addListaNotifiche(state: NotificheState, action: PayloadAction<Notifica[]>){
            console.log(action.payload)
            state.notifiche = action.payload
        },
        setLoading(state: NotificheState, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        setErrors(state: NotificheState, action: PayloadAction<string>){
            state.errors = action.payload
        }
    }
})

export const {
    addListaNotifiche,
    setLoading,
    setErrors
} = NotificheSlice.actions

export const fetchNotifiche = (emailSportivo: string, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/aggiornaOpzioni/notificheUtente", {params: {email: emailSportivo}, headers:{"Authorization": "Bearer "+jwt}})
        dispatch(addListaNotifiche(res.data));
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const notificheSelector = (state: { notifiche: NotificheState }) => state.notifiche
