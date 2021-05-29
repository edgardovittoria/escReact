/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Spinner } from 'reactstrap';
import { notificheSelector } from '../../store/notificheSlice';
import { confermaPrenotazione, partecipazioneEventoEsistente } from '../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { DettagliPrenotazione } from '../nuovaPrenotazioneComponent/riepilogoPrenotazioneComponent/DettagliPrenotazione';



export const DettagliNotifica: React.FC = () => {

    /**
     * dovrà essere effettuata una chiamata al server per recuperare i dettagli della prenotazione
     * nello useEffect
     */
     const dispatch = useDispatch();
    
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)
    const dettagliNotifica = useSelector(notificheSelector).dettagliNotifica
    const history = useHistory();
    

    const onClick = () => {
        dispatch(partecipazioneEventoEsistente(dettagliNotifica.idPrenotazione, sportivoAutenticato.sportivo.email, sportivoAutenticato.jwt));
        history.push("profiloSportivo")
    }


    if(dettagliNotifica.idPrenotazione !== null){
        return (
            <DettagliPrenotazione prenotazione={dettagliNotifica}
                sportivoAutenticato={sportivoAutenticato}
                history={history}
                onClick={onClick} 
                testoBottone="Partecipa"/>
        )
    }else{
        return <Spinner animation="grow" />
    }
    
}