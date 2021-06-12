import { Prenotazione } from '../model/Prenotazone';
import { Notifica } from '../model/Notifica';
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
                attributiExtra: {
                    moroso: false,
                    sportPraticati: []
                }
            },
            appuntamenti: [],
            infoGeneraliEvento: {
                numeroMassimoPartecipanti: -1,
                numeroMinimoParteciapanti: -1,
                costoPerPartecipante: -1,
                invitatiCorso: []
            },
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
        impostaNotificaLetta(state: NotificheState, action: PayloadAction<Notifica>) {
            let notificheNonModificate: Notifica[]
            notificheNonModificate = state.notifiche.filter(notifica => notifica.idNotifica !== action.payload.idNotifica)
            notificheNonModificate.push(action.payload)
            state.notifiche = notificheNonModificate
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
    impostaNotificaLetta,
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

export const fetchDettagliNotificha = (idEvento: number, tipoEventoNotificabile: string, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/notifiche/dettagliNotifica", { params: { idEvento: idEvento, tipoEventoNotificabile: tipoEventoNotificabile }, headers: { "Authorization": "Bearer " + jwt } })
        dispatch(addDettagliNotifica(res.data));
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const setNotificaLetta = (idNotifica: number, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        let object = {
            idNotifica: idNotifica
        }
        const res = await axios.patch("http://localhost:8080/notifiche/impostaNotificaLetta", object , {headers: { "Authorization": "Bearer " + jwt } })
        dispatch(impostaNotificaLetta(res.data));
    } catch (error) {
        dispatch(setErrors(error))
    }

}



export const notificheSelector = (state: { notificheUtente: NotificheState }) => state.notificheUtente
