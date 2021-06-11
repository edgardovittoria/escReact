import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardTitle, Col, ListGroup, ListGroupItem, Row, Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { confermaPrenotazione, prenotazioneSelector } from '../../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';
import { RiepilogoUtente } from '../../profiloSportivoComponent/RiepilogoUtenteComponent';



export const RiepilogoPrenotazioneLezione: React.FC = () => {

    const prenotazioneDaConfermare = useSelector(prenotazioneSelector).prenotazioneDaConfermare
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)
    const history = useHistory();
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(confermaPrenotazione(sportivoAutenticato.jwt));
        history.push("profiloSportivo")
    }

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
                                        Sport Prenotato : {appuntamenti[0].specificaPrenotazione.sportAssociato.nome}
                                    </ListGroupItem>
                                </ListGroup>
                                {appuntamenti.map((appuntamento) => {
                                    return (
                                        <>
                                            <ListGroupItem>
                                                Impianto Prenotato : {appuntamento.specificaPrenotazione.pavimentazioneImpianto}
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                Istruttore Scelto : {appuntamento.specificaPrenotazione.istruttore.email}
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
                                                Costo Totale : {appuntamento.specificaPrenotazione.costo}€
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
                                                history.go(-2)
                                            }} >Annulla</Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            outline color="success"
                                            style={{ marginTop: "20%", width: "100%" }}
                                            onClick={onClick}>Conferma Prenotazione</Button>
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

