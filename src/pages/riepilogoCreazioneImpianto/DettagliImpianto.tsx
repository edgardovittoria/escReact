import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {confermaCreazioneImpianto, impiantoSelector} from "../../store/impiantoSlice";
import {Button, Card, CardTitle, Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import {useHistory} from "react-router-dom";


export const DettagliImpianto: React.FC= () => {
    const impiantoDaCreare = useSelector(impiantoSelector).impiantoDaCreare
    const history = useHistory()
    const dispatch = useDispatch()
    return(
        <>
            <div style={{width: "60%", margin: "auto", marginTop:"60px", padding: "50px",
                border: "3px solid #343A40", borderRadius:"20px", backgroundColor:"whitesmoke"
            }}>
                <h5 style={{marginBottom:"30px", textAlign: "center"}}>Riepilogo creazione impianto</h5>
                <Card className="col-12" style={{backgroundColor:"whitesmoke", border: "1px solid #343A40"}}>
                <ListGroup style={{marginTop: "10px", border:"0px"}}>
                    Pavimentazione
                    <ListGroupItem key="sportPrenotato">
                        {impiantoDaCreare.pavimentazione}
                    </ListGroupItem>
                </ListGroup>
                <ListGroup style={{marginTop: "10px", border:"0px"}}>
                    Sport Praticabili
                {impiantoDaCreare.sportPraticabili.map((sport, index) => {
                    return (
                        <div key={index}>
                            <ListGroupItem>
                                {sport.nome}
                            </ListGroupItem>
                        </div>
                    )
                })}
                </ListGroup>
                <Row style={{marginBottom:"10px"}}>
                    <Col>
                        <Button
                            type="submit"
                            outline color="danger"
                            style={{ marginTop: "20%", width: "100%"}}
                            onClick={() => {
                                history.push("/profiloSportivo")
                            }} >Annulla</Button>
                    </Col>
                    <Col>
                        <Button
                            outline color="success"
                            style={{ marginTop: "20%", width: "100%"}}
                            onClick={() => {
                                dispatch(confermaCreazioneImpianto())
                            }
                            }>Aggiungi Impianto</Button>
                    </Col>
                </Row>

            </Card>
            </div>
        </>
    )

}