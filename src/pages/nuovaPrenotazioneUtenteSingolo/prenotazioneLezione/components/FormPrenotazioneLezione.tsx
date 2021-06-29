import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { formPrenotaImpiantoSelector } from '../../../../store/formPrenotaImpiantoSlice';
import { istruttoreSelector } from '../../../../store/IstruttoreSlice';
import { riepilogoPrenotazione } from '../../../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../../../store/sportivoAutenticatoSlice';
import { sportSelector } from '../../../../store/SportSlice';
import { DataOraImpiantoIstruttoreSelezione, IstruttoriSelezionatiItem } from '../../../../components/formComponents/DataOraImpiantoIstruttoreSelezione';
import { OrarioPrenotazione } from '../../../../components/formComponents/DataOraSelezione';
import { SelezioneSport } from '../../../../components/formComponents/SelezioneSport';
import {FormPrenotazione} from "../../../../model/FormPrenotazione";
import {DatiPerAggiornamentoOpzioni} from "../../prenotazioneImpianto/components/FormPrenotazioneImpiantoRicorrente";
import {useAggiornaOpzioniSuSelezioneSport} from "../../prenotazioneImpianto/hooks/useAggiornaOpzioniSuSelezioneSport";
import {useAggironaOpzioniSuSelezioneOrario} from "../../prenotazioneImpianto/hooks/useAggironaOpzioniSuSelezioneOrario";
import { ImpiantiSelezionatiItem } from '../../../../components/formComponents/DataOraImpiantoRicorrente';

let orari: OrarioPrenotazione[] = [];
let impiantiSelezionati: ImpiantiSelezionatiItem[] = [];
let istruttoriSelezionati: IstruttoriSelezionatiItem[] = [];

export const FormPrenotazioneLezione: React.FC = () => {

    const { getValues, setValue, handleSubmit, /*formState: { errors }*/ } = useForm<FormPrenotazione>();

    const dispatch = useDispatch();
    const history = useHistory();
    const [numeroDate, setNumeroDate] = useState(0);
    const sportPraticabili = useSelector(sportSelector);
    //const impiantiDisponibili = useSelector(impiantoSelector);
    const formPrenotaLezione = useSelector(formPrenotaImpiantoSelector);
    const istruttoriDisponibili = useSelector(istruttoreSelector);
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);
    const aggiornaOpzioniSuSelezioneSport = useAggiornaOpzioniSuSelezioneSport()
    const aggiornaOpzioniSuSelezioneOrario = useAggironaOpzioniSuSelezioneOrario()
    let datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni = {
        jwt: sportivoAutenticato.jwt
    }

    function onSportSelezionato(sportSelezionato: string) {
        datiPerAggiornamentoOpzioni.sport = sportSelezionato
        setValue("sportSelezionato", sportSelezionato)
        aggiornaOpzioniSuSelezioneSport(datiPerAggiornamentoOpzioni)
        /*for(let i=1; i<numeroDate+1; i++){
            aggiornaListeImpianti(i, sportSelezionato, getValues("orariSelezionati")[i])
            aggiornaListeIstruttori(i, sportSelezionato, getValues("orariSelezionati")[i])
        }*/
    }

    const onSubmit = handleSubmit((form: FormPrenotazione) => {
        dispatch(riepilogoPrenotazione(form, sportivoAutenticato.jwt))
        history.push("/riepilogoPrenotazioneLezione");
    })



    const onOrarioSelezione = (orarioSelezionato: OrarioPrenotazione) => {
        if(orari.filter(orario => orario.id === orarioSelezionato.id).length === 0){
            orari.push(orarioSelezionato)
        }else{
            orari.filter(orario => orario.id === orarioSelezionato.id)[0].dataPrenotazione = orarioSelezionato.dataPrenotazione
            orari.filter(orario => orario.id === orarioSelezionato.id)[0].oraInizio = orarioSelezionato.oraInizio
            orari.filter(orario => orario.id === orarioSelezionato.id)[0].oraFine = orarioSelezionato.oraFine
        }
        datiPerAggiornamentoOpzioni.orario = orarioSelezionato
        datiPerAggiornamentoOpzioni.orariSelezionati = orari
        setValue("orariSelezionati", orari);
        aggiornaOpzioniSuSelezioneOrario(datiPerAggiornamentoOpzioni)
    }

    const onImpiantoSelezioneRicorrente = (impiantoItem: ImpiantiSelezionatiItem) => {
        if (impiantiSelezionati.filter(item => item.idSelezione === impiantoItem.idSelezione).length === 0) {
            impiantiSelezionati.push(impiantoItem)
        } else {
            impiantiSelezionati.filter(item => item.idSelezione === impiantoItem.idSelezione)[0].idImpianto = impiantoItem.idImpianto
        }
        setValue("impianti", impiantiSelezionati)
    }

    const onIstruttoreSelezioneRicorrente = (istruttoreItem: IstruttoriSelezionatiItem) => {
        if (istruttoriSelezionati.filter(item => item.idSelezione === istruttoreItem.idSelezione).length === 0) {
            istruttoriSelezionati.push(istruttoreItem)
        } else {
            istruttoriSelezionati.filter(item => item.idSelezione === istruttoreItem.idSelezione)[0].istruttore = istruttoreItem.istruttore
        }
        setValue("istruttori", istruttoriSelezionati)
    }



    return (
        <Form onSubmit={onSubmit}>
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