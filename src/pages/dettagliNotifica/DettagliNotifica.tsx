/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import { notificheSelector } from '../../store/notificheSlice';
import { AppuntamentiSottoscrivibili } from '../../components/appuntamentiSottoscrivibili/AppuntamentiSottoscrivibili';
import {DettagliCorso} from "../../components/dettagliCorso/DettagliCorso";
import {RiepilogoAppuntamento} from "../../components/appuntamentiSottoscrivibili/RiepilogoAppuntamento";
import {Appuntamento} from "../../model/Appuntamento";

export const DettagliNotifica: React.FC = () => {
    
    const dettagliNotifica = useSelector(notificheSelector).dettagliNotifica
    const notifiaSelezionata = useSelector(notificheSelector).notificaSelezionata


    if(dettagliNotifica?.idPrenotazione !== null){
        if(notifiaSelezionata.tipoNotifica === "ISTRUTTORE_LEZIONE"){
            return <RiepilogoAppuntamento appuntamento={dettagliNotifica as Appuntamento} displayButtonPartecipa="none" />
        }else{
            if(dettagliNotifica?.appuntamenti !== undefined && dettagliNotifica?.appuntamenti[0].tipoPrenotazione === "CORSO"){
                return <DettagliCorso corso={dettagliNotifica} />
            }else{
                return <AppuntamentiSottoscrivibili appuntamenti={dettagliNotifica?.appuntamenti} />
            }
        }



    }else{
        return <Spinner animation="grow" />
    }
    
}