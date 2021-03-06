/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../../../store/sportivoAutenticatoSlice';
import { avviaNuovaPrenotazione, corsiDisponibiliSelector } from '../../../../store/prenotazioneSlice';
import { RiepilogoUtente } from '../../../../components/riepilogoProfilo/RiepilogoUtente';
import { Label } from 'reactstrap';
import { CorsiDisponibili } from './components/CorsiDisponibili';
import {resetListaInvitabili} from "../../../../store/utentePolisportivaSlice";
import {resetListaSportPraticabili} from "../../../../store/SportSlice";
import {datiAvviaPrenotazione} from "../../../../model/TipiAusiliari";

export const PrenotazioneCorso: React.FC = () => {

    const dispatch = useDispatch()

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);

    useEffect(() => {
        datiAvviaPrenotazione.email = sportivoAutenticato.sportivo.email
        datiAvviaPrenotazione.tipoPrenotazione = "CORSO"
        datiAvviaPrenotazione.modalitaPrenotazione = "SINGOLO_UTENTE"
        dispatch(avviaNuovaPrenotazione(datiAvviaPrenotazione))
    }, [])


    const corsiDisponibili = useSelector(corsiDisponibiliSelector);
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                    <RiepilogoUtente nome={sportivoAutenticato.sportivo.nome}
                            cognome={sportivoAutenticato.sportivo.cognome}
                            email={sportivoAutenticato.sportivo.email}
                            ruoli={sportivoAutenticato.sportivo.ruoli}
                            attributiExtra={sportivoAutenticato.sportivo.attributiExtra}/>
                        <div className="col-8"
                             style={{backgroundColor:"whitesmoke", padding:"20px"}}
                        >
                            <Label>PRENOTAZIONE CORSO</Label>
                            <CorsiDisponibili corsiDisponibili={corsiDisponibili}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}