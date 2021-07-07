import { UtentePolisportiva } from '../model/UtentePolisportiva';
/* eslint-disable array-callback-return */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ArrayListeIstruttoreItem} from "../model/TipiAusiliari";

export type IstruttoreState = {
    istruttori: UtentePolisportiva[]
    arrayListeIstruttori: ArrayListeIstruttoreItem[]
    isLoading: boolean
    errors: string
}

let listeIstruttoriInit: ArrayListeIstruttoreItem[] = [];
for(let i=1; i<6; i++){
    let item: ArrayListeIstruttoreItem = {
        id: i,
        istruttoriDisponibili: []
    }
    listeIstruttoriInit.push(item);
}

export const IstruttoreSlice = createSlice({
    name: 'istruttori',
    initialState: {
        istruttori: [],
        arrayListeIstruttori: listeIstruttoriInit,
        isLoading: false,
        errors: ""
    } as IstruttoreState,
    reducers: {
        addListaIstruttori(state: IstruttoreState, action: PayloadAction<UtentePolisportiva[]>) {
            state.isLoading = false
            state.arrayListeIstruttori.map((item) => {
                item.istruttoriDisponibili = action.payload
            })
        },
        resetListaIstruttori(state: IstruttoreState){
            state.istruttori = []
        },
        setLoading(state: IstruttoreState, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        setErrors(state: IstruttoreState, action: PayloadAction<string>){
            state.errors = action.payload
        }
    }
});

export const {
    addListaIstruttori,
    resetListaIstruttori,
    setLoading,
    setErrors
} = IstruttoreSlice.actions


export const istruttoreSelector = (state: { istruttoriDisponibili: IstruttoreState }) => state.istruttoriDisponibili



