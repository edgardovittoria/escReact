import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Impianto } from './../model/Impianto';
import { AppThunk } from './store';

export type ImpiantoState = {
    impianti: Impianto[],
    isLoading: boolean,
    errors: string
}

export const ImpiantoSlice = createSlice({
    name: 'impianto',
    initialState: {
        impianti: [],
        isLoading: false,
        errors: ""
    } as ImpiantoState,
    reducers: {
        addListaImpiantiDisponibili(state: ImpiantoState, action: PayloadAction<Impianto[]>) {
            state.isLoading = false;
            action.payload.forEach((impianto) => {
                state.impianti.push(impianto)
            })
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
    setLoading,
    setErrors
} = ImpiantoSlice.actions

export const fetchImpiantiDisponibili = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/impiantiDisponibili")
        dispatch(addListaImpiantiDisponibili(res.data))
    } catch (error) {
        dispatch(setErrors("Internal Server Error"))
    }

}

export const impiantoSelector = (state: { impiantiDisponibili: ImpiantoState }) => state.impiantiDisponibili
