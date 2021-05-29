import { Prenotazione } from './../model/Prenotazone';
import { Notifica } from './../model/Notifica';
/* eslint-disable array-callback-return */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from './store';

export type NotificheState = {
    notifiche: Notifica[]
    dettagliNotifica: Prenotazione
    isLoading: boolean,
    errors: string
}

export const NotificheSlice = createSlice({
    name: 'notifiche',
    initialState: {
        notifiche: [],
        dettagliNotifica: {
            idPrenotazione: null,
            sportivoPrenotante: {
                nome: "",
                cognome: "",
                email: "",
                ruoli: [],
                attributiExtra: new Map<string, object>()
            },
            appuntamenti: [],
            infoGeneraliEvento: new Map<string, object>(),
            tipoEventoNotificabile: ""

        },
        isLoading: false,
        errors: ""
    } as NotificheState,
    reducers: {
        addListaNotificheUtente(state: NotificheState, action: PayloadAction<Notifica[]>) {
            state.isLoading = false
            state.notifiche = action.payload
        },
        addDettagliNotifica(state: NotificheState, action: PayloadAction<Prenotazione>){
            state.isLoading= false
            state.dettagliNotifica = action.payload
        },
        setLoading(state: NotificheState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setErrors(state: NotificheState, action: PayloadAction<string>) {
            state.errors = action.payload
        }
    }
})

export const {
    addListaNotificheUtente,
    addDettagliNotifica,
    setLoading,
    setErrors
} = NotificheSlice.actions

export const fetchNotifiche = (emailSportivo: string, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/aggiornaOpzioni/notificheUtente", { params: { email: emailSportivo }, headers: { "Authorization": "Bearer " + jwt } })
        dispatch(addListaNotificheUtente(res.data));
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const fetchDettagliNotificha = (idEvento: number, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/notifiche/dettagliNotifica", { params: { idEvento: idEvento }, headers: { "Authorization": "Bearer " + jwt } })
        dispatch(addDettagliNotifica(res.data));
    } catch (error) {
        dispatch(setErrors(error))
    }

}


export const notificheSelector = (state: { notificheUtente: NotificheState }) => state.notificheUtente
