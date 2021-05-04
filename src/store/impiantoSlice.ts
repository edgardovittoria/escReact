import { ArrayLisetImpiantoItem } from './../components/formComponents/DataOraImpiantoRicorrenteComponent';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Impianto } from './../model/Impianto';
import { AppThunk } from './store';

export type ImpiantoState = {
    impianti: Impianto[],
    arrayListeImpianti: ArrayLisetImpiantoItem[],
    stringa: string,
    isLoading: boolean,
    errors: string
}

let listeImpiantiInit: ArrayLisetImpiantoItem[] = [];
for(let i=1; i<6; i++){
    let item: ArrayLisetImpiantoItem = {
        id: i,
        impiantiDisponibili: []
    }
    listeImpiantiInit.push(item);
}

export const ImpiantoSlice = createSlice({
    name: 'impianto',
    initialState: {
        impianti: [],
        arrayListeImpianti: listeImpiantiInit,
        stringa: "",
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
        addListaImpiantiDisponibiliAdArray(state: ImpiantoState, action: PayloadAction<ArrayLisetImpiantoItem>){
            state.isLoading = false;
            state.arrayListeImpianti.map((item) => {
                if(item.id === action.payload.id){
                    item.impiantiDisponibili = action.payload.impiantiDisponibili
                }else{
                    state.arrayListeImpianti.push(action.payload)
                }
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
    addListaImpiantiDisponibiliAdArray,
    resetListaImpiantiDisponibili,
    setLoading,
    setErrors
} = ImpiantoSlice.actions

export const fetchImpiantiDisponibili = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/impiantiDisponibili")
        dispatch(addListaImpiantiDisponibili(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const impiantoSelector = (state: { impiantiDisponibili: ImpiantoState }) => state.impiantiDisponibili
