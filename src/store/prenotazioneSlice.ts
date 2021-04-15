import { FormPrenotaImpianto } from './../components/nuovaPrenotazioneComponent/DataOraSelezioneComponent';
import axios from 'axios';
import { AppThunk } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Prenotazione } from './../model/Prenotazone';
import { addListaImpiantiDisponibili } from './impiantoSlice';
import { addListaSportPraticabili } from './SportSlice';
import { addListaInvitabili } from './sportivoSlice';

export type PrenotazioneState = {
    prenotazioni: Prenotazione[]
    isLoading: boolean
    errors: string
}


export const PrenotazioneSlice = createSlice({
    name: 'prenotazione',
    initialState: {
        prenotazioni: [],
        isLoading: false,
        errors: ""
    } as PrenotazioneState,
    reducers: {
        addPrenotazione(state: PrenotazioneState, action: PayloadAction<Prenotazione>){
            state.isLoading = false
            state.prenotazioni.push(action.payload)
        },
        addListaPrenotazioni(state: PrenotazioneState, action: PayloadAction<Prenotazione[]>){
            state.isLoading = false
            action.payload.forEach((prenotazione) => {
                state.prenotazioni.push(prenotazione)
            })
        },
        setLoading(state: PrenotazioneState, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        setErrors(state: PrenotazioneState, action: PayloadAction<string>){
            state.errors = action.payload
        }
    }
});

export const {
    addPrenotazione,
    addListaPrenotazioni,
    setLoading,
    setErrors
} = PrenotazioneSlice.actions

export const prenotazioneSelector = (state: { prenotazione: PrenotazioneState }) => state.prenotazione

export const avviaNuovaPrenotazione = (emailSportivo: string, tipoPren: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/avviaNuovaPrenotazione", {params: {email: emailSportivo, tipoPrenotazione: tipoPren}})
        dispatch(addListaImpiantiDisponibili(res.data.impiantiDisponibili))
        dispatch(addListaSportPraticabili(res.data.sportPraticabili))
        dispatch(addListaInvitabili(res.data.sportiviPolisportiva))
        //dispatch(addListaPrenotazioni(res.data))
    } catch (error) {
        dispatch(setErrors("Internal Server Error"))
    }

}

export const confermaPrenotazione = (prenotazione: FormPrenotaImpianto): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/confermaPrenotazione", prenotazione)
        //console.log(res.data)
        dispatch(addPrenotazione(res.data))
    } catch (error) {
        dispatch(setErrors("Internal Server Error"))
    }

}

export const aggiungiPrenotazione = (prenotazione: Prenotazione): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("url", prenotazione)
        console.log(res);
        dispatch(addPrenotazione(prenotazione))
    } catch (error) {
        dispatch(setErrors("Internal Server Error"))
    }

}

export const fetchPrenotazioni = (emailSportivo: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("url", {params: {email: emailSportivo}})
        dispatch(addListaPrenotazioni(res.data))
    } catch (error) {
        dispatch(setErrors("Internal Server Error"))
    }

}

export default PrenotazioneSlice.reducer;



