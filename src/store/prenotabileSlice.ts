/* eslint-disable array-callback-return */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {DatiPerCreazioneNuovoPrenotabile} from "../model/TipiAusiliari";
import {AppThunk} from "./store";
import axios from "axios";
import {setErrors, setLoading} from "./impiantoSlice";

export type PrenotabileState = {
    prenotabileDaConfermare: DatiPerCreazioneNuovoPrenotabile,
    isLoading: boolean,
    errors: string
}


export const PrenotabileSlice = createSlice({
    name: 'prenotabile',
    initialState: {
        prenotabileDaConfermare: {
            numeroDate: 2,
            scontoPercentuale: 0
        },
        isLoading: false,
        errors: ""
    } as PrenotabileState,
    reducers: {
        addPrenotabileDaConfermare(state: PrenotabileState, action: PayloadAction<DatiPerCreazioneNuovoPrenotabile>) {
            state.isLoading = false;
            state.errors = ""
            state.prenotabileDaConfermare = action.payload

        }
    }
})

export const {
    addPrenotabileDaConfermare
} = PrenotabileSlice.actions


export const confermaCreazioneNuovoPrenotabile = (datiPerCreazioneNuovoPrenotabile: DatiPerCreazioneNuovoPrenotabile): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("http://localhost:8080/promuoviPolisportiva/creazioneNuovoPrenotabile", datiPerCreazioneNuovoPrenotabile)
        if(res.status === 200){
            alert("Il pacchetto scontato di "+res.data.numeroLezioni+" lezioni è stato creato!");
            window.location.href = "http://localhost:3000/profiloSportivo";
        }
    } catch (error) {
        dispatch(setLoading(false))
        dispatch(setErrors(error))
        alert("Internal server error!")
        window.location.href = "http://localhost:3000/profiloSportivo";
    }

}

export const prenotabileSelector = (state: { prenotabile: PrenotabileState }) => state.prenotabile
