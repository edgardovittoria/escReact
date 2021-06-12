import React from 'react';
import './App.css';
import { store } from './store/store';
import { persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ProfiloSportivo } from './pages/profiloSportivo/ProfiloSportivo';
import { Login } from './pages/login/Login';
import { NuovaPrenotazioneImpianto } from './pages/nuovaPrenotazioneUtenteSingolo/prenotazioneImpianto/NuovaPrenotazioneImpianto';
import { RiepilogoPrenotazione } from './pages/riepilogoPrenotazioneImpianto/RiepilogoPrenotazione';
import { NuovaPrenotazioneLezione } from './pages/nuovaPrenotazioneUtenteSingolo/prenotazioneLezione/NuovaPrenotazioneLezione';
import { RiepilogoPrenotazioneLezione } from './pages/riepilogoPrenotazioneLezione/RiepilogoPrenotazioneLezione';
import { CreazioneCorso } from './pages/creazioneCorso/CreazioneCorso';
import { RiepilogoCreazioneCorso } from './pages/riepilogoCreazioneCorso/RiepilogoCreazioneCorso';
import { PrenotazioneCorso } from './pages/nuovaPrenotazioneUtenteSingolo/prenotazioneCorso/prenotazioneCorso';
import { NavBar } from './components/navBar/NavBar';
import { DettagliNotifica } from './pages/dettagliNotifica/DettagliNotifica';
import { ProfiloSquadra } from './pages/profiloSquadra/ProfiloSquadra';
import { NuovaPrenotazioneImpiantoSquadra } from './pages/nuovaPrenotazioneSquadra/nuovaPrenotazioneImpiantoSquadra/NuovaPrenotazioneImpiantoSquadra';



export const App: React.FC = () => {


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/login"><Login /></Route>
            <Route path="/profiloSportivo"><ProfiloSportivo /></Route>
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
            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

