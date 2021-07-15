import React, {useEffect, useState} from 'react';
import {Button, Col, Form, FormGroup, Row} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    impiantoSelector,
    inviaNotificheCreazioneImpianto,
    messaggioNotificaCreazioneImpianto
} from "../../store/impiantoSlice";
import {useHistory} from "react-router-dom";
import {sportivoAutenticatoSelector} from "../../store/sportivoAutenticatoSlice";

export const MessaggioNotificaCreazioneImpianto: React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(messaggioNotificaCreazioneImpianto())
    }, []);
    const messaggio = useSelector(impiantoSelector).messaggioNotificaDaConfermare
    const [messaggioNotifica, setMessaggioNotifica] = useState<string>(messaggio)


    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector).sportivo

    return(
        <>
            <div style={{width: "60%", margin: "auto", marginTop:"60px", padding: "50px", border: "3px solid #343A40", borderRadius:"20px"}}>
                <h4 style={{marginBottom:"20px", textAlign: "center"}}>Invio notifiche agli utenti della polisportiva</h4>
                <h6 style={{marginBottom:"30px", textAlign: "center"}}>E' possibile anche modificare il testo della notifica</h6>
                <Form>
                <FormGroup>
                    <input type="textarea" defaultValue={messaggio} style={{width: "100%", height: "150px", padding:"20px"}}
                           onChange={(target) =>{
                               setMessaggioNotifica(target.currentTarget.value as string)
                           }
                    }/>
                </FormGroup>
                    <Row>
                        <Col>
                            <Button
                                type="submit"
                                outline color="danger"
                                style={{ marginTop: "20%", width: "100%"}}
                                onClick={() => {
                                    history.push("/profiloSportivo")
                                }} >Annulla Invio Notifiche</Button>
                        </Col>
                        <Col>
                            <Button
                                outline color="success"
                                style={{ marginTop: "20%", width: "100%"}}
                                onClick={() => {
                                    let object = {
                                        emailDirettore: sportivoAutenticato.email,
                                        messaggioNotifica: messaggioNotifica
                                    }
                                    dispatch(inviaNotificheCreazioneImpianto(object))
                                }
                                }>Invia Notifiche</Button>
                        </Col>
                    </Row>

            </Form>
            </div>
        </>
    )

}