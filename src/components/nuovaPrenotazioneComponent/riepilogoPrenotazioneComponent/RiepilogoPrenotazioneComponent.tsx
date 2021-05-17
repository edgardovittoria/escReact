import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row, Spinner } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { confermaPrenotazione,  prenotazioneSelector } from '../../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';



export const RiepilogoPrenotazione: React.FC = () => {

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
                            <Card className="col-4" style={{height: "min-content"}}>
                                <CardImg
                                    src="/assets/img/avatarProfilo.png"
                                    alt="Avatar Sportivo" />
                                <CardBody>
                                    <CardTitle>
                                        {prenotazioneDaConfermare.sportivoPrenotante.nome} {prenotazioneDaConfermare.sportivoPrenotante.cognome}
                                    </CardTitle>
                                    <CardText>
                                        Eventuali info dello Sportivo...
                                    </CardText>
                                </CardBody>
                                <ListGroup>
                                    <ListGroupItem>
                                        {prenotazioneDaConfermare.sportivoPrenotante.email}
                                    </ListGroupItem>
                                </ListGroup>
                                <CardBody>
                                    <NavLink to="/profiloSportivo">Profilo</NavLink>
                                </CardBody>
                            </Card>
                            <Card className="col-6">

                                <CardTitle style={{ marginTop: "3%", marginBottom: "4%" }}>
                                    Riepilogo prenotazione
                                </CardTitle>
                                <ListGroup>
                                    <ListGroupItem key="sportPrenotato">
                                        Sport Prenotato : {appuntamenti[0].specificaPrenotazione.sportAssociato.nome}
                                    </ListGroupItem>
                                </ListGroup>
                                {appuntamenti.map((appuntamento, index) => {
                                    return (
                                        <div key={index}>
                                            <ListGroupItem>
                                                Impianto Prenotato : {appuntamento.specificaPrenotazione.pavimentazioneImpianto}
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
                                        </div>
                                    )
                                })}
                                <ListGroup>
                                    <ListGroupItem>
                                        Sportivi Invitati : <ul>{appuntamenti[0].specificaPrenotazione.invitati.map((invitato) => {
                                        return (
                                            <li key={invitato.email}>{invitato.nome} {invitato.cognome}</li>
                                        )
                                    })}
                                        </ul>
                                    </ListGroupItem>

                                </ListGroup>
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

