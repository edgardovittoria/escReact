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
                email: ""
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
                    email: ""
                },
                appuntamenti: []
            }
        },
        addPrenotazione(state: PrenotazioneState, action: PayloadAction<Prenotazione>){
            state.isLoading = false
            state.prenotazioni.push(action.payload)
            alert("La prenotazione è avvenuta con successo!");
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
    addPrenotazioneDaConfermare,
    resetPrenotazioneDaConfermare,
    addPrenotazione,
    addListaPrenotazioni,
    setLoading,
    setErrors
} = PrenotazioneSlice.actions

export const prenotazioneSelector = (state: { prenotazioni: PrenotazioneState }) => state.prenotazioni

export const avviaNuovaPrenotazione = (emailSportivo: string, tipoPren: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/avviaNuovaPrenotazione", {params: {email: emailSportivo, tipoPrenotazione: tipoPren}})
        dispatch(addListaImpiantiDisponibili(res.data.impiantiDisponibili))
        dispatch(addListaSportPraticabili(res.data.sportPraticabili))
        dispatch(addListaInvitabili(res.data.sportiviPolisportiva))
        //dispatch(addListaPrenotazioni(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const riepilogoPrenotazione = (prenotazione: FormPrenotaImpianto): AppThunk => async dispatch => {
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

// export const aggiungiPrenotazione = (prenotazione: Prenotazione): AppThunk => async dispatch => {
//     try {
//         dispatch(setLoading(true));
//         const res = await axios.post("url", prenotazione)
//         console.log(res);
//         dispatch(addPrenotazioneDaConfermare(prenotazione))
//     } catch (error) {
//         dispatch(setErrors(error))
//     }

// }

export const fetchPrenotazioni = (emailSportivo: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("url", {params: {email: emailSportivo}})
        dispatch(addListaPrenotazioni(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export default PrenotazioneSlice.reducer;



