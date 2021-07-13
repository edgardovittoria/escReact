import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { formPrenotaImpiantoSelector } from '../../../../../store/formPrenotaImpiantoSlice';
import { squadraSelector } from '../../../../../store/squadraSlice';
import { DataOraImpiantoRicorrente } from '../../../../../components/formComponents/DataOraImpiantoRicorrente';
import { SquadreInvitabiliSelezione } from '../../../../../components/formComponents/SquadreInvitabiliSelezione';
import {FormPrenotazione, formPrenotazioneDefault} from "../../../../../model/FormPrenotazione";
import {useAggiornaOpzioniSuSelezioneSport} from "../../../hooks/useAggiornaOpzioniSuSelezioneSport";
import {useSubmitFormPrenotazione} from "../../../hooks/useSubmitFormPrenotazione";
import {DatiPerAggiornamentoOpzioni} from "../../../../../model/TipiAusiliari";
import {useOnOrarioselezione} from "../../../hooks/useOnOrarioselezione";
import {useOnImpiantoSelezione} from "../../../hooks/useOnImpiantoSelezione";
import {useOnCheckboxPendingSelezione} from "../../../hooks/useOnCheckboxPendingSelezione";

let datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni = {};

export interface FormPrenotazioneImpiantoSquadraRicorrenteProps {
    sport: string
}

export const FormPrenotazioneImpiantoSquadraRicorrente: React.FC<FormPrenotazioneImpiantoSquadraRicorrenteProps> = ({sport}) => {

    const { register } = useForm<FormPrenotazione>();

    const [numeroDate, setNumeroDate] = useState(0);
    const squadreInvitabili = useSelector(squadraSelector).squadreInvitabili
    const opzioni = useSelector(formPrenotaImpiantoSelector);
    const aggiornaOpzioniSuSelezioneSport = useAggiornaOpzioniSuSelezioneSport();
    const submitFormPrenotazione = useSubmitFormPrenotazione("IMPIANTO");
    const onOrarioSelezione = useOnOrarioselezione(datiPerAggiornamentoOpzioni);
    const onImpiantoSelezione = useOnImpiantoSelezione();
    const onCheckboxPendingSelezione = useOnCheckboxPendingSelezione();

    useEffect(() => {
        datiPerAggiornamentoOpzioni.sport = sport
        formPrenotazioneDefault.sportSelezionato = sport
        aggiornaOpzioniSuSelezioneSport(datiPerAggiornamentoOpzioni)
    }, [sport]);


    const onSquadreInvitabiliSelezione = (listaSquadre: number[]) => {
        formPrenotazioneDefault.squadreInvitate = listaSquadre
    }



    return (
        <Form onSubmit={() => submitFormPrenotazione(formPrenotazioneDefault)}>
            <FormGroup>
                <select
                    className="form-control"
                    name="numeroDate"
                    id="numeroDate"
                    onClick={(value) => {
                        datiPerAggiornamentoOpzioni.numeroDate = Number.parseInt(value.currentTarget.value)
                        setNumeroDate(Number.parseInt(value.currentTarget.value))
                    }}
                >
                    <option key={1} value={1}>1</option>
                    <option key={2} value={2}>2</option>
                    <option key={3} value={3}>3</option>
                    <option key={4} value={4}>4</option>
                    <option key={5} value={5}>5</option>
                </select>
            </FormGroup>
            <FormGroup className="border border-dark rounded" style={{ textAlign: 'left' }}>
                <DataOraImpiantoRicorrente impianti={opzioni.arrayListeImpianti}
                    handleSelezioneDataOra={onOrarioSelezione}
                    handleSelezioneImpianto={onImpiantoSelezione}
                    handleSelezioneCheckBoxPending={onCheckboxPendingSelezione}
                    numeroDate={numeroDate}
                    {...register("impianti",  {required: true})} 
                    {...register("orariSelezionati", {required: true})}/>
            </FormGroup>
            <FormGroup>
                <Label>Invita squadre alla prenotazione</Label>
                <Row>
                    <Col>
                        <SquadreInvitabiliSelezione squadreInvitabili={squadreInvitabili}
                        handleSelezioneSquadra={onSquadreInvitabiliSelezione}/>
                    </Col>
                </Row>
            </FormGroup>
            <Button type="submit" 
            outline 
            size="lg" 
            block 
            color="success"
            style={{marginBottom: "50px"}}>Procedi</Button>
        </Form>
    )
}