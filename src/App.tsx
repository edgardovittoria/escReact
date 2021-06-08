import React from 'react';
import './App.css';
import { store } from './store/store';
import { persistor } from './store/store';
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
import { PrenotazioneCorso } from './components/nuovaPrenotazioneComponent/prenotazioneCorso/prenotazioneCorsoComponent';
import { NavBar } from './components/navBarComponent/NavBarComponent';
import { DettagliNotifica } from './components/notificaComponent/DettagliNotificaComponent';
import { ProfiloSquadra } from './components/profiloSquadraComponent/ProfiloSquadraComponent';
import { NuovaPrenotazioneImpiantoSquadra } from './components/nuovaPrenotazioneSquadraComponent/NuovaPrenotazioneImpiantoSquadraComponent';



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

