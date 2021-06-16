/* eslint-disable array-callback-return */
import { Squadra } from '../model/Squadra';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AppThunk} from "./store";
import axios from "axios";
import {addListaNotificheUtente, setErrors, setLoading} from "./notificheSlice";

export type SquadraState = {
    squadre: Squadra[]
    squadraSelezionata: Squadra
    squadreInvitabili: Squadra[]
    isLoading: boolean
    errors: string
}


export const SquadraSlice = createSlice({
    name: 'squadra',
    initialState: {
        squadre: [],
        squadraSelezionata: {
            idSquadra: -1,
            nome: "",
            sport: {
                nome: "",
                postiLiberi: 0,
                numeroMinimoGiocatoriPerSquadra: 0
            },
            membri: [],
            amministratori: [],
            appuntamenti: []
        },
        squadreInvitabili: [],
        isLoading: false,
        errors: ""
    } as SquadraState,
    reducers: {
        addListaSquadre(state: SquadraState, action: PayloadAction<Squadra[]>){
            state.isLoading = false
            state.errors = ""
            state.squadre = action.payload
        },
        addSquadraSelezionata(state: SquadraState, action: PayloadAction<Squadra>){
            state.isLoading = false
            state.errors = ""
            state.squadraSelezionata = action.payload
        },
        addListaSquadreInvitabili(state: SquadraState, action: PayloadAction<Squadra[]>){
            state.isLoading = false
            state.errors = ""
            state.squadreInvitabili = action.payload
        }
    }
});

export const {
   addListaSquadre,
   addSquadraSelezionata,
   addListaSquadreInvitabili
} = SquadraSlice.actions

export const fetchSquadre = (emailSportivo: string, jwt: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/aggiornaOpzioni/squadreSportivo", { params: { email: emailSportivo }, headers: { "Authorization": "Bearer " + jwt } })
        dispatch(addListaSquadre(res.data));
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const squadraSelector = (state: { squadre: SquadraState }) => state.squadre



export default SquadraSlice.reducer;



