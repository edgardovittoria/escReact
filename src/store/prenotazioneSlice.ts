import { FormCorso } from './../components/nuovaPrenotazioneComponent/prenotazioneCorso/FormCreazioneCorsoComponent';
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
    corsiDisponibili: Prenotazione[]
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
        corsiDisponibili: [],
        appuntamentiSottoscrivibili: [],
        prenotazioneDaConfermare: {
            idPrenotazione: null,
            sportivoPrenotante: {
                nome: "",
                cognome: "",
                email: "",
                sportPraticati: []
            },
            appuntamenti: [],
            infoGeneraliEvento: new Map<string, object>()
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
                idPrenotazione: null,
                sportivoPrenotante: {
                    nome: "",
                    cognome: "",
                    email: "",
                    sportPraticati: []
                },
                appuntamenti: [],
                infoGeneraliEvento: new Map<string, object>()
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
        addListaCorsiDiponibili(state: PrenotazioneState, action: PayloadAction<Prenotazione[]>){
            state.isLoading = false;
            state.errors = "";
            let infoGenerali: any = action.payload[0].infoGeneraliEvento
            let mappaInfoGenerali = new Map<string, object>(
                Object.keys(infoGenerali).map(k => [k, infoGenerali[k]])
            );
            state.corsiDisponibili = [];
            action.payload.map((prenotazione) => {
                prenotazione.infoGeneraliEvento = mappaInfoGenerali
                state.corsiDisponibili.push(prenotazione)
            })
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
    addListaCorsiDiponibili,
    addAppuntamentiSottoscrivibili,
    setLoading,
    setErrors
} = PrenotazioneSlice.actions

export const prenotazioneSelector = (state: { prenotazioni: PrenotazioneState }) => state.prenotazioni
export const prenotazioniSelector = (state: { prenotazioni: PrenotazioneState }) => state.prenotazioni.prenotazioni
export const corsiDisponibiliSelector = (state: {prenotazioni: PrenotazioneState}) => state.prenotazioni.corsiDisponibili
export const partecipazioniSelector = (state: {prenotazioni: PrenotazioneState}) => state.prenotazioni.partecipazioni

export const avviaNuovaPrenotazione = (emailSportivo: string, tipoPren: string, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/avviaNuovaPrenotazione", {params: {email: emailSportivo, tipoPrenotazione: tipoPren}, headers:{"Authorization": "Bearer "+jwt}})
        if(tipoPren === "LEZIONE"){
            dispatch(addListaSportPraticabili(res.data.sportPraticabili))
        }else if(tipoPren === "IMPIANTO"){
            dispatch(addListaSportPraticabili(res.data.sportPraticabili))
            dispatch(addListaInvitabili(res.data.sportiviInvitabili))
            dispatch(addAppuntamentiSottoscrivibili(res.data.appuntamentiSottoscrivibili))
        }else if(tipoPren === "CORSO"){
            dispatch(addListaCorsiDiponibili(res.data.corsiDisponibili))
        }
        
        
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
    }

}

export const avviaNuovaPrenotazioneEventoDirettore = (emailSportivo: string, tipoPren: string, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/avviaNuovaPrenotazioneEventoDirettore", {params: {email: emailSportivo, tipoPrenotazione: tipoPren}, headers:{"Authorization": "Bearer "+jwt}})
        dispatch(addListaSportPraticabili(res.data.sportPraticabili))
        dispatch(addListaInvitabili(res.data.sportiviInvitabili))
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
    }

}


export const riepilogoPrenotazione = (prenotazione: FormPrenotaImpianto | FormPrenotaLezione | FormCorso, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/riepilogoPrenotazione", prenotazione, {headers:{"Authorization": "Bearer "+jwt}}) 
        let mappaInfoGenerali = new Map<string, object>(
            Object.keys(res.data.infoGeneraliEvento).map(k => [k, res.data.infoGeneraliEvento[k]])
        );
        let prenotazioneDaConfermare: Prenotazione = {
            idPrenotazione: res.data.idPrenotazione,
            sportivoPrenotante: res.data.sportivoPrenotante,
            appuntamenti: res.data.appuntamenti,
            infoGeneraliEvento: mappaInfoGenerali
        }
        dispatch(addPrenotazioneDaConfermare(prenotazioneDaConfermare))
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const confermaPrenotazione = (jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/confermaPrenotazione", null, {headers:{"Authorization": "Bearer "+jwt}})
        dispatch(addPrenotazione(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const creaCorso = (jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        await axios.post("http://localhost:8080/effettuaPrenotazione/confermaPrenotazione", null, {headers:{"Authorization": "Bearer "+jwt}})
        //dispatch(addPrenotazione(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}


export const fetchPrenotazioni = (emailSportivo: string, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/aggiornaOpzioni/prenotazioniEPartecipazioniSportivo/", {params: {email: emailSportivo}, headers:{"Authorization": "Bearer "+jwt}})
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

export const aggiornaImpiantiRicorrente = (object: any, id: number, jwt: string): AppThunk => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/aggiornaDatiOpzioni", object, {headers:{"Authorization": "Bearer "+jwt}})
        let item: ArrayLisetImpiantoItem = {
            id: id,
            impiantiDisponibili: res.data.impiantiDisponibili
        }
        dispatch(addListaImpiantiDisponibiliAdArray(item))
    } catch (error) {
        dispatch(setErrors(error));
    }

}

export const aggiornaIstruttori = (object: any, id: number, jwt: string): AppThunk => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/aggiornaDatiOpzioni", object, {headers:{"Authorization": "Bearer "+jwt}})
        let item: ArrayListeIstruttoreItem = {
            id: id,
            istruttoriDisponibili: res.data.istruttoriDisponibili
        }
        dispatch(addListaIstruttori(item.istruttoriDisponibili))
    } catch (error) {
        dispatch(setErrors(error));
    }

}

export const partecipazioneEventoEsistente = (idEvento: number | null, emailPartecipante: string, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true)); 
        let object = {
            idEvento: idEvento,
            emailPartecipante: emailPartecipante
        }
        const res = await axios.patch("http://localhost:8080/effettuaPrenotazione/partecipazioneEventoEsistente", object, {headers:{"Authorization": "Bearer "+jwt}})
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