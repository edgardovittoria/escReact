import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { formPrenotaImpiantoSelector } from '../../../../../store/formPrenotaImpiantoSlice';
import { squadraSelector } from '../../../../../store/squadraSlice';
import { CheckBoxPendingSelezionatoItem, DataOraImpiantoRicorrente, ImpiantiSelezionatiItem } from '../../../../../components/formComponents/DataOraImpiantoRicorrente';
import { OrarioPrenotazione } from '../../../../../components/formComponents/DataOraSelezione';
import { SquadreInvitabiliSelezione } from '../../../../../components/formComponents/SquadreInvitabiliSelezione';
import {FormPrenotazione} from "../../../../../model/FormPrenotazione";
import {useAggiornaOpzioniSuSelezioneSport} from "../../../hooks/useAggiornaOpzioniSuSelezioneSport";
import {useAggironaOpzioniSuSelezioneOrario} from "../../../hooks/useAggironaOpzioniSuSelezioneOrario";
import {DatiPerAggiornamentoOpzioni} from "../../../nuovaPrenotazioneUtenteSingolo/prenotazioneImpianto/components/FormPrenotazioneImpiantoRicorrente";
import {useImpostaOrarioSelezionatoNellaListaOrari} from "../../../hooks/useImpostaOrarioSelezionatoNellaListaOrari";
import {useImpostaImpiantoSelezionatoNellaListaImpianti} from "../../../hooks/useImpostaImpiantoSelezionatoNellaListaImpianti";
import {useSubmitFormPrenotazione} from "../../../hooks/useSubmitFormPrenotazione";
import {useImpostaCheckboxPendingSelezionatoNellaListaCheckboxPending} from "../../../hooks/useImpostaCheckboxPendingSelezionatoNellaListaCheckboxPending";


let orari: OrarioPrenotazione[] = [];
let impiantiSelezionati: ImpiantiSelezionatiItem[] = [];
let checkboxes: CheckBoxPendingSelezionatoItem[] = [];
let datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni = {};

export interface FormPrenotazioneImpiantoSquadraRicorrenteProps {
    sport: string
}

export const FormPrenotazioneImpiantoSquadraRicorrente: React.FC<FormPrenotazioneImpiantoSquadraRicorrenteProps> = ({sport}) => {

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormPrenotazione>();

    const [numeroDate, setNumeroDate] = useState(0);
    const squadreInvitabili = useSelector(squadraSelector).squadreInvitabili
    const opzioni = useSelector(formPrenotaImpiantoSelector);
    const aggiornaOpzioniSuSelezioneSport = useAggiornaOpzioniSuSelezioneSport();
    const aggiornaOpzioniSuSelezioneOrario = useAggironaOpzioniSuSelezioneOrario();
    const impostaOrarioSelezionatoNellaListaOrari = useImpostaOrarioSelezionatoNellaListaOrari();
    const impostaImpiantoSelezionatoNellaListaImpianti = useImpostaImpiantoSelezionatoNellaListaImpianti();
    const submitFormPrenotazione = useSubmitFormPrenotazione();
    const impostaCheckboxPendingSelezionatoNellaListaCheckboxPending = useImpostaCheckboxPendingSelezionatoNellaListaCheckboxPending();


    useEffect(() => {
        datiPerAggiornamentoOpzioni.sport = sport
        setValue("sportSelezionato", sport)
        aggiornaOpzioniSuSelezioneSport(datiPerAggiornamentoOpzioni)
    }, [aggiornaOpzioniSuSelezioneSport, setValue, sport]);


    const onOrarioSelezione = (orarioSelezionato: OrarioPrenotazione) => {
        impostaOrarioSelezionatoNellaListaOrari(orarioSelezionato, orari)
        datiPerAggiornamentoOpzioni.orariSelezionati = orari
        datiPerAggiornamentoOpzioni.orario = orarioSelezionato
        setValue("orariSelezionati", orari);
        aggiornaOpzioniSuSelezioneOrario(datiPerAggiornamentoOpzioni)
    }

    const onImpiantoSelezioneRicorrente = (impiantoItem: ImpiantiSelezionatiItem) => {
        impostaImpiantoSelezionatoNellaListaImpianti(impiantoItem, impiantiSelezionati)
        setValue("impianti", impiantiSelezionati)
    }

    const onCheckBoxPendingSelezioneRicorrente = (checkBoxPendingItem: CheckBoxPendingSelezionatoItem) => {
        impostaCheckboxPendingSelezionatoNellaListaCheckboxPending(checkBoxPendingItem, checkboxes)
        setValue("checkboxesPending", checkboxes)
    }

    const onSquadreInvitabiliSelezione = (listaSquadre: number[]) => {
        setValue("squadreInvitate", listaSquadre)
    }



    return (
        <Form onSubmit={handleSubmit(submitFormPrenotazione)}>
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
                    handleSelezioneImpianto={onImpiantoSelezioneRicorrente}
                    handleSelezioneCheckBoxPending={onCheckBoxPendingSelezioneRicorrente}
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