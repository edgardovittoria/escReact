/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormCorso } from '../pages/creazioneCorso/components/FormCreazioneCorso';
/* eslint-disable array-callback-return */
import { FormPrenotaLezione } from '../pages/nuovaPrenotazioneUtenteSingolo/prenotazioneLezione/components/FormPrenotazioneLezione';
import { FormPrenotaImpianto } from '../pages/nuovaPrenotazioneUtenteSingolo/prenotazioneImpianto/components/FormPrenotazioneImpiantoRicorrente';
import { ArrayLisetImpiantoItem } from '../components/formComponents/DataOraImpiantoRicorrente';
import axios from 'axios';
import { AppThunk } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appuntamento } from '../model/Appuntamento';
import { Prenotazione } from '../model/Prenotazone';
import { addListaImpiantiDisponibili, resetListaImpiantiDisponibili } from './impiantoSlice';
import { addListaImpiantiDisponibiliAdArray } from './formPrenotaImpiantoSlice';
import { addListaSportPraticabili } from './SportSlice';
import { addListaInvitabili } from './utentePolisportivaSlice';
import { ArrayListeIstruttoreItem } from '../components/formComponents/DataOraImpiantoIstruttoreSelezione';
import { addListaIstruttori } from './IstruttoreSlice';
import { addListaNotificheUtente } from './notificheSlice';
import { addListaSquadre, addListaSquadreInvitabili } from './squadraSlice';
import { FormPrenotaImpiantoSquadra } from '../pages/nuovaPrenotazioneSquadra/nuovaPrenotazioneImpiantoSquadra/components/FormPrenotazioneImpiantoSquadraRicorrente';

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
                numeroMinimoParteciapanti: -1,
                costoPerPartecipante: -1,
                invitatiCorso: []
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
                    numeroMinimoParteciapanti: -1,
                    costoPerPartecipante: -1,
                    invitatiCorso: []
                },
                tipoEventoNotificabile: "PRENOTAZIONE"
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
    addListaPrenotazioni,
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

export const avviaNuovaPrenotazione = (emailSportivo: string, idSquadra: number, tipoPren: string, modalitaPrenotazione: string, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/avviaNuovaPrenotazione", { params: { email: emailSportivo, idSquadra: idSquadra, tipoPrenotazione: tipoPren, modalitaPrenotazione: modalitaPrenotazione }, headers: { "Authorization": "Bearer " + jwt } })
        if (tipoPren === "LEZIONE") {
            dispatch(addListaSportPraticabili(res.data.sportPraticabili))
        } else if (tipoPren === "IMPIANTO") {
            dispatch(addListaSportPraticabili(res.data.sportPraticabili))
            if (modalitaPrenotazione === "SINGOLO_UTENTE") {
                dispatch(addListaInvitabili(res.data.sportiviInvitabili))
                dispatch(addAppuntamentiSottoscrivibili(res.data.appuntamentiSottoscrivibili))
            }else{
                dispatch(addListaSquadreInvitabili(res.data.squadreInvitabili))
                dispatch(addAppuntamentiSottoscrivibili(res.data.appuntamentiSottoscrivibiliSquadra))
            }

        } else if (tipoPren === "CORSO") {
            dispatch(addListaCorsiDiponibili(res.data.corsiDisponibili))
        }
        
        
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
    }

}

export const avviaNuovaPrenotazioneEventoDirettore = (emailSportivo: string, tipoPren: string, modalitaPrenotazione: string, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/avviaNuovaPrenotazioneEventoDirettore", { params: { email: emailSportivo, tipoPrenotazione: tipoPren, modalitaPrenotazione: modalitaPrenotazione }, headers: { "Authorization": "Bearer " + jwt } })
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


export const riepilogoPrenotazione = (prenotazione: FormPrenotaImpianto | FormPrenotaLezione | FormCorso | FormPrenotaImpiantoSquadra, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/riepilogoPrenotazione", prenotazione, { headers: { "Authorization": "Bearer " + jwt } })
        let prenotazioneDaConfermare: Prenotazione = {
            idPrenotazione: res.data.idPrenotazione,
            sportivoPrenotante: res.data.sportivoPrenotante,
            appuntamenti: res.data.appuntamenti,
            infoGeneraliEvento: res.data.infoGeneraliEvento,
            tipoEventoNotificabile: "PRENOTAZIONE"
        }
        dispatch(addPrenotazioneDaConfermare(prenotazioneDaConfermare))
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const confermaPrenotazione = (jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        await axios.post("http://localhost:8080/effettuaPrenotazione/confermaPrenotazione", null, { headers: { "Authorization": "Bearer " + jwt } })
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const creaCorso = (jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        await axios.post("http://localhost:8080/effettuaPrenotazione/confermaPrenotazione", null, { headers: { "Authorization": "Bearer " + jwt } })
        //dispatch(addPrenotazione(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}


export const fetchPrenotazioni = (emailSportivo: string, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/aggiornaOpzioni/prenotazioniEPartecipazioniSportivo/", { params: { email: emailSportivo }, headers: { "Authorization": "Bearer " + jwt } })
        dispatch(addListaSquadre(res.data.squadre))
        dispatch(addListaNotificheUtente(res.data.notificheUtente))
        dispatch(addListaPrenotazioni(res.data.prenotazioniEffettuate))
        dispatch(addListaPartecipazioni(res.data.partecipazioni))
        dispatch(addListaPrenotazioniCorso(res.data.corsiACuiSiPartecipa))


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

export const aggiornaImpiantiEInvitabili = (object: any, id: number, jwt: string): AppThunk => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/aggiornaDatiOpzioni", object, { headers: { "Authorization": "Bearer " + jwt } })
        let item: ArrayLisetImpiantoItem = {
            id: id,
            impiantiDisponibili: res.data.impiantiDisponibili
        }
        dispatch(addListaImpiantiDisponibiliAdArray(item))
        dispatch(addListaInvitabili(res.data.sportiviInvitabili))
        dispatch(addListaSquadreInvitabili(res.data.squadreInvitabili))
    } catch (error) {
        dispatch(setErrors(error));
    }

}

export const aggiornaIstruttori = (object: any, id: number, jwt: string): AppThunk => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/effettuaPrenotazione/aggiornaDatiOpzioni", object, { headers: { "Authorization": "Bearer " + jwt } })
        let item: ArrayListeIstruttoreItem = {
            id: id,
            istruttoriDisponibili: res.data.istruttoriDisponibili
        }
        dispatch(addListaIstruttori(item.istruttoriDisponibili))
    } catch (error) {
        dispatch(setErrors(error));
    }

}

export const partecipazioneEventoEsistente = (idEvento: number | null, identificativoPartecipante: string | number, tipoPrenotazione: string, modalitaPrenotazione: string, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        let object = {
            idEvento: idEvento,
            identificativoPartecipante: identificativoPartecipante,
            tipoPrenotazione: tipoPrenotazione,
            modalitaPrenotazione: modalitaPrenotazione
        }
        const res = await axios.patch("http://localhost:8080/effettuaPrenotazione/partecipazioneEventoEsistente", object, { headers: { "Authorization": "Bearer " + jwt } })
        alert("Partecipazione Effettuata!")
        if (res.status === 204) {
            alert("Partecipazione confermata")
        }
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const partecipazioneCorso = (idEvento: number | null, emailPartecipante: string, tipoPrenotazione: string, modalitaPrenotazione: string, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        let object = {
            idEvento: idEvento,
            emailPartecipante: emailPartecipante,
            tipoPrenotazione: tipoPrenotazione,
            modalitaPrenotazione: modalitaPrenotazione
        }
        const res = await axios.patch("http://localhost:8080/effettuaPrenotazione/partecipazioneEventoEsistente", object, { headers: { "Authorization": "Bearer " + jwt } })
        let partecipazione: Prenotazione[] = [];
        partecipazione.push(res.data)
        dispatch(addListaPrenotazioniCorso(partecipazione))
        alert("Corso Prenotato!")
    } catch (error) {
        dispatch(setErrors(error))
    }

}



export default PrenotazioneSlice.reducer;