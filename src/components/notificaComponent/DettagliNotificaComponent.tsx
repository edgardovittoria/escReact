/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import { notificheSelector } from '../../store/notificheSlice';
import { AppuntamentiSottoscrivibili } from '../nuovaPrenotazioneComponent/prenotazioneImpianto/AppuntamentiSottoscrivibiliComponent';



export const DettagliNotifica: React.FC = () => {
    
    const dettagliNotifica = useSelector(notificheSelector).dettagliNotifica    


    if(dettagliNotifica.idPrenotazione !== null){
        return (
            <AppuntamentiSottoscrivibili appuntamenti={dettagliNotifica.appuntamenti} />
        )
    }else{
        return <Spinner animation="grow" />
    }
    
}