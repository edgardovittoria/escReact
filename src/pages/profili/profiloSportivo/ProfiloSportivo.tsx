/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableTennis } from '@fortawesome/free-solid-svg-icons/faTableTennis';
import { faFutbol, faVolleyballBall } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import '../css/profiloSportivo.css';
import { RiepilogoUtente } from '../../../components/riepilogoProfilo/RiepilogoUtente';
import {Calendario} from "../../../components/calendario/Calendario";
import {useFetchDatiUtente} from "../hooks/useFetchDatiUtente";


export const ProfiloSportivo: React.FC = () => {

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);
    const fetchDatiUtente = useFetchDatiUtente();

    useEffect(() => {
        fetchDatiUtente()
    }, [])

    const history = useHistory()

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

                        <div className="col-8" style={{
                            backgroundColor:"whitesmoke"
                        }}>
                            <h4 style={{marginTop:"20px"}}>Prenota un impianto una lezione o un corso</h4>
                            <div className="btn-container" style={{
                                marginBottom: "50px", borderBottom:"1px solid", paddingBottom:"20px"
                            }}>
                                <button className="btnProfilo" id="prenotazioneLezione" onClick={() => history.push("/nuovaPrenotazioneLezione")}>
                                    <FontAwesomeIcon icon={faTableTennis} style={{display: "block", margin: "auto"}} />
                                    LEZIONE
                                </button>
                                <button className="btnProfilo" id="prenotazioneImpianto" onClick={() => history.push("/nuovaPrenotazioneImpianto")}>
                                    <FontAwesomeIcon icon={faFutbol} style={{display: "block", margin: "auto"}} />
                                    IMPIANTO
                                </button>

                                <button className="btnProfilo" id="prenotazioneCorso" onClick={() => history.push("/prenotazioneCorso")}>
                                    <FontAwesomeIcon icon={faVolleyballBall} style={{display: "block", margin: "auto"}} />
                                    CORSO
                                </button>
                            </div>
                            <div id="riepilogoPrenotazioni" style={{ margin: "auto", width: "100%" }}>
                                <h4>Calendario Sportivo</h4>
                                <Calendario appuntamenti={sportivoAutenticato.sportivo.attributiExtra.appuntamentiSportivo} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

