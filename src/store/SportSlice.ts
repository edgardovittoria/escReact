import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Sport } from '../model/Sport';
import { AppThunk } from './store';

export type SportState = {
    sports: Sport[],
    isLoading: boolean,
    errors: string
}

export const SportSlice = createSlice({
    name: 'sport',
    initialState: {
        sports: [],
        isLoading: false,
        errors: ""
    } as SportState,
    reducers: {
        addListaSportPraticabili(state: SportState, action: PayloadAction<Sport[]>) {
            state.isLoading = false;
            action.payload.forEach((sport) => {
                state.sports.push(sport)
            })
        },
        resetListaSportPraticabili(state: SportState){
            state.sports = []
        },
        setLoading(state: SportState, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        setErrors(state: SportState, action: PayloadAction<string>){
            state.errors = action.payload
        }
    }
})

export const {
    addListaSportPraticabili,
    resetListaSportPraticabili,
    setLoading,
    setErrors
} = SportSlice.actions

export const fetchSportPraticabili = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("http://localhost:8080/effettuaPrenotazione/sportPraticabili")
        dispatch(addListaSportPraticabili(res.data))
    } catch (error) {
        dispatch(setErrors("Internal Server Error"))
    }

}

export const sportSelector = (state: { sportPraticabili: SportState }) => state.sportPraticabili
