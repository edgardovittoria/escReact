import { UtentePolisportiva } from '../model/UtentePolisportiva';
import { UserDetails } from '../model/UserDetails';
/* eslint-disable array-callback-return */

import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AppThunk} from "./store";
import {setErrors, setLoading} from "./prenotazioneSlice";

export type SportivoAutenticatoState = {
    sportivo: UtentePolisportiva
    jwt: string
    isLoading: boolean
    errors: string
}

type AutenticazioneResponse = {
    sportivo: UtentePolisportiva,
    jwt: string
}

export const loginSportivo = createAsyncThunk("sportivo/login",
    async (userDetails: UserDetails, tunkAPI) =>  {
        try {
            const response = await axios.post('http://localhost:8080/autenticazione', userDetails)
            return response.data
        } catch (error) {
            return tunkAPI.rejectWithValue(error.message)
        }
        
    }
)


export const SportivoAutenticatoSlice = createSlice({
    name: 'sportivo',
    initialState: {
        sportivo: {},
        jwt: "",
        isLoading: false,
        errors: ""
    } as SportivoAutenticatoState,
    reducers: {
        resetSportivoAutenticato(state: SportivoAutenticatoState){
            state.jwt = ""
            state.sportivo = {
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
            }
        },
        aggiornaSportivo(state: SportivoAutenticatoState, action: PayloadAction<UtentePolisportiva>){
            state.isLoading = false
            state.errors = ""
            state.sportivo = action.payload
        }
    },
    extraReducers: {
        [loginSportivo.fulfilled.type]: (state: SportivoAutenticatoState, action: PayloadAction<AutenticazioneResponse>) =>  {
            state.sportivo = action.payload.sportivo
            state.jwt = action.payload.jwt
            state.isLoading = false
            state.errors = ""
            window.location.href = "http://localhost:3000/profiloSportivo"
        },
        [loginSportivo.pending.type]: (state: SportivoAutenticatoState) => {
            state.isLoading = true
        },
        [loginSportivo.rejected.type]: (state: SportivoAutenticatoState, action: PayloadAction<string>) => {
            state.sportivo = {
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
            }
            state.errors = action.payload
            state.isLoading = false;
            alert("Username o Password sbagliati. RIPROVA!!!")
            window.location.href = "http://localhost:3000/";       
        }
    }
});

export const {
    resetSportivoAutenticato,
    aggiornaSportivo
} = SportivoAutenticatoSlice.actions

export const fetchSportivo = (emailSportivo: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/aggiornaOpzioni/sportivo/", { params: { email: emailSportivo }})
        dispatch(aggiornaSportivo(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}


export const sportivoAutenticatoSelector = (state: { sportivo: SportivoAutenticatoState }) => state.sportivo

export default SportivoAutenticatoSlice.reducer;



