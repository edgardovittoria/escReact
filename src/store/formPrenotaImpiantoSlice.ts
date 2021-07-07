/* eslint-disable array-callback-return */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ArrayCheckBoxPendingItem, ArrayLisetImpiantoItem} from "../model/TipiAusiliari";


export type FormPrenotaImpiantoState = {
    arrayListeImpianti: ArrayLisetImpiantoItem[],
    arrayListeCheckBoxPending: ArrayCheckBoxPendingItem[]
}

let listeImpiantiInit: ArrayLisetImpiantoItem[] = [];
for(let i=1; i<6; i++){
    let item: ArrayLisetImpiantoItem = {
        id: i,
        impiantiDisponibili: []
    }
    listeImpiantiInit.push(item);
}

let listaCheckBox: ArrayCheckBoxPendingItem[] = [];
for(let i=1; i<6; i++){
    let item: ArrayCheckBoxPendingItem = {
        id: i,
        checkboxPending: false
    }
    listaCheckBox.push(item);
}

export const FormPrenotaImpiantoSlice = createSlice({
    name: 'formPrenotaImpianto',
    initialState: {
        arrayListeImpianti: listeImpiantiInit,
        arrayListeCheckBoxPending: listaCheckBox
    } as FormPrenotaImpiantoState,
    reducers: {
        addListaImpiantiDisponibiliAdArray(state: FormPrenotaImpiantoState, action: PayloadAction<ArrayLisetImpiantoItem>){
            state.arrayListeImpianti.map((item) => {
                if(item.id === action.payload.id){
                    item.impiantiDisponibili = action.payload.impiantiDisponibili
                }
            })
        },
        addListaCheckBoxPending(state: FormPrenotaImpiantoState, action: PayloadAction<ArrayCheckBoxPendingItem>){
            state.arrayListeCheckBoxPending.map((item) => {
                if(item.id === action.payload.id){
                    item.checkboxPending = action.payload.checkboxPending
                }else{
                    state.arrayListeCheckBoxPending.push(action.payload)
                }
            })
        }
    }
})

export const {
    addListaImpiantiDisponibiliAdArray,
    addListaCheckBoxPending
} = FormPrenotaImpiantoSlice.actions


export const formPrenotaImpiantoSelector = (state: { formPrenotazioneImpianto: FormPrenotaImpiantoState }) => state.formPrenotazioneImpianto;
