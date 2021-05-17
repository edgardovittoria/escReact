import { UserDetails } from './../model/UserDetails';
/* eslint-disable array-callback-return */
import { Sportivo } from '../model/Sportivo';

import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SportivoAutenticatoState = {
    sportivo: Sportivo
    isLoading: boolean
    errors: string
}

export const loginSportivo = createAsyncThunk("sportivo/login",
    async (userDetails: UserDetails, tunkAPI) =>  {
        try {
            const response = await axios.post('http://localhost:8080/login', userDetails)
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
        isLoading: false,
        errors: ""
    } as SportivoAutenticatoState,
    reducers: {
        resetLocalStorsageState(){
            localStorage.clear()
        }
    },
    extraReducers: {
        [loginSportivo.fulfilled.type]: (state: SportivoAutenticatoState, action: PayloadAction<Sportivo>) => {
            state.sportivo = action.payload
            state.isLoading = false
            state.errors = ""
        },
        [loginSportivo.pending.type]: (state: SportivoAutenticatoState) => {
            state.isLoading = true
        },
        [loginSportivo.rejected.type]: (state: SportivoAutenticatoState, action: PayloadAction<string>) => {
            state.sportivo = {
                nome: "",
                cognome: "",
                email: "",
                sportPraticati: []
            }
            state.errors = action.payload
            state.isLoading = false;
            alert("Username o Password sbagliati. RIPROVA!!!")
            window.location.href = "http://localhost:3000/";       
        }
    }
});

export const {
    resetLocalStorsageState
} = SportivoAutenticatoSlice.actions

export const sportivoAutenticatoSelector = (state: { sportivo: SportivoAutenticatoState }) => state.sportivo

export default SportivoAutenticatoSlice.reducer;



