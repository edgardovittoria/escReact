import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { formPrenotaImpiantoSelector } from '../../../../../store/formPrenotaImpiantoSlice';
import { istruttoreSelector } from '../../../../../store/IstruttoreSlice';
import { sportivoAutenticatoSelector } from '../../../../../store/sportivoAutenticatoSlice';
import { sportSelector } from '../../../../../store/SportSlice';
import { DataOraImpiantoIstruttoreSelezione, IstruttoriSelezionatiItem } from '../../../../../components/formComponents/DataOraImpiantoIstruttoreSelezione';
import { OrarioPrenotazione } from '../../../../../components/formComponents/DataOraSelezione';
import { SelezioneSport } from '../../../../../components/formComponents/SelezioneSport';
import {FormPrenotazione} from "../../../../../model/FormPrenotazione";
import {DatiPerAggiornamentoOpzioni} from "../../prenotazioneImpianto/components/FormPrenotazioneImpiantoRicorrente";
import {useAggiornaOpzioniSuSelezioneSport} from "../../../hooks/useAggiornaOpzioniSuSelezioneSport";
import {useAggironaOpzioniSuSelezioneOrario} from "../../../hooks/useAggironaOpzioniSuSelezioneOrario";
import { ImpiantiSelezionatiItem } from '../../../../../components/formComponents/DataOraImpiantoRicorrente';
import {useImpostaOrarioSelezionatoNellaListaOrari} from "../../../hooks/useImpostaOrarioSelezionatoNellaListaOrari";
import {useImpostaImpiantoSelezionatoNellaListaImpianti} from "../../../hooks/useImpostaImpiantoSelezionatoNellaListaImpianti";
import {useSubmitFormPrenotazione} from "../../../hooks/useSubmitFormPrenotazione";
import {useImpostaIstruttoreSelezionatoNellaListaIstruttori} from "../../../hooks/useImpostaIstruttoreSelezionatoNellaListaIstruttori";

let orari: OrarioPrenotazione[] = [];
let impiantiSelezionati: ImpiantiSelezionatiItem[] = [];
let istruttoriSelezionati: IstruttoriSelezionatiItem[] = [];
let datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni = {};

export const FormPrenotazioneLezione: React.FC = () => {

    const { setValue, handleSubmit /*formState: { errors }*/ } = useForm<FormPrenotazione>();

    const [numeroDate, setNumeroDate] = useState(0);
    const sportPraticabili = useSelector(sportSelector);
    const formPrenotaLezione = useSelector(formPrenotaImpiantoSelector);
    const istruttoriDisponibili = useSelector(istruttoreSelector);
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);
    const aggiornaOpzioniSuSelezioneSport = useAggiornaOpzioniSuSelezioneSport()
    const aggiornaOpzioniSuSelezioneOrario = useAggironaOpzioniSuSelezioneOrario()
    const impostaOrarioSelezionatoNellaListaOrari = useImpostaOrarioSelezionatoNellaListaOrari();
    const impostaImpiantoSelezionatoNellaListaImpianti = useImpostaImpiantoSelezionatoNellaListaImpianti();
    const submitFormPrenotazione = useSubmitFormPrenotazione();
    const impostaIstruttoreSelezionatoNellaListaIstruttori = useImpostaIstruttoreSelezionatoNellaListaIstruttori();

    useEffect(()=>{
        datiPerAggiornamentoOpzioni.jwt = sportivoAutenticato.jwt
    },[sportivoAutenticato.jwt])

    function onSportSelezionato(sportSelezionato: string) {
        datiPerAggiornamentoOpzioni.sport = sportSelezionato
        setValue("sportSelezionato", sportSelezionato)
        aggiornaOpzioniSuSelezioneSport(datiPerAggiornamentoOpzioni)
    }


    const onOrarioSelezione = (orarioSelezionato: OrarioPrenotazione) => {
        impostaOrarioSelezionatoNellaListaOrari(orarioSelezionato, orari)
        datiPerAggiornamentoOpzioni.orario = orarioSelezionato
        datiPerAggiornamentoOpzioni.orariSelezionati = orari
        setValue("orariSelezionati", orari);
        aggiornaOpzioniSuSelezioneOrario(datiPerAggiornamentoOpzioni)
    }

    const onImpiantoSelezioneRicorrente = (impiantoItem: ImpiantiSelezionatiItem) => {
        impostaImpiantoSelezionatoNellaListaImpianti(impiantoItem, impiantiSelezionati)
        setValue("impianti", impiantiSelezionati)
    }

    const onIstruttoreSelezioneRicorrente = (istruttoreItem: IstruttoriSelezionatiItem) => {
        impostaIstruttoreSelezionatoNellaListaIstruttori(istruttoreItem, istruttoriSelezionati)
        setValue("istruttori", istruttoriSelezionati)
    }



    return (
        <Form onSubmit={handleSubmit(submitFormPrenotazione)}>
            <FormGroup>
                <p style={{marginTop: "10px"}}>Selezionare il numero di date da prenotare</p>
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
                <Label style={{ marginLeft: '5px' }}>Seleziona Sport</Label>
                <Row style={{ marginLeft: '1px' }}>
                    <Col>
                        <SelezioneSport sports={sportPraticabili.sports}
                            handleSelezioneSport={onSportSelezionato} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup className="border border-dark rounded" style={{ textAlign: 'left' }}>
                <DataOraImpiantoIstruttoreSelezione impianti={formPrenotaLezione.arrayListeImpianti}
                    handleSelezioneDataOra={onOrarioSelezione}
                    handleSelezioneImpianto={onImpiantoSelezioneRicorrente}
                    numeroDate={numeroDate}
                    istruttori={istruttoriDisponibili.arrayListeIstruttori}
                    handleSelezioneIstruttore={onIstruttoreSelezioneRicorrente} />
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