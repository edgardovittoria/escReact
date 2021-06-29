/* eslint-disable array-callback-return */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Impianto } from '../model/Impianto'

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
            state.errors = ""
            action.payload.forEach((impianto) => {
                state.impianti.push(impianto)
            })
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
    resetListaImpiantiDisponibili,
    setLoading,
    setErrors
} = ImpiantoSlice.actions


export const impiantoSelector = (state: { impiantiDisponibili: ImpiantoState }) => state.impiantiDisponibili
