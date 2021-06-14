/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { partecipazioneEventoEsistente } from '../../store/prenotazioneSlice';
import { Appuntamento } from '../../model/Appuntamento';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';

export type RiepilogoAppuntamentoProps = {
    appuntamento: Appuntamento
}

export const RiepilogoAppuntamento: React.FC<RiepilogoAppuntamentoProps> = ({ appuntamento }) => {


    const dispatch = useDispatch();
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);
    const history = useHistory();

    const onClick = () => {
        dispatch(partecipazioneEventoEsistente(appuntamento.idAppuntamento, sportivoAutenticato.sportivo.email, appuntamento.specificaPrenotazione.tipoSpecifica, sportivoAutenticato.jwt))
        history.go(-1)
    }

    const [displayPartecipa, setDisplayPartecipa] = useState("block");

    useEffect(() => {
        appuntamento.partecipanti.map(utente => {
            if (utente.email === sportivoAutenticato.sportivo.email) {
                setDisplayPartecipa("none")
            }
        })
    }, [])

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <Card className="col-6">
                            <ListGroup style={{ marginTop: "3%" }}>
                                <ListGroupItem>
                                    Creato da : {appuntamento.creatore.nome} {appuntamento.creatore.cognome}
                                </ListGroupItem>
                                <ListGroupItem key="sportPrenotato">
                                    Sport Prenotato : {appuntamento.specificaPrenotazione.sportAssociato.nome}
                                </ListGroupItem>
                                <ListGroupItem>
                                    Impianto Prenotato : {appuntamento.specificaPrenotazione.idImpiantoPrenotato} {appuntamento.specificaPrenotazione.pavimentazioneImpianto}
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
                            </ListGroup>
                            <ListGroup>
                                <ListGroupItem>
                                    Sportivi Partecipanti : <ul>{appuntamento.partecipanti.map((partecipante) => {
                                    return (
                                        <li key={partecipante.email}>{partecipante.nome} {partecipante.cognome}</li>
                                    )
                                })}
                                    </ul>
                                </ListGroupItem>

                            </ListGroup>
                            <Row>
                                <Col>
                                    <Button
                                        outline color="success"
                                        style={{ marginTop: "2%", marginBottom: "3%", width: "100%", display: displayPartecipa}}
                                        onClick={onClick}>Partecipa</Button>
                                </Col>
                            </Row>

                        </Card>
                    </div>
                </div>
            </section>

        </>
    )

}

