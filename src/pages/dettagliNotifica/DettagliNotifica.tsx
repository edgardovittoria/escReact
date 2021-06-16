/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import { notificheSelector } from '../../store/notificheSlice';
import { AppuntamentiSottoscrivibili } from '../../components/appuntamentiSottoscrivibili/AppuntamentiSottoscrivibili';
import {DettagliCorso} from "../../components/dettagliCorso/DettagliCorso";



export const DettagliNotifica: React.FC = () => {
    
    const dettagliNotifica = useSelector(notificheSelector).dettagliNotifica    


    if(dettagliNotifica.idPrenotazione !== null){
        if(dettagliNotifica.appuntamenti[0].tipoPrenotazione === "CORSO"){
            return <DettagliCorso corso={dettagliNotifica} giaPrenotato={"block"}/>
        }else{
            return <AppuntamentiSottoscrivibili appuntamenti={dettagliNotifica.appuntamenti} />
        }

    }else{
        return <Spinner animation="grow" />
    }
    
}