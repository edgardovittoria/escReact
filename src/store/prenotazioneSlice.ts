/* eslint-disable array-callback-return */
import { FormPrenotaLezione } from '../components/nuovaPrenotazioneComponent/prenotazioneLezione/FormPrenotazioneLezioneComponent';
import { FormPrenotaImpianto } from '../components/nuovaPrenotazioneComponent/prenotazioneImpianto/FormPrenotazioneImpiantoRicorrenteComponent';
import { ArrayLisetImpiantoItem } from '../components/nuovaPrenotazioneComponent/formComponents/DataOraImpiantoRicorrenteComponent';
import axios from 'axios';
import { AppThunk } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appuntamento } from './../model/Appuntamento';
import { Prenotazione } from './../model/Prenotazone';
import { addListaImpiantiDisponibili, resetListaImpiantiDisponibili } from './impiantoSlice';
import { addListaImpiantiDisponibiliAdArray } from './formPrenotaImpiantoSlice';
import { addListaSportPraticabili } from './SportSlice';
import { addListaInvitabili } from './sportivoSlice';
import { ArrayListeIstruttoreItem } from '../components/nuovaPrenotazioneComponent/formComponents/DataOraImpiantoIstruttoreSelezioneComponent';
import { addListaIstruttori } from './IstruttoreSlice';

export type PrenotazioneState = {
    prenotazioni: Prenotazione[]
    partecipazioni: Appuntamento[]
    appuntamentiSottoscrivibili: Appuntamento[]
    prenotazioneDaConfermare: Prenotazione
    isLoading: boolean
    errors: string
}


export const PrenotazioneSlice = createSlice({
    name: 'prenotazione',
    initialState: {
        prenotazioni: [],
        partecipazioni: [],
        appuntamentiSottoscrivibili: [],
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
        addListaPartecipazioni(state: PrenotazioneState, action: PayloadAction<Appuntamento[]>){
            state.isLoading = false;
            state.errors = "";
            state.partecipazioni = action.payload
        },
        addAppuntamentiSottoscrivibili(state: PrenotazioneState, action: PayloadAction<Appuntamento[]>){
            state.isLoading = false
            state.errors = ""
            state.appuntamentiSottoscrivibili = action.payload
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
    addListaPartecipazioni,
    addAppuntamentiSottoscrivibili,
    setLoading,
    setErrors
} = PrenotazioneSlice.actions

export const prenotazioneSelector = (state: { prenotazioni: PrenotazioneState }) => state.prenotazioni
export const prenotazioniSelector = (state: { prenotazioni: PrenotazioneState }) => state.prenotazioni.prenotazioni
export const partecipazioniSelector = (state: {prenotazioni: PrenotazioneState}) => state.prenotazioni.partecipazioni

export const avviaNuovaPrenotazione = (emailSportivo: string, tipoPren: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/avviaNuovaPrenotazione", {params: {email: emailSportivo, tipoPrenotazione: tipoPren}})
        dispatch(addListaSportPraticabili(res.data.sportPraticabili))
        dispatch(addListaInvitabili(res.data.sportiviPolisportiva))
        dispatch(addAppuntamentiSottoscrivibili(res.data.appuntamentiSottoscrivibili))
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
        const res = await axios.get("http://localhost:8080/aggiornaOpzioni/prenotazioniEPartecipazioniSportivo/", {params: {email: emailSportivo}})
        dispatch(addListaPrenotazioni(res.data.prenotazioniEffettuate))
        dispatch(addListaPartecipazioni(res.data.partecipazioni))
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
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/aggiornaDatiOpzioni", object)
        let item: ArrayLisetImpiantoItem = {
            id: id,
            impiantiDisponibili: res.data.impiantiDisponibili
        }
        dispatch(addListaImpiantiDisponibiliAdArray(item))
    } catch (error) {
        dispatch(setErrors(error));
    }

}

export const aggiornaIstruttori = (object: any, id: number): AppThunk => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/aggiornaDatiOpzioni", object)
        let item: ArrayListeIstruttoreItem = {
            id: id,
            istruttoriDisponibili: res.data.istruttoriDisponibili
        }
        dispatch(addListaIstruttori(item.istruttoriDisponibili))
    } catch (error) {
        dispatch(setErrors(error));
    }

}

export const partecipazioneEventoEsistente = (idEvento: number, emailPartecipante: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true)); 
        let object = {
            idEvento: idEvento,
            emailPartecipante: emailPartecipante
        }
        const res = await axios.patch("http://localhost:8080/effettuaPrenotazione/partecipazioneEventoEsistente", object)
        console.log(JSON.stringify(res.data))
        let partecipazione: Appuntamento[] = [];
        partecipazione.push(res.data)
        dispatch(addListaPartecipazioni(partecipazione))
        alert("Partecipazione Effettuata!")
        if(res.status === 204){
            alert("Partecipazione confermata")
        }
    } catch (error) {
        dispatch(setErrors(error))
    }

}



export default PrenotazioneSlice.reducer;