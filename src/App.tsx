import React from 'react';
import './App.css';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ProfiloSportivo } from './components/profiloSportivoComponent/ProfiloSportivoComponent';
import { Login } from './components/loginComponent/LoginComponent';



export const App: React.FC = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/profiloSportivo"><ProfiloSportivo /></Route>
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

