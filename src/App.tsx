import React from 'react';
import './App.css';
import {store} from './store/store';
import {persistor} from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ProfiloSportivo } from './components/profiloSportivoComponent/ProfiloSportivoComponent';
import { Login } from './components/loginComponent/LoginComponent';
import { NuovaPrenotazioneImpianto } from './components/nuovaPrenotazioneComponent/prenotazioneImpianto/NuovaPrenotazioneImpiantoComponent';
import { RiepilogoPrenotazione } from './components/nuovaPrenotazioneComponent/riepilogoPrenotazioneComponent/RiepilogoPrenotazioneComponent';
import { NuovaPrenotazioneLezione } from './components/nuovaPrenotazioneComponent/prenotazioneLezione/NuovaPrenotazioneLezioneComponent';
import { RiepilogoPrenotazioneLezione } from './components/nuovaPrenotazioneComponent/riepilogoPrenotazioneComponent/RiepilogoPrenotazioneLezioneComponent';
import { CreazioneCorso } from './components/nuovaPrenotazioneComponent/prenotazioneCorso/CreazioneCorsoComponent';
import { RiepilogoCreazioneCorso } from './components/nuovaPrenotazioneComponent/prenotazioneCorso/RiepilogoCreazioneCorso';



export const App: React.FC = () => {
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/profiloSportivo"><ProfiloSportivo /></Route>
          <Route path="/nuovaPrenotazioneImpianto"><NuovaPrenotazioneImpianto/></Route>
          <Route path="/nuovaPrenotazioneLezione"><NuovaPrenotazioneLezione/></Route>
          <Route path="/creazioneCorso"><CreazioneCorso/></Route>
          <Route path="/riepilogoPrenotazione"><RiepilogoPrenotazione/></Route>
          <Route path="/riepilogoPrenotazioneLezione"><RiepilogoPrenotazioneLezione/></Route>
          <Route path="/riepilogoCreazioneCorso"><RiepilogoCreazioneCorso/></Route>
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

