import React from "react"
import { Card, CardTitle, ListGroup, ListGroupItem, Row, Col, Button } from "reactstrap"
import { Prenotazione } from "../../../model/Prenotazone"
import { SportivoAutenticatoState } from "../../../store/sportivoAutenticatoSlice"
import { RiepilogoUtente } from "../../profiloSportivoComponent/RiepilogoUtenteComponent"

export type DettagliPrenotazioneProps = {
    prenotazione: Prenotazione,
    sportivoAutenticato: SportivoAutenticatoState
    history: any
    onClick: () => void
    testoBottone: string
}

export const DettagliPrenotazione: React.FC<DettagliPrenotazioneProps> = ({prenotazione, sportivoAutenticato, history, onClick, testoBottone}) => {
    let appuntamenti = prenotazione.appuntamenti
    return (
        <>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                    <RiepilogoUtente nome={sportivoAutenticato.sportivo.nome}
                        cognome={sportivoAutenticato.sportivo.cognome}
                        email={sportivoAutenticato.sportivo.email}
                        ruoli={sportivoAutenticato.sportivo.ruoli}
                        attributiExtra={sportivoAutenticato.sportivo.attributiExtra}/>
                        
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
                                        style={{ marginTop: "20%", width: "100%" }}
                                        onClick={() => {
                                            history.push("/profiloSportivo")
                                        }} >Annulla</Button>
                                </Col>
                                <Col>
                                    <Button
                                        outline color="success"
                                        style={{ marginTop: "20%", width: "100%" }}
                                        onClick={onClick}>{testoBottone}</Button>
                                </Col>
                            </Row>

                        </Card>
                    </div>
                </div>
            </section>

        </>
    )
}