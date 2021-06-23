import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { confermaPrenotazione,  prenotazioneSelector } from '../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { DettagliPrenotazione } from './components/DettagliPrenotazione';



export const RiepilogoPrenotazione: React.FC = () => {

    const prenotazioneDaConfermare = useSelector(prenotazioneSelector).prenotazioneDaConfermare
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)
    const history = useHistory();
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(confermaPrenotazione(sportivoAutenticato.jwt));
        history.push("/profiloSportivo")
    }

    if (prenotazioneDaConfermare.appuntamenti[0] !== undefined) {

        return (
            <DettagliPrenotazione prenotazione={prenotazioneDaConfermare}
                sportivoAutenticato={sportivoAutenticato}
                history={history}
                onClick={onClick}
                testoBottone="Conferma Prenotazione"
                displayButtons="block"/>

        )
    } else {
        return <Spinner animation="grow" />
    }

}



