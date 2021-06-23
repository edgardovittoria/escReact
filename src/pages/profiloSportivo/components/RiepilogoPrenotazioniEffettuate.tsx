import React from 'react';
import { Button } from 'reactstrap';
import { Prenotazione } from '../../../model/Prenotazone';
import { CardRiepilogoPrenotazioneImpianto } from '../../../components/cardRiepilogoPrenotazione/CardRiepilogoPrenotazioneImpianto';
import { CardRiepilogoPrenotazioneLezione } from '../../../components/cardRiepilogoPrenotazione/CardRiepilogoPrenotazioneLezione';

type RiepilogoPrenotazioniEffettuateProsp = {
    prenotazioni: Prenotazione[],
}


export const RiepilogoPrenotazioniEffettuate: React.FC<RiepilogoPrenotazioniEffettuateProsp> = ({ prenotazioni}) => {
    if (prenotazioni.length !== 0) {
        return (
            <ul style={{ textAlign: "left", marginTop: "20px" }}>
                {prenotazioni.map((prenotazione, index) => {
                    return (
                        <>
                            <li key={prenotazione.idPrenotazione} style={{ marginTop: "20px", marginLeft: "20px" }}>
                                <b>{prenotazione.appuntamenti[0].tipoPrenotazione} </b><b>{prenotazione.appuntamenti[0].sportAssociato.nome.toUpperCase()}</b> {prenotazione.appuntamenti[0].dataAppuntamento} {prenotazione.appuntamenti[0].oraInizioAppuntamento} {prenotazione.appuntamenti[0].oraFineAppuntamento}
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
                                {(prenotazione.appuntamenti[0].tipoPrenotazione === "IMPIANTO") ?
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
