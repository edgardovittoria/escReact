/* eslint-disable array-callback-return */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Impianto, impiantoDefault} from '../model/Impianto'
import {AppThunk} from "./store";
import axios from "axios";
import {addListaSportPraticabili} from "./SportSlice";
import {addListaInvitabili} from "./utentePolisportivaSlice";

export type ImpiantoState = {
    impianti: Impianto[],
    pavimentazioniDisponibili: string[],
    impiantoDaCreare: Impianto
    isLoading: boolean,
    errors: string
}

export const ImpiantoSlice = createSlice({
    name: 'impianto',
    initialState: {
        impianti: [],
        pavimentazioniDisponibili: [],
        impiantoDaCreare: impiantoDefault,
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
    setLoading,
    setErrors
} = ImpiantoSlice.actions

export const avviaCreazioneImpianto = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/promuoviPolisportiva/avviaCreazioneImpianto")
        dispatch(addListaSportPraticabili(res.data.sportPraticabili))
        dispatch(addListaPavimentazioniDisponibili(res.data.pavimentazioniDisponibili))
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
        console.log(error)
        alert("Non sei autorizzato!")
        window.location.href = "http://localhost:3000/profiloSportivo";
    }

}

export const riepilogoCreazioneImpianto = (impiantoDaCreare: Impianto): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/promuoviPolisportiva/riepilogoCreazioneImpianto", impiantoDaCreare)
        dispatch(addImpiantoDaCreare(res.data))
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
        console.log(error)
        alert("Non sei autorizzato!")
        window.location.href = "http://localhost:3000/profiloSportivo";
    }

}


export const impiantoSelector = (state: { impiantiDisponibili: ImpiantoState }) => state.impiantiDisponibili
