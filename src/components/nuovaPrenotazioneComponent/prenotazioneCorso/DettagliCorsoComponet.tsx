import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, ListGroup, ListGroupItem, Row, Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { partecipazioneEventoEsistente } from '../../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';
import { Prenotazione } from '../../../model/Prenotazone';

export type DettagliCorsoProps = {
    corso: Prenotazione
}


export const DettagliCorso: React.FC<DettagliCorsoProps> = ({ corso }) => {

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)
    const history = useHistory();
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(partecipazioneEventoEsistente(corso.appuntamenti[0].specificaPrenotazione.idPrenotazioneSpecsDTO, 
            sportivoAutenticato.sportivo.email,
            sportivoAutenticato.jwt));
        history.push("profiloSportivo")
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
                                                    Impianto Prenotato : {appuntamento.specificaPrenotazione.pavimentazioneImpianto}
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    Istruttore : {appuntamento.specificaPrenotazione.istruttore}
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
                                <Row>
                                    <Col>
                                        <Button
                                            outline color="success"
                                            style={{ marginTop: "2%", marginBottom: "3%", width: "100%" }}
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

