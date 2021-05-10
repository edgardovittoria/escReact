import { ArrayListeIstruttoreItem } from '../components/nuovaPrenotazioneComponent/formComponents/DataOraImpiantoIstruttoreSelezioneComponent';
import { Istruttore } from '../model/Istruttore';

import axios from 'axios';
import { AppThunk } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IstruttoreState = {
    istruttori: Istruttore[]
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
        addListaIstruttori(state: IstruttoreState, action: PayloadAction<Istruttore[]>) {
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


export const fetchIstruttori = (sport: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/istruttoriDisponibili", {params: {sport: sport}})
        dispatch(addListaIstruttori(res.data))
    } catch (error) {
        dispatch(setErrors(error))
    }

}

export const istruttoreSelector = (state: { istruttoriDisponibili: IstruttoreState }) => state.istruttoriDisponibili
// export default IstruttoreSlice.reducer;



