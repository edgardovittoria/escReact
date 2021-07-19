import React from 'react';
import {Button, Form, FormGroup, Label} from "reactstrap";
import {DatiPerCreazioneNuovoPrenotabile} from "../../model/TipiAusiliari";
import {useDispatch} from "react-redux";
import {confermaCreazioneNuovoPrenotabile} from "../../store/prenotabileSlice";
import {formPrenotazioneDefault} from "../../model/FormPrenotazione";


export const CreaPacchettoLezioniScontato: React.FC = () => {

    const dispatch = useDispatch()
    const numeroDateArray = [2,3,4,5]
    let datiPerCreazionePacchettoLezioni: DatiPerCreazioneNuovoPrenotabile = {
        tipoPrenotazione: "PACCHETTO_LEZIONI",
        nomeEvento: "",
        numeroDate: 2,
        scontoPercentuale: 0
    }

    return(
        <>
            <div
                style={{
                    width: "60%", margin: "auto", marginTop:"60px", padding: "50px",
                    border: "3px solid #343A40", borderRadius:"20px", backgroundColor:"whitesmoke"
                }}>
                <h5 style={{marginBottom:"30px", textAlign: "center"}}>Seleziona il numero di lezione presenti nel pacchetto</h5>
                <Form  onSubmit={(event) => {
                    event.preventDefault()
                    dispatch(confermaCreazioneNuovoPrenotabile(datiPerCreazionePacchettoLezioni))
                }}>
                    <FormGroup>
                        <Label style={{ marginLeft: '5px' }}>Inserire il nome del pachetto di lezioni</Label>
                        <input type="text" id="nomePacchetto" name="nomePacchetto"
                               style={{width:"100%"}}
                               onChange={(target) => {
                                   datiPerCreazionePacchettoLezioni.nomeEvento = target.currentTarget.value
                               }}/>
                    </FormGroup>
                    <FormGroup>
                        <select
                            className="form-control selectpicker"
                            id="numeroDate"
                            name="numeroDate"
                            defaultValue={numeroDateArray[0]}
                            onChange={(values) => {
                                datiPerCreazionePacchettoLezioni.numeroDate = Number.parseInt(values.currentTarget.value)
                            }}
                        >
                            {numeroDateArray.map((numero) => {
                                return (<option key={numero} value={numero}>{numero}</option>)
                            })}
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ marginLeft: '5px' }}>Inserisci la percentuale di sconto da applicare al pacchetto</Label>
                            <input
                                type="number"
                                name="scontoPercentuale"
                                style={{width:"100%"}}
                                onInput={(values) => {
                                    datiPerCreazionePacchettoLezioni.scontoPercentuale = Number.parseFloat(values.currentTarget.value)
                                }} />
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