/* eslint-disable array-callback-return */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sport } from '../model/Sport';

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
            state.sports = action.payload
        },
        resetListaSportPraticabili(state: SportState) {
            state.sports = []
        }
    }
})

export const {
    addListaSportPraticabili,
    resetListaSportPraticabili,
} = SportSlice.actions


export const sportSelector = (state: { sportPraticabili: SportState }) => state.sportPraticabili
