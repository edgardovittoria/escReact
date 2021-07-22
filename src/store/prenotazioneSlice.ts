/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import axios from 'axios';
import { AppThunk } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appuntamento } from '../model/Appuntamento';
import { Prenotazione } from '../model/Prenotazone';
import { addListaImpiantiDisponibiliAdArray } from './formPrenotaImpiantoSlice';
import { addListaSportPraticabili } from './SportSlice';
import { addListaInvitabili } from './utentePolisportivaSlice';
import { addListaIstruttori } from './IstruttoreSlice';
import { addListaSquadreInvitabili } from './squadraSlice';
import {FormPrenotazione} from "../model/FormPrenotazione";
import {
    ArrayLisetImpiantoItem,
    ArrayListeIstruttoreItem, DatiAvviaPrenotazione,
    DatiIscrizioneEventoEsistente,
    DatiPerAggiornamentoOpzioni
} from "../model/TipiAusiliari";

export type PrenotazioneState = {
    prenotazioni: Prenotazione[]
    partecipazioni: Appuntamento[]
    prenotazioniCorso: Prenotazione[]
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
        prenotazioniCorso: [],
        corsiDisponibili: [],
        appuntamentiSottoscrivibili: [],
        prenotazioneDaConfermare: {
            idPrenotazione: null,
            sportivoPrenotante: {
                nome: "",
                cognome: "",
                email: "",
                ruoli: [],
                attributiExtra: {
                    moroso: false,
                    sportPraticati: [],
                    appuntamentiSportivo: [],
                    appuntamentiLezioni: [],
                    appuntamentiManutentore: []
                }
            },
            appuntamenti: [],
            infoGeneraliEvento: {
                numeroMassimoPartecipanti: -1,
                numeroMinimoPartecipanti: -1,
                costoPerPartecipante: -1,
                nomeEvento: ""
            },
            tipoEventoNotificabile: "PRENOTAZIONE"
        },
        isLoading: false,
        errors: ""
    } as PrenotazioneState,
    reducers: {
        addPrenotazioneDaConfermare(state: PrenotazioneState, action: PayloadAction<Prenotazione>) {
            state.isLoading = false
            state.prenotazioneDaConfermare = action.payload
        },
        resetPrenotazioneDaConfermare(state: PrenotazioneState) {
            state.prenotazioneDaConfermare = {
                idPrenotazione: null,
                sportivoPrenotante: {
                    nome: "",
                    cognome: "",
                    email: "",
                    ruoli: [],
                    attributiExtra: {
                        moroso: false,
                        sportPraticati: [],
                        appuntamentiSportivo: [],
                        appuntamentiLezioni: [],
                        appuntamentiManutentore: []
                    }
                },
                appuntamenti: [],
                infoGeneraliEvento: {
                    numeroMassimoPartecipanti: -1,
                    numeroMinimoPartecipanti: -1,
                    costoPerPartecipante: -1,
                    nomeEvento: ""
                },
            }
        },
        addPrenotazione(state: PrenotazioneState, action: PayloadAction<Prenotazione>) {
            state.isLoading = false
            state.errors = ""
            state.prenotazioni.push(action.payload)
            alert("La prenotazione è avvenuta con successo!");
        },
        addListaPrenotazioni(state: PrenotazioneState, action: PayloadAction<Prenotazione[]>) {
            state.isLoading = false
            state.errors = ""
            state.prenotazioni = action.payload
        },
        addListaPartecipazioni(state: PrenotazioneState, action: PayloadAction<Appuntamento[]>) {
            state.isLoading = false;
            state.errors = "";
            state.partecipazioni = action.payload
        },
        addListaPrenotazioniCorso(state: PrenotazioneState, action: PayloadAction<Prenotazione[]>) {
            state.isLoading = false;
            state.errors = "";
            state.prenotazioniCorso = [];
            action.payload.map((prenotazione) => {
                state.prenotazioniCorso.push(prenotazione)
            })

        },
        addListaCorsiDiponibili(state: PrenotazioneState, action: PayloadAction<Prenotazione[]>) {
            state.isLoading = false;
            state.errors = "";
            state.corsiDisponibili = [];
            action.payload.map((prenotazione) => {
                state.corsiDisponibili.push(prenotazione)
            })
        },
        addAppuntamentiSottoscrivibili(state: PrenotazioneState, action: PayloadAction<Appuntamento[]>) {
            state.isLoading = false
            state.errors = ""
            state.appuntamentiSottoscrivibili = action.payload
        },
        setLoading(state: PrenotazioneState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setErrors(state: PrenotazioneState, action: PayloadAction<string>) {
            state.errors = action.payload
        }
    }
});

export const {
    addPrenotazioneDaConfermare,
    resetPrenotazioneDaConfermare,
    addPrenotazione,
    addListaPartecipazioni,
    addListaPrenotazioniCorso,
    addListaCorsiDiponibili,
    addAppuntamentiSottoscrivibili,
    setLoading,
    setErrors
} = PrenotazioneSlice.actions

export const prenotazioneSelector = (state: { prenotazioni: PrenotazioneState }) => state.prenotazioni
export const prenotazioniSelector = (state: { prenotazioni: PrenotazioneState }) => state.prenotazioni.prenotazioni
export const corsiDisponibiliSelector = (state: { prenotazioni: PrenotazioneState }) => state.prenotazioni.corsiDisponibili
export const partecipazioniSelector = (state: { prenotazioni: PrenotazioneState }) => state.prenotazioni.partecipazioni
export const corsiPrenotatiSelector = (state: { prenotazioni: PrenotazioneState }) => state.prenotazioni.prenotazioniCorso

export const avviaNuovaPrenotazione = (datiAvviaPrenotazione: DatiAvviaPrenotazione): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/avviaNuovaPrenotazione", datiAvviaPrenotazione)
        if (datiAvviaPrenotazione.tipoPrenotazione === "LEZIONE") {
            dispatch(addListaSportPraticabili(res.data.sportPraticabili))
        } else if (datiAvviaPrenotazione.tipoPrenotazione === "IMPIANTO") {
            dispatch(addListaSportPraticabili(res.data.sportPraticabili))
            if (datiAvviaPrenotazione.modalitaPrenotazione === "SINGOLO_UTENTE") {
                dispatch(addListaInvitabili(res.data.sportiviInvitabili))
                dispatch(addAppuntamentiSottoscrivibili(res.data.appuntamentiSottoscrivibili))
            }else{
                dispatch(addListaSquadreInvitabili(res.data.squadreInvitabili))
                dispatch(addAppuntamentiSottoscrivibili(res.data.appuntamentiSottoscrivibiliSquadra))
            }

        } else if (datiAvviaPrenotazione.tipoPrenotazione === "CORSO") {
            dispatch(addListaCorsiDiponibili(res.data.corsiDisponibili))
        }
        
        
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
    }

}

export const avviaNuovaPrenotazioneEventoDirettore = (datiAvviaPrenotazione: DatiAvviaPrenotazione): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/avviaNuovaPrenotazioneEventoDirettore", datiAvviaPrenotazione)
        dispatch(addListaSportPraticabili(res.data.sportPraticabili))
        dispatch(addListaInvitabili(res.data.sportiviInvitabili))
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
        console.log(error)
        alert("Non sei autorizzato!")
        window.location.href = "http://localhost:3000/profiloSportivo";
    }

}


export const riepilogoPrenotazione = (prenotazione: FormPrenotazione): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/riepilogoPrenotazione", prenotazione )
        let prenotazioneDaConfermare: Prenotazione = {
            idPrenotazione: res.data.idPrenotazione,
            sportivoPrenotante: res.data.sportivoPrenotante,
            appuntamenti: res.data.appuntamenti,
            infoGeneraliEvento: res.data.infoGeneraliEvento,
        }
        dispatch(addPrenotazioneDaConfermare(prenotazioneDaConfermare))
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const confermaPrenotazione = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/confermaPrenotazione", null )
        if(res.status === 201){
            alert("Prenotazione Confermata!!!")
        }else {
            alert("Prenotazione NON Riuscita!!!")
        }

    } catch (error) {
        dispatch(setErrors(error))
    }

}


export const aggiornaOpzioniPrenotazione = (object: DatiPerAggiornamentoOpzioni): AppThunk => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/aggiornaDatiOpzioni", object)
        let item: ArrayLisetImpiantoItem = {
            id: object.orario?.id,
            impiantiDisponibili: res.data.impiantiDisponibili
        }
        if(res.data.istruttoriDisponibili !== undefined){
            let item: ArrayListeIstruttoreItem = {
                id: object.orario?.id,
                istruttoriDisponibili: res.data.istruttoriDisponibili
            }
            dispatch(addListaIstruttori(item.istruttoriDisponibili))
        }
        dispatch(addListaImpiantiDisponibiliAdArray(item))
        dispatch(addListaInvitabili(res.data.sportiviInvitabili))
        dispatch(addListaSquadreInvitabili(res.data.squadreInvitabili))
    } catch (error) {
        dispatch(setErrors(error));
    }

}


export const partecipazioneEventoEsistente = (datiIscrizioneEventoEsistente: DatiIscrizioneEventoEsistente): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.patch("http://localhost:8080/effettuaPrenotazione/partecipazioneEventoEsistente", datiIscrizioneEventoEsistente)
        alert("Partecipazione Effettuata!")
        if (res.status === 204) {
            alert("Partecipazione confermata")
        }
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const annullaCreazioneCorso = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        await axios.delete("http://localhost:8080/effettuaPrenotazione/annullaCreazioneCorso")
    } catch (error) {
        dispatch(setErrors(error))
    }

}




export default PrenotazioneSlice.reducer;