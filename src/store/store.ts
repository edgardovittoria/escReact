import { SportivoSlice } from './sportivoSlice';
import { ImpiantoSlice } from './impiantoSlice';
import { SportSlice } from './SportSlice';
import { PrenotazioneSlice } from './prenotazioneSlice';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { SportivoAutenticatoSlice } from './sportivoAutenticatoSlice';


const rootReducer = combineReducers({
  sportivo : SportivoAutenticatoSlice.reducer,
  prenotazioni: PrenotazioneSlice.reducer,
  sportPraticabili: SportSlice.reducer,
  impiantiDisponibili: ImpiantoSlice.reducer,
  sportiviInvitabili: SportivoSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>


export default store;