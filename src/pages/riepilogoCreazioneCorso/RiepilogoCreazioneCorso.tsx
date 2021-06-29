import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row, Spinner } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { creaCorso, prenotazioneSelector } from '../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';



export const RiepilogoCreazioneCorso: React.FC = () => {

    const prenotazioneDaConfermare = useSelector(prenotazioneSelector).prenotazioneDaConfermare
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)
    const history = useHistory();
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(creaCorso(sportivoAutenticato.jwt));
        history.push("profiloSportivo")
    }

    if (prenotazioneDaConfermare.appuntamenti[0] !== undefined) {

        const appuntamenti = prenotazioneDaConfermare.appuntamenti

        return (
            <>
                <section>
                    <div className="container">
                        <div className="row justify-content-center">
                            <Card className="col-4" style={{ height: "min-content" }}>
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
                                                Costo Totale : {appuntamento.costo}€
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

