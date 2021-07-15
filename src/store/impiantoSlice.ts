/* eslint-disable array-callback-return */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Impianto} from '../model/Impianto'
import {AppThunk} from "./store";
import axios from "axios";
import {addListaSportPraticabili} from "./SportSlice";

export type ImpiantoState = {
    impianti: Impianto[],
    pavimentazioniDisponibili: string[],
    impiantoDaCreare: Impianto,
    messaggioNotificaDaConfermare: string,
    isLoading: boolean,
    errors: string
}

export const ImpiantoSlice = createSlice({
    name: 'impianto',
    initialState: {
        impianti: [],
        pavimentazioniDisponibili: [],
        impiantoDaCreare: {
            idImpianto: -1,
            indoor: false,
            pavimentazione: "",
            sportPraticabili: [],
            appuntamenti: []
        },
        messaggioNotificaDaConfermare: "",
        isLoading: false,
        errors: ""
    } as ImpiantoState,
    reducers: {
        addListaImpiantiDisponibili(state: ImpiantoState, action: PayloadAction<Impianto[]>) {
            state.isLoading = false;
            state.errors = ""
            action.payload.forEach((impianto) => {
                state.impianti.push(impianto)
            })
        },
        addListaPavimentazioniDisponibili(state: ImpiantoState, action: PayloadAction<string[]>){
            state.isLoading = false;
            state.errors = ""
            state.pavimentazioniDisponibili = action.payload
        },
        addImpiantoDaCreare(state: ImpiantoState, action: PayloadAction<Impianto>){
            state.isLoading = false
            state.errors = ""
            state.impiantoDaCreare = action.payload
        },
        addMessaggioNotificaDaConfermare(state: ImpiantoState, action: PayloadAction<string>){
            state.isLoading = false
            state.errors = ""
            state.messaggioNotificaDaConfermare = action.payload
        },
        resetListaImpiantiDisponibili(state: ImpiantoState){
            state.impianti = []
        },
        setLoading(state: ImpiantoState, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        setErrors(state: ImpiantoState, action: PayloadAction<string>){
            state.errors = action.payload
        }
    }
})

export const {
    addListaImpiantiDisponibili,
    addListaPavimentazioniDisponibili,
    addImpiantoDaCreare,
    resetListaImpiantiDisponibili,
    addMessaggioNotificaDaConfermare,
    setLoading,
    setErrors
} = ImpiantoSlice.actions

export const avviaCreazioneImpianto = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/promuoviPolisportiva/avviaCreazioneStruttura", {params: {tipoNuovaStruttura: "IMPIANTO"}})
        dispatch(addListaSportPraticabili(res.data.sportPraticabili))
        dispatch(addListaPavimentazioniDisponibili(res.data.pavimentazioniDisponibili))
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
        alert("Internal server error!")
        window.location.href = "http://localhost:3000/profiloSportivo";
    }

}

export const riepilogoCreazioneImpianto = (impiantoDaCreare: Impianto): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/promuoviPolisportiva/riepilogoCreazioneStruttura", impiantoDaCreare)
        dispatch(addImpiantoDaCreare(res.data))
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
        alert("Internal server error!")
        window.location.href = "http://localhost:3000/profiloSportivo";
    }

}

export const confermaCreazioneImpianto = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/promuoviPolisportiva/confermaCreazioneStruttura")
        if(res.status === 201){
            let confirm = window.confirm("Impianto aggiunto correttamente! Vuoi inviare una notifica agli utenti della polisportiva?")
            if(confirm){
                window.location.href = "http://localhost:3000/invioNotificaCreazioneImpianto";
            }else {
                window.location.href = "http://localhost:3000/profiloSportivo";
            }

        }
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
        alert("Internal server error!")
        window.location.href = "http://localhost:3000/profiloSportivo";
    }

}

export const messaggioNotificaCreazioneImpianto = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/promuoviPolisportiva/messaggioNotificaCreazioneStruttura")
        dispatch(addMessaggioNotificaDaConfermare(res.data))
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
        alert("Internal server error!")
        window.location.href = "http://localhost:3000/profiloSportivo";
    }

}

export const inviaNotificheCreazioneImpianto = (object: any): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/promuoviPolisportiva/invioNotificheCreazioneNuovaStruttura", object)
        if(res.status === 201){
            alert("Notifiche Inviate!")
            window.location.href = "http://localhost:3000/profiloSportivo";
        }
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
        alert("Internal server error!")
        window.location.href = "http://localhost:3000/profiloSportivo";
    }

}

export const impiantoSelector = (state: { impiantiDisponibili: ImpiantoState }) => state.impiantiDisponibili
