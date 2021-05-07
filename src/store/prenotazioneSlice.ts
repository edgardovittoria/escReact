import { FormPrenotaLezione } from './../components/nuovaPrenotazioneComponent/FormPrenotazioneLezioneComponent';
import { FormPrenotaImpianto } from './../components/nuovaPrenotazioneComponent/FormPrenotazioneImpiantoRicorrenteComponent';
import { ArrayLisetImpiantoItem } from './../components/formComponents/DataOraImpiantoRicorrenteComponent';
import axios from 'axios';
import { AppThunk } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Prenotazione } from './../model/Prenotazone';
import { addListaImpiantiDisponibili, addListaImpiantiDisponibiliAdArray, resetListaImpiantiDisponibili } from './impiantoSlice';
import { addListaSportPraticabili } from './SportSlice';
import { addListaInvitabili } from './sportivoSlice';

export type PrenotazioneState = {
    prenotazioni: Prenotazione[]
    prenotazioneDaConfermare: Prenotazione
    isLoading: boolean
    errors: string
}


export const PrenotazioneSlice = createSlice({
    name: 'prenotazione',
    initialState: {
        prenotazioni: [],
        prenotazioneDaConfermare: {
            sportivoPrenotante: {
                nome: "",
                cognome: "",
                email: "",
                sportPraticati: []
            },
            appuntamenti: []
        },
        isLoading: false,
        errors: ""
    } as PrenotazioneState,
    reducers: {
        addPrenotazioneDaConfermare(state: PrenotazioneState, action: PayloadAction<Prenotazione>){
            state.isLoading = false
            state.prenotazioneDaConfermare = action.payload
        },
        resetPrenotazioneDaConfermare(state: PrenotazioneState){
            state.prenotazioneDaConfermare = {
                sportivoPrenotante: {
                    nome: "",
                    cognome: "",
                    email: "",
                    sportPraticati: []
                },
                appuntamenti: []
            }
        },
        addPrenotazione(state: PrenotazioneState, action: PayloadAction<Prenotazione>){
            state.isLoading = false
            state.errors = ""
            state.prenotazioni.push(action.payload)
            alert("La prenotazione è avvenuta con successo!");
        },
        addListaPrenotazioni(state: PrenotazioneState, action: PayloadAction<Prenotazione[]>){
            state.isLoading = false
            state.errors = ""
            state.prenotazioni = action.payload
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
    addPrenotazioneDaConfermare,
    resetPrenotazioneDaConfermare,
    addPrenotazione,
    addListaPrenotazioni,
    setLoading,
    setErrors
} = PrenotazioneSlice.actions

export const prenotazioneSelector = (state: { prenotazioni: PrenotazioneState }) => state.prenotazioni
export const prenotazioniSelector = (state: { prenotazioni: PrenotazioneState }) => state.prenotazioni.prenotazioni


export const avviaNuovaPrenotazione = (emailSportivo: string, tipoPren: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/avviaNuovaPrenotazione", {params: {email: emailSportivo, tipoPrenotazione: tipoPren}})
        dispatch(addListaSportPraticabili(res.data.sportPraticabili))
        dispatch(addListaInvitabili(res.data.sportiviPolisportiva))
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
    }

}


export const riepilogoPrenotazione = (prenotazione: FormPrenotaImpianto | FormPrenotaLezione): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/riepilogoPrenotazione", prenotazione)
        dispatch(addPrenotazioneDaConfermare(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const confermaPrenotazione = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/confermaPrenotazione")
        dispatch(addPrenotazione(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}


export const fetchPrenotazioni = (emailSportivo: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/aggiornaOpzioni/prenotazioniSportivo/", {params: {email: emailSportivo}})
        dispatch(addListaPrenotazioni(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const aggiornaImpianti = (object: any): AppThunk => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/aggiornaImpianti", object)
        dispatch(resetListaImpiantiDisponibili())
        dispatch(addListaImpiantiDisponibili(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const aggiornaImpiantiRicorrente = (object: any, id: number): AppThunk => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/aggiornaImpianti", object)
        let item: ArrayLisetImpiantoItem = {
            id: id,
            impiantiDisponibili: res.data
        }
        dispatch(addListaImpiantiDisponibiliAdArray(item))
    } catch (error) {
        dispatch(setErrors(error));
    }

}

export default PrenotazioneSlice.reducer;



