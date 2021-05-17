/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableTennis } from '@fortawesome/free-solid-svg-icons/faTableTennis';
import { faFutbol, faVolleyballBall } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import './profiloSportivo.css';
import { partecipazioniSelector, prenotazioniSelector, resetPrenotazioneDaConfermare } from '../../store/prenotazioneSlice';
import SpringSocket from "react-spring-websocket";
import { TablePrenotazioni } from './TablePrenotazioniEffettuateComponent';
import { TablePartecipazioni } from './TablePartecipazioniComponent';



// const socket = new SpringSocket(
//     "http://localhost:8080/notifiche",
//     ["/user/queue"],
//     (notifica) => {
//         console.log(notifica)
//     }
// )


export const ProfiloSportivo: React.FC = () => {

    // useEffect(() => {
    //     if (socket.connected()) {
    //         //socket.send("/app/creaNotifica", sportivoAutenticato.sportivo.email);
    //         socket.onMessage()
    //     }
    // }, [])



    const dispatch = useDispatch()
    dispatch(resetPrenotazioneDaConfermare())


    const style = {
        display: "block",
        margin: "auto"
    };

    const history = useHistory()
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);
    const prenotazioniEffettuate = useSelector(prenotazioniSelector);
    const partecipazioniEffettuate = useSelector(partecipazioniSelector);
    



    return (
        <>
            <div className="img-container">
                <img src="/assets/img/avatarProfilo.png" alt="avatar profilo" />
                <h2>{sportivoAutenticato.sportivo.nome} {sportivoAutenticato.sportivo.cognome}</h2>
                <h3>{sportivoAutenticato.sportivo.email}</h3>
            </div>
            <div className="container">
                <p>Prenota un impianto una lezione o un corso</p>
            </div>
            <div className="btn-container">
                <span></span>
                <button className="btnProfilo" id="prenotazioneLezione" onClick={() => history.push("/nuovaPrenotazioneLezione")}>
                    <FontAwesomeIcon icon={faTableTennis} style={style} />
                    <i></i>LEZIONE
                </button>
                <button className="btnProfilo" id="prenotazioneImpianto" onClick={() => history.push("/nuovaPrenotazioneImpianto")}>
                    <FontAwesomeIcon icon={faFutbol} style={style} />
                    <i></i>IMPIANTO
                </button>

                <button className="btnProfilo" id="prenotazioneCorso">
                    <FontAwesomeIcon icon={faVolleyballBall} style={style} />
                    <i></i>CORSO
                </button>
            </div>
            <h2 style={{ textAlign: "center", marginTop: "50px", marginBottom: "50px" }}>PRENOTAZIONI EFFETTUATE</h2>
            <TablePrenotazioni prenotazioniEffettuate={prenotazioniEffettuate}
                sportivoAutenticato={sportivoAutenticato.sportivo} />

            <h2 style={{ textAlign: "center", marginTop: "50px", marginBottom: "50px" }}>PARTECIPAZIONI</h2>
            <TablePartecipazioni partecipazioni={partecipazioniEffettuate}
                sportivoAutenticato={sportivoAutenticato.sportivo} />


        </>
    )

}

