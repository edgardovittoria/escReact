import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSportivo, sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableTennis } from '@fortawesome/free-solid-svg-icons/faTableTennis';
import { faFutbol, faVolleyballBall } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import './profiloSportivo.css';
import { Sportivo } from '../../model/Sportivo';
import { resetPrenotazioneDaConfermare } from '../../store/prenotazioneSlice';



export const ProfiloSportivo: React.FC = () => {

    const dispatch = useDispatch()    
    dispatch(resetPrenotazioneDaConfermare())

    const style = {
        display: "block",
        margin: "auto"
    };

    const sportvoAutenticato = useSelector(sportivoAutenticatoSelector);
    const history = useHistory()

    return (
        <>
            <div className="img-container">
                <img src="/assets/img/avatarProfilo.png" alt="avatar profilo"/>
                <h2>{sportvoAutenticato.sportivo.nome} {sportvoAutenticato.sportivo.cognome}</h2>
                <h3>{sportvoAutenticato.sportivo.email}</h3>
            </div>
            <div className="container"> 
                <p>Prenota un impianto una lezione o un corso</p>
            </div>
            <div className="btn-container">
                <span></span>
                <button className="btnProfilo" id="prenotazioneLezione">
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

        </>
    )

}

