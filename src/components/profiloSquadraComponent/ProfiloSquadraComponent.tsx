import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { squadraSelector } from '../../store/squadraSlice';
import { CalendarioSquadra } from './CalendarioSquadraComponent';


export const ProfiloSquadra: React.FC = () => {

    const squadra = useSelector(squadraSelector).squadraSelezionata;
    const history = useHistory()
    //const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)

    return (
        <>
            <div className="img-container">
                <img src="/assets/img/teamIcon.png" alt="team icon" />
                <h2>{squadra.nome}</h2>
            </div>
            <div className="container">
                <p>Prenota un impianto</p>
            </div>
            <div className="btn-container" style={{ marginBottom: "80px" }}>
                <button className="btnProfilo" id="prenotazioneImpianto" onClick={() => history.push("/nuovaPrenotazioneImpiantoSquadra")}>
                    <FontAwesomeIcon icon={faFutbol} style={{ display: "block", margin: "auto" }} />
                    <i></i>IMPIANTO
            </button>
            </div>
            <div id="riepilogoPrenotazioni" style={{ margin: "auto", width: "60%" }}>
                <h2>Calendario Squadra</h2>
                <CalendarioSquadra appuntamenti={squadra.appuntamenti}
                    squadraSelezionata={squadra} />
            </div>
        </>
    );
};
