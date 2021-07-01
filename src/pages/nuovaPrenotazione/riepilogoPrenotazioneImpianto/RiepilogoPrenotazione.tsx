import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { prenotazioneSelector } from '../../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';
import { DettagliPrenotazione } from './components/DettagliPrenotazione';
import {useConfermaPrenotazione} from "../hooks/useConfermaPrenotazione";



export const RiepilogoPrenotazione: React.FC = () => {

    const prenotazioneDaConfermare = useSelector(prenotazioneSelector).prenotazioneDaConfermare
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)
    const history = useHistory();
    const confermaPrenotazione = useConfermaPrenotazione();

    if (prenotazioneDaConfermare.appuntamenti[0] !== undefined) {

        return (
            <DettagliPrenotazione prenotazione={prenotazioneDaConfermare}
                sportivoAutenticato={sportivoAutenticato}
                history={history}
                onClick={confermaPrenotazione}
                testoBottone="Conferma Prenotazione"
                displayButtons="block"/>

        )
    } else {
        return <Spinner animation="grow" />
    }

}



