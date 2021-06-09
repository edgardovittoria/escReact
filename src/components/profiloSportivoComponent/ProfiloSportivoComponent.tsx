/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableTennis } from '@fortawesome/free-solid-svg-icons/faTableTennis';
import { faFutbol, faVolleyballBall } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import './profiloSportivo.css';
import { corsiPrenotatiSelector, fetchPrenotazioni, partecipazioniSelector, prenotazioniSelector, resetPrenotazioneDaConfermare } from '../../store/prenotazioneSlice';
import { TabRiepilogoPrenotazioni } from '../tabComponent/TabRiepilogoPrenotazioniProfiloComponent';


export const ProfiloSportivo: React.FC = () => {

    

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);

    useEffect(() => {
        dispatch(fetchPrenotazioni(sportivoAutenticato.sportivo.email, sportivoAutenticato.jwt))
    }, [sportivoAutenticato])



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
            <div className="img-container">
                {/* <img src="/assets/img/avatarProfilo.png" alt="avatar profilo" /> */}
                <h2>{sportivoAutenticato.sportivo.nome} {sportivoAutenticato.sportivo.cognome}</h2>
                <h3>{sportivoAutenticato.sportivo.email}</h3>
            </div>
            <div className="container">
                <p>Prenota un impianto una lezione o un corso</p>
            </div>
            <div className="btn-container" style={{marginBottom:"80px"}}>
                <span></span>
                <button className="btnProfilo" id="prenotazioneLezione" onClick={() => history.push("/nuovaPrenotazioneLezione")}>
                    <FontAwesomeIcon icon={faTableTennis} style={style} />
                    <i></i>LEZIONE
                </button>
                <button className="btnProfilo" id="prenotazioneImpianto" onClick={() => history.push("/nuovaPrenotazioneImpianto")}>
                    <FontAwesomeIcon icon={faFutbol} style={style} />
                    <i></i>IMPIANTO
                </button>

                <button className="btnProfilo" id="prenotazioneCorso" onClick={() => history.push("/prenotazioneCorso")}>
                    <FontAwesomeIcon icon={faVolleyballBall} style={style} />
                    <i></i>CORSO
                </button>
            </div>
            <div id="riepilogoPrenotazioni" style={{margin:"auto", width:"60%"}}>
            <TabRiepilogoPrenotazioni prenotazioniEffettuate={prenotazioniEffettuate}
                partecipazioni={partecipazioniEffettuate}
                corsiPrenotati={corsiPrenotati}
                sportivoAutenticato={sportivoAutenticato.sportivo} 
                />
            </div>

        </>
    )

}

