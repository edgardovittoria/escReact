import React from 'react';
import './App.css';
import { store } from './store/store';
import { persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ProfiloSportivo } from './pages/profili/profiloSportivo/ProfiloSportivo';
import { Login } from './pages/login/Login';
import { NuovaPrenotazioneImpianto } from './pages/nuovaPrenotazione/nuovaPrenotazioneUtenteSingolo/prenotazioneImpianto/NuovaPrenotazioneImpianto';
import { RiepilogoPrenotazione } from './pages/nuovaPrenotazione/riepilogoPrenotazioneImpianto/RiepilogoPrenotazione';
import { NuovaPrenotazioneLezione } from './pages/nuovaPrenotazione/nuovaPrenotazioneUtenteSingolo/prenotazioneLezione/NuovaPrenotazioneLezione';
import { RiepilogoPrenotazioneLezione } from './pages/nuovaPrenotazione/riepilogoPrenotazioneLezione/RiepilogoPrenotazioneLezione';
import { CreazioneCorso } from './pages/nuovaPrenotazione/creazioneCorso/CreazioneCorso';
import { RiepilogoCreazioneCorso } from './pages/nuovaPrenotazione/riepilogoCreazioneCorso/RiepilogoCreazioneCorso';
import { PrenotazioneCorso } from './pages/nuovaPrenotazione/nuovaPrenotazioneUtenteSingolo/prenotazioneCorso/prenotazioneCorso';
import { NavBar } from './components/navBar/NavBar';
import { DettagliNotifica } from './pages/dettagliNotifica/DettagliNotifica';
import { ProfiloSquadra } from './pages/profili/profiloSquadra/ProfiloSquadra';
import { NuovaPrenotazioneImpiantoSquadra } from './pages/nuovaPrenotazione/nuovaPrenotazioneSquadra/nuovaPrenotazioneImpiantoSquadra/NuovaPrenotazioneImpiantoSquadra';
import axios from "axios";
import {ProfiloIstruttore} from "./pages/profili/profiloIstruttore/ProfiloIstruttore";
import {ProfiloManutentore} from "./pages/profili/profiloManutentore/ProfiloManutentore";
import {Home} from "./pages/home/Home";
import {AggiungiNuovoImpianto} from "./pages/aggiungiNuovoImpianto/AggiungiNuovoImpianto";
import {DettagliImpianto} from "./pages/riepilogoCreazioneImpianto/DettagliImpianto";
import {MessaggioNotificaCreazioneImpianto} from "./pages/invioNotificaCreazioneImpianto/MessaggioNotificaCreazioneImpianto";
import {CreaPacchettoLezioniScontato} from "./pages/creaPacchettoLezioniScontato/CreaPacchettoLezioniScontato";

axios.interceptors.request.use((config) => {
  const jwt = store.getState().sportivo.jwt
  if(jwt !== ""){
    config.headers['Authorization'] = "Bearer "+jwt;
  }
  return config;

}, (error) => {
  if (error.response && error.response.data) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
});

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/home"><Home/></Route>
            <Route path="/profiloSportivo"><ProfiloSportivo /></Route>
            <Route path="/profiloIstruttore"><ProfiloIstruttore/></Route>
            <Route path="/profiloManutentore"><ProfiloManutentore/></Route>
            <Route path="/nuovaPrenotazioneImpianto"><NuovaPrenotazioneImpianto /></Route>
            <Route path="/nuovaPrenotazioneLezione"><NuovaPrenotazioneLezione /></Route>
            <Route path="/PrenotazioneCorso"><PrenotazioneCorso /></Route>
            <Route path="/creazioneCorso"><CreazioneCorso /></Route>
            <Route path="/riepilogoPrenotazione"><RiepilogoPrenotazione /></Route>
            <Route path="/riepilogoPrenotazioneLezione"><RiepilogoPrenotazioneLezione /></Route>
            <Route path="/riepilogoCreazioneCorso"><RiepilogoCreazioneCorso /></Route>
            <Route path="/dettagliNotifica"><DettagliNotifica /></Route>
            <Route path="/profiloSquadra"><ProfiloSquadra/></Route>
            <Route path="/nuovaPrenotazioneImpiantoSquadra"><NuovaPrenotazioneImpiantoSquadra /></Route>
            <Route path="/aggiungiNuovoImpianto"><AggiungiNuovoImpianto/></Route>
            <Route path="/creaPacchettoLezioniScontato"><CreaPacchettoLezioniScontato/></Route>
            <Route path="/riepilogoCreazioneImpianto"><DettagliImpianto/></Route>
            <Route path="/invioNotificaCreazioneImpianto"><MessaggioNotificaCreazioneImpianto/></Route>
            <Redirect to="/home" />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

