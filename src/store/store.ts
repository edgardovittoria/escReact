import { PrenotazioneSlice } from './prenotazioneSlice';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { SportivoSlice } from './sportivoSlice';


const rootReducer = combineReducers({
  sportivo : SportivoSlice.reducer,
  prenotazioni: PrenotazioneSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>


export default store;