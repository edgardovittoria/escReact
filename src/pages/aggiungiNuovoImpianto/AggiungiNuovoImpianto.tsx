import React, {useEffect} from 'react';
import {Sport} from "../../model/Sport";
import {Button, Form, FormGroup, Label} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {avviaCreazioneImpianto, impiantoSelector, riepilogoCreazioneImpianto} from "../../store/impiantoSlice";
import {sportSelector} from "../../store/SportSlice";
import {useHistory} from "react-router-dom";
import {impiantoDefault} from "../../model/Impianto";

export const AggiungiNuovoImpianto: React.FC = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(avviaCreazioneImpianto())
    }, []);

    const sportPraticabili = useSelector(sportSelector).sports
    const pavimentazioni = useSelector(impiantoSelector).pavimentazioniDisponibili


    return(
        <>
            <div
                style={{
                    width: "60%", margin: "auto", marginTop:"60px", padding: "50px",
                    border: "3px solid #343A40", borderRadius:"20px", backgroundColor:"whitesmoke"
                }}>
            <h5 style={{marginBottom:"30px", textAlign: "center"}}>Seleziona uno o più sport praticabili sul nuovo impianto e la sua pavimentazione</h5>
            <Form  onSubmit={() => {
                dispatch(riepilogoCreazioneImpianto(impiantoDefault))
                history.push("/riepilogoCreazioneImpianto")
            }}>
                <FormGroup>
                    <select
                        multiple
                        className="form-control selectpicker"
                        data-live-search="true"
                        id="sportPraticabili"
                        name="sportPraticabili"
                        onChange={(values) => {
                            let sports = Array.from(values.target.selectedOptions, option => option.value)
                            let listaSport: Sport[] = []
                            sports.map(nomeSport => {
                                let sport: Sport = {
                                    nome: nomeSport,
                                    numeroMinimoGiocatoriPerSquadra: -1,
                                    postiLiberi: -1
                                }
                                listaSport.push(sport)
                            })
                            impiantoDefault.sportPraticabili = listaSport
                        }}
                    >
                        {sportPraticabili.map((sport) => {
                            return (<option key={sport.nome} value={sport.nome}>{sport.nome}</option>)
                        })}
                    </select>
                </FormGroup>
                <FormGroup>
                    <div className="form-check col-sm col-4">
                        {pavimentazioni.map((pavimentazione, index) => {
                            return (
                                <Label key={index} className="form-check-label" style={{ display: 'inline' }}>
                                    <input
                                        key={pavimentazione}
                                        type="radio"
                                        className="form-check-input"
                                        name="sportSelezionato"
                                        value={pavimentazione}
                                        onInput={(target) => {
                                            impiantoDefault.pavimentazione = pavimentazione
                                        }} />
                                    <div>{pavimentazione}</div>
                                </Label>
                            )
                        })}
                    </div>
                </FormGroup>

                <Button type="submit"
                        outline
                        size="lg"
                        block
                        color="success"
                        style={{marginBottom: "50px"}}>Procedi</Button>
            </Form>
            </div>
        </>
    )

}