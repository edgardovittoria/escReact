import React from 'react';
import './App.css';
import {store} from './store/store';
import {persistor} from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ProfiloSportivo } from './components/profiloSportivoComponent/ProfiloSportivoComponent';
import { Login } from './components/loginComponent/LoginComponent';
import { NuovaPrenotazioneImpianto } from './components/nuovaPrenotazioneComponent/NuovaPrenotazioneImpiantoComponent';
import { RiepilogoPrenotazione } from './components/riepilogoPrenotazioneComponent/RiepilogoPrenotazioneComponent';
import { NuovaPrenotazioneLezione } from './components/nuovaPrenotazioneComponent/NuovaPrenotazioneLezioneComponent';



export const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <BrowserRouter>
        <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/profiloSportivo"><ProfiloSportivo /></Route>
          <Route path="/nuovaPrenotazioneImpianto"><NuovaPrenotazioneImpianto/></Route>
          <Route path="/nuovaPrenotazioneLezione"><NuovaPrenotazioneLezione/></Route>
          <Route path="/riepilogoPrenotazione"><RiepilogoPrenotazione/></Route>
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  );
}

