import * as React from 'react';
import { Card, CardTitle, ListGroup, ListGroupItem, Row, Col, Button } from 'reactstrap';
import { Prenotazione } from '../../model/Prenotazone';

interface CardRiepilogoPrenotazioneProps {
    prenotazione: Prenotazione
    history: any
    onClick: () => void
    testoBottone: string
    displayButtons: string
}

export const CardRiepilogoPrenotazioneImpianto: React.FC<CardRiepilogoPrenotazioneProps> = (
    {prenotazione, history, onClick, testoBottone, displayButtons}
) => {

    let appuntamenti = prenotazione.appuntamenti

    return (
        <Card className="col-6" style={{backgroundColor:"whitesmoke", padding:"20px"}}>

        <CardTitle style={{ marginTop: "3%", marginBottom: "4%" }}>
            Riepilogo prenotazione
        </CardTitle>
        <ListGroup>
            <ListGroupItem key="sportPrenotato">
                Sport Prenotato : {appuntamenti[0].sportAssociato.nome}
            </ListGroupItem>
        </ListGroup>
        {appuntamenti.map((appuntamento, index) => {
            return (
                <div key={index}>
                    <ListGroupItem>
                        Impianto Prenotato : {appuntamento.pavimentazioneImpianto}
                    </ListGroupItem>
                    <ListGroupItem>
                        Modalità prenotazione : {appuntamento.modalitaPrenotazione}
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
                </div>
            )
        })}
        <ListGroup>
            <ListGroupItem>
                Invitati : <ul>{appuntamenti[0].invitati.map((invitato) => {
                return (
                    <li key={invitato}>{invitato}</li>
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
                    style={{ marginTop: "20%", width: "100%", display: displayButtons }}
                    onClick={() => {
                        history.push("/profiloSportivo")
                    }} >Annulla</Button>
            </Col>
            <Col>
                <Button
                    outline color="success"
                    style={{ marginTop: "20%", width: "100%", display: displayButtons }}
                    onClick={onClick}>{testoBottone}</Button>
            </Col>
        </Row>

    </Card>
    );
};
