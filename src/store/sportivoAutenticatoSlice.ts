import { UtentePolisportiva } from './../model/UtentePolisportiva';
import { UserDetails } from './../model/UserDetails';
/* eslint-disable array-callback-return */

import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
        resetSportivoAutenticato(state: SportivoAutenticatoState, action: PayloadAction<void>){
            state.jwt = ""
            let mappaVuotaAttributiExtra = new Map<string, object>()
            state.sportivo = {
                nome: "",
                cognome: "",
                email: "",
                ruoli: [],
                attributiExtra: mappaVuotaAttributiExtra
            }
            
        }
    },
    extraReducers: {
        [loginSportivo.fulfilled.type]: (state: SportivoAutenticatoState, action: PayloadAction<AutenticazioneResponse>) => {
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
                attributiExtra: new Map<string, object>()
            }
            state.errors = action.payload
            state.isLoading = false;
            alert("Username o Password sbagliati. RIPROVA!!!")
            window.location.href = "http://localhost:3000/";       
        }
    }
});

export const {
    resetSportivoAutenticato
} = SportivoAutenticatoSlice.actions

export const sportivoAutenticatoSelector = (state: { sportivo: SportivoAutenticatoState }) => state.sportivo

export default SportivoAutenticatoSlice.reducer;



