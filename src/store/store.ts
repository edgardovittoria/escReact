import { SportivoSlice } from './sportivoSlice';
import { ImpiantoSlice } from './impiantoSlice';
import { SportSlice } from './SportSlice';
import { PrenotazioneSlice } from './prenotazioneSlice';
import { Action, combineReducers, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { SportivoAutenticatoSlice } from './sportivoAutenticatoSlice';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

//viene salvato lo stato dell'applicazione nel localStorage



const rootReducer = combineReducers({
  sportivo : SportivoAutenticatoSlice.reducer,
  prenotazioni: PrenotazioneSlice.reducer,
  sportPraticabili: SportSlice.reducer,
  impiantiDisponibili: ImpiantoSlice.reducer,
  sportiviInvitabili: SportivoSlice.reducer
});

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export let persistor = persistStore(store)


export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>


