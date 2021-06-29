import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { squadraSelector } from '../../store/squadraSlice';
import { CalendarioSquadra } from './components/CalendarioSquadra';
import {RiepilogoSquadra} from "../../components/riepilogoProfilo/RiepilogoSquadra";
import {sportivoAutenticatoSelector} from "../../store/sportivoAutenticatoSlice";


export const ProfiloSquadra: React.FC = () => {

    const squadra = useSelector(squadraSelector).squadraSelezionata;
    const utente = useSelector(sportivoAutenticatoSelector).sportivo
    const history = useHistory()

    return (
        <>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <RiepilogoSquadra nome={squadra.nome} sport={squadra.sport.nome}/>
                        <div className="col-8">
                            {(squadra.amministratori.map(amministratore => {
                                if(amministratore.email === utente.email){
                                    return (
                                        <div>
                                            <h4>Prenota un impianto</h4>
                                            <div className="btn-container" style={{ marginBottom: "80px" }}>
                                                <button className="btnProfilo" id="prenotazioneImpianto" onClick={() => history.push("/nuovaPrenotazioneImpiantoSquadra")}>
                                                    <FontAwesomeIcon icon={faFutbol} style={{ display: "block", margin: "auto" }} />
                                                    IMPIANTO
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            }))}

                            <div id="riepilogoPrenotazioni" style={{ margin: "auto", width: "100%" }}>
                                <h2>Calendario Squadra</h2>
                                <CalendarioSquadra appuntamenti={squadra.appuntamenti}
                                                   squadraSelezionata={squadra} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};
