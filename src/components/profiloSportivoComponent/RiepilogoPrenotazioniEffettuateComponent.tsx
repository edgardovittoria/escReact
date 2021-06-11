import React from 'react';
import { Button } from 'reactstrap';
import { Prenotazione } from '../../model/Prenotazone';
import { SportivoAutenticatoState } from '../../store/sportivoAutenticatoSlice';
import { CardRiepilogoPrenotazioneImpianto } from '../nuovaPrenotazioneComponent/riepilogoPrenotazioneComponent/CardRiepilogoPrenotazioneImpiantoComponent';
import { CardRiepilogoPrenotazioneLezione } from '../nuovaPrenotazioneComponent/riepilogoPrenotazioneComponent/CardRiepilogoPrenotazioneLezioneComponent';

type RiepilogoPrenotazioniEffettuateProsp = {
    prenotazioni: Prenotazione[],
    sportivoAutenticato: SportivoAutenticatoState
}


export const RiepilogoPrenotazioniEffettuate: React.FC<RiepilogoPrenotazioniEffettuateProsp> = ({ prenotazioni}) => {
    if (prenotazioni.length !== 0) {
        return (
            <ul style={{ textAlign: "left", marginTop: "20px" }}>
                {prenotazioni.map((prenotazione, index) => {
                    return (
                        <>
                            <li key={prenotazione.idPrenotazione} style={{ marginTop: "20px", marginLeft: "20px" }}>
                                <b>{prenotazione.appuntamenti[0].specificaPrenotazione.tipoSpecifica} </b><b>{prenotazione.appuntamenti[0].specificaPrenotazione.sportAssociato.nome.toUpperCase()}</b> {prenotazione.appuntamenti[0].dataAppuntamento} {prenotazione.appuntamenti[0].oraInizioAppuntamento} {prenotazione.appuntamenti[0].oraFineAppuntamento}
                                <Button outline color="success"
                                    style={{ marginLeft: "20%", width: "20%" }}
                                    onClick={() => {
                                        let element = document.getElementById("dettagliPrenotazione" + index);
                                        if (element?.style.display === "none") {
                                            element?.setAttribute("style", "display:block")
                                        } else {
                                            element?.setAttribute("style", "display:none")
                                        }

                                    }}>
                                    Dettagli
                                    </Button>
                                <hr />
                            </li>
                            <div id={"dettagliPrenotazione" + index} style={{ display: "none" }}>
                                {(prenotazione.appuntamenti[0].specificaPrenotazione.tipoSpecifica === "IMPIANTO") ?
                                    <CardRiepilogoPrenotazioneImpianto prenotazione={prenotazione}
                                                                       history={null}
                                                                       onClick={() => { }}
                                                                       testoBottone=""
                                                                       displayButtons="none" /> :
                                    <CardRiepilogoPrenotazioneLezione prenotazione={prenotazione}
                                                                      history={null}
                                                                      onClick={() => { }}
                                                                      testoBottone=""
                                                                      displayButtons="none" />
                                }

                            </div>

                        </>
                    )
                })}
            </ul>
        )
    } else {
        return <p style={{ textAlign: "center", marginTop: "50px" }}>Al momento non hai effettuato nessuna prenotazione!!!</p>
    }
}
