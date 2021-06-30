/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSportivo, sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableTennis } from '@fortawesome/free-solid-svg-icons/faTableTennis';
import { faFutbol, faVolleyballBall } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import './css/profiloSportivo.css';
import {
    corsiPrenotatiSelector,
    partecipazioniSelector,
    prenotazioniSelector,
    resetPrenotazioneDaConfermare
} from '../../../store/prenotazioneSlice';
import { TabRiepilogoPrenotazioni } from './components/TabRiepilogoPrenotazioniProfilo';
import { RiepilogoUtente } from '../../../components/riepilogoProfilo/RiepilogoUtente';
import {CalendarioSportivo} from "./components/CalendarioSportivo";
import {fetchNotifiche} from "../../../store/notificheSlice";
import {fetchSquadre} from "../../../store/squadraSlice";


export const ProfiloSportivo: React.FC = () => {

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);


    useEffect(() => {
        dispatch(fetchNotifiche(sportivoAutenticato.sportivo.email, sportivoAutenticato.jwt))
        dispatch(fetchSquadre(sportivoAutenticato.sportivo.email, sportivoAutenticato.jwt))
        dispatch(fetchSportivo(sportivoAutenticato.sportivo.email, sportivoAutenticato.jwt))
    }, [])



    const dispatch = useDispatch()
    dispatch(resetPrenotazioneDaConfermare())

    const style = {
        display: "block",
        margin: "auto"
    };

    const history = useHistory()


    const prenotazioniEffettuate = useSelector(prenotazioniSelector);
    const partecipazioniEffettuate = useSelector(partecipazioniSelector);
    const corsiPrenotati = useSelector(corsiPrenotatiSelector);




    return (
        <>

            <section>
                <div className="container">
                    <div className="row justify-content-center">

                        <RiepilogoUtente nome={sportivoAutenticato.sportivo.nome}
                            cognome={sportivoAutenticato.sportivo.cognome}
                            email={sportivoAutenticato.sportivo.email}
                            ruoli={sportivoAutenticato.sportivo.ruoli}
                            attributiExtra={sportivoAutenticato.sportivo.attributiExtra} />

                        <div className="col-8">
                            <h4>Prenota un impianto una lezione o un corso</h4>
                            <div className="btn-container" style={{ marginBottom: "80px" }}>
                                <button className="btnProfilo" id="prenotazioneLezione" onClick={() => history.push("/nuovaPrenotazioneLezione")}>
                                    <FontAwesomeIcon icon={faTableTennis} style={style} />
                                    LEZIONE
                                </button>
                                <button className="btnProfilo" id="prenotazioneImpianto" onClick={() => history.push("/nuovaPrenotazioneImpianto")}>
                                    <FontAwesomeIcon icon={faFutbol} style={style} />
                                    IMPIANTO
                                </button>

                                <button className="btnProfilo" id="prenotazioneCorso" onClick={() => history.push("/prenotazioneCorso")}>
                                    <FontAwesomeIcon icon={faVolleyballBall} style={style} />
                                    CORSO
                                </button>
                            </div>
                            <div id="riepilogoPrenotazioni" style={{ margin: "auto", width: "100%" }}>
                                {/*<TabRiepilogoPrenotazioni prenotazioniEffettuate={prenotazioniEffettuate}
                                    partecipazioni={partecipazioniEffettuate}
                                    corsiPrenotati={corsiPrenotati}
                                    sportivoAutenticato={sportivoAutenticato}
                                />*/}
                                <CalendarioSportivo sportivo={sportivoAutenticato.sportivo} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

