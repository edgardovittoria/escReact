/* eslint-disable array-callback-return,react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, ListGroup, ListGroupItem, Row, Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { partecipazioneEventoEsistente} from '../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { Prenotazione } from '../../model/Prenotazone';
import {datiIscrizioneEventoEsistenteDefault} from "../appuntamentiSottoscrivibili/RiepilogoAppuntamento";

export type DettagliCorsoProps = {
    corso: Prenotazione
}


export const DettagliCorso: React.FC<DettagliCorsoProps> = ({ corso}) => {

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)
    const history = useHistory();
    const dispatch = useDispatch();

    const [displayIscriviti, setDisplayIscriviti] = useState<string>("block")

    useEffect(() => {
        corso.appuntamenti[0].partecipanti.map(utente => {
            if (utente === sportivoAutenticato.sportivo.email) {
               setDisplayIscriviti("none");
            }
        })
    }, [corso.appuntamenti[0].partecipanti])

    const onClick = () => {
        datiIscrizioneEventoEsistenteDefault.idEvento = corso.idPrenotazione
        datiIscrizioneEventoEsistenteDefault.tipoPrenotazione = corso.appuntamenti[0].tipoPrenotazione
        datiIscrizioneEventoEsistenteDefault.modalitaPrenotazione = corso.appuntamenti[0].modalitaPrenotazione
        datiIscrizioneEventoEsistenteDefault.identificativoPartecipante = sportivoAutenticato.sportivo.email
        dispatch(partecipazioneEventoEsistente(datiIscrizioneEventoEsistenteDefault));
        setTimeout(() => {
            history.push("profiloSportivo")
        },500);

    }

    if (corso.appuntamenti[0] !== undefined) {

        const appuntamenti = corso.appuntamenti

        return (
            <>
                <section>
                    <div className="container">
                        <div className="row">
                            <Card className="col-6">
                                <ListGroup style={{ marginTop: "3%" }}>
                                    {appuntamenti.map((appuntamento, index) => {
                                        return (
                                            <div key={index} style={{ marginTop: "3%" }}>
                                                <ListGroupItem>
                                                    LEZIONE {index+1}
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    Impianto Prenotato : {appuntamento.pavimentazioneImpianto}
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    Istruttore : {appuntamento.istruttore}
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    Data Prenotata : {appuntamento.dataAppuntamento}
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    Ora Inizio : {appuntamento.oraInizioAppuntamento}
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    Ora Fine : {appuntamento.oraFineAppuntamento}
                                                </ListGroupItem>
                                            </div>
                                        )
                                    })}
                                </ListGroup>
                                <ListGroup>
                                    Partecipanti : {appuntamenti[0].partecipanti.map(partecipante => {
                                        return <ListGroupItem key={partecipante}>{partecipante}</ListGroupItem>
                                })}
                                </ListGroup>
                                <Row>
                                    <Col>
                                        <Button
                                            outline color="success"
                                            style={{ marginTop: "2%", marginBottom: "3%", width: "100%", display: displayIscriviti}}
                                            onClick={onClick}>Iscriviti</Button>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </div>
                </section>

            </>
        )
    } else {
        return <Spinner animation="grow" />
    }

}

