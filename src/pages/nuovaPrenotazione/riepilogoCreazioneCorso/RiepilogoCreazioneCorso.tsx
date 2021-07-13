import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Button, Card, CardTitle, Col, ListGroup, ListGroupItem, Row, Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import {annullaCreazioneCorso, prenotazioneSelector} from '../../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';
import {useConfermaPrenotazione} from "../hooks/useConfermaPrenotazione";
import {RiepilogoUtente} from "../../../components/riepilogoProfilo/RiepilogoUtente";



export const RiepilogoCreazioneCorso: React.FC = () => {

    const prenotazioneDaConfermare = useSelector(prenotazioneSelector).prenotazioneDaConfermare
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)
    const history = useHistory();
    const dispatch = useDispatch();
    const confermaPrenotazione = useConfermaPrenotazione();


    if (prenotazioneDaConfermare.appuntamenti[0] !== undefined) {

        const appuntamenti = prenotazioneDaConfermare.appuntamenti

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
                            <Card className="col-6">

                                <CardTitle style={{ marginTop: "3%", marginBottom: "4%" }}>
                                    Riepilogo prenotazione
                                </CardTitle>
                                <ListGroup>
                                    <ListGroupItem key="sportPrenotato">
                                        Sport Prenotato : {appuntamenti[0].sportAssociato.nome}
                                    </ListGroupItem>
                                </ListGroup>
                                <ListGroup>
                                    <ListGroupItem key="numeroMinimoPartecipanti">
                                        Numero Minimo Partecipanti : {prenotazioneDaConfermare.infoGeneraliEvento.numeroMinimoPartecipanti}
                                    </ListGroupItem>
                                </ListGroup>
                                <ListGroup>
                                    <ListGroupItem key="numeroMassimoPartecipanti">
                                        Numero Massimo Partecipanti : {prenotazioneDaConfermare.infoGeneraliEvento.numeroMassimoPartecipanti}
                                    </ListGroupItem>
                                </ListGroup>
                                <ListGroup>
                                    <ListGroupItem key="costoPerPartecipante">
                                        Costo per partecipante : {prenotazioneDaConfermare.infoGeneraliEvento.costoPerPartecipante}€
                                    </ListGroupItem>
                                </ListGroup>
                                <ListGroup>
                                    <ListGroupItem>
                                        Sportivi Invitati : <ul>{(prenotazioneDaConfermare.appuntamenti[0].invitati).map((invitato) => {
                                        return (
                                            <li key={invitato}>{invitato}</li>
                                        )
                                    })}
                                        </ul>
                                    </ListGroupItem>

                                </ListGroup>
                                {appuntamenti.map((appuntamento) => {
                                    return (
                                        <>
                                            <ListGroupItem>
                                                Impianto Prenotato : {appuntamento.pavimentazioneImpianto}
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                Istruttore Scelto : {appuntamento.istruttore}
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
                                            <ListGroupItem>
                                                Costo Totale : {appuntamento.costo}
                                            </ListGroupItem>
                                        </>
                                    )
                                })}
                                <Row>
                                    <Col>
                                        <Button
                                            type="submit"
                                            outline color="danger"
                                            style={{ marginTop: "20%", width: "100%" }}
                                            onClick={() => {
                                                dispatch(annullaCreazioneCorso())
                                                history.push("/profiloSportivo")
                                            }} >Annulla</Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            outline color="success"
                                            style={{ marginTop: "20%", width: "100%" }}
                                            onClick={confermaPrenotazione}>Conferma Prenotazione</Button>
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

