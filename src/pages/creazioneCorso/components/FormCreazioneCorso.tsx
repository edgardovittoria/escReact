import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import { formPrenotaImpiantoSelector } from "../../../store/formPrenotaImpiantoSlice";
import { istruttoreSelector } from "../../../store/IstruttoreSlice";
import { riepilogoPrenotazione } from "../../../store/prenotazioneSlice";
import { sportivoAutenticatoSelector } from "../../../store/sportivoAutenticatoSlice";
import { utentePolisportivaSelector } from "../../../store/utentePolisportivaSlice";
import { sportSelector } from "../../../store/SportSlice";
import { DataOraImpiantoIstruttoreSelezione, IstruttoriSelezionatiItem } from "../../../components/formComponents/DataOraImpiantoIstruttoreSelezione";
import { ImpiantiSelezionatiItem } from "../../../components/formComponents/DataOraImpiantoRicorrente";
import { OrarioPrenotazione } from "../../../components/formComponents/DataOraSelezione";
import { SelezioneSport } from "../../../components/formComponents/SelezioneSport";
import { SportiviInvitabiliSelezione } from "../../../components/formComponents/SportiviInvitabiliSelezione";
import {FormPrenotazione} from "../../../model/FormPrenotazione";
import {useAggiornaOpzioniSuSelezioneSport} from "../../nuovaPrenotazioneUtenteSingolo/prenotazioneImpianto/hooks/useAggiornaOpzioniSuSelezioneSport";
import {useAggironaOpzioniSuSelezioneOrario} from "../../nuovaPrenotazioneUtenteSingolo/prenotazioneImpianto/hooks/useAggironaOpzioniSuSelezioneOrario";
import {DatiPerAggiornamentoOpzioni} from "../../nuovaPrenotazioneUtenteSingolo/prenotazioneImpianto/components/FormPrenotazioneImpiantoRicorrente";


let orari: OrarioPrenotazione[] = [];
let impiantiSelezionati: ImpiantiSelezionatiItem[] = [];
let istruttoriSelezionati: IstruttoriSelezionatiItem[] = [];

export const FormCreazioneCorso: React.FC = () => {

    const { handleSubmit, getValues, setValue } = useForm<FormPrenotazione>();

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);


    const onSubmit = handleSubmit((form: FormPrenotazione) => {
        dispatch(riepilogoPrenotazione(form, sportivoAutenticato.jwt))
        history.push("/riepilogoCreazioneCorso");
    })

    const dispatch = useDispatch();
    const history = useHistory();
    const [numeroDate, setNumeroDate] = useState(0);
    const sportPraticabili = useSelector(sportSelector);
    const formPrenotaLezione = useSelector(formPrenotaImpiantoSelector);
    const istruttoriDisponibili = useSelector(istruttoreSelector);
    const aggiornaOpzioniSuSelezioneSport = useAggiornaOpzioniSuSelezioneSport();
    const aggiornaOpzioniSuSelezioneOrario = useAggironaOpzioniSuSelezioneOrario();
    let datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni = {
        jwt: sportivoAutenticato.jwt
    };

    function onSportSelezionato(sportSelezionato: string) {
        datiPerAggiornamentoOpzioni.sport = sportSelezionato
        setValue("sportSelezionato", sportSelezionato)
        aggiornaOpzioniSuSelezioneSport(datiPerAggiornamentoOpzioni)
        /*for(let i=1; i<numeroDate+1; i++){
            aggiornaListeImpianti(i, sportSelezionato, getValues("orariSelezionati")[i])
            aggiornaListeIstruttori(i, sportSelezionato, getValues("orariSelezionati")[i])
        }*/
    }


    const onOrarioSelezione = (orarioSelezionato: OrarioPrenotazione) => {
        if(orari.filter(orario => orario.id === orarioSelezionato.id).length === 0){
            orari.push(orarioSelezionato)
        }else{
            orari.filter(orario => orario.id === orarioSelezionato.id)[0].dataPrenotazione = orarioSelezionato.dataPrenotazione
            orari.filter(orario => orario.id === orarioSelezionato.id)[0].oraInizio = orarioSelezionato.oraInizio
            orari.filter(orario => orario.id === orarioSelezionato.id)[0].oraFine = orarioSelezionato.oraFine
        }
        datiPerAggiornamentoOpzioni.orariSelezionati = orari
        datiPerAggiornamentoOpzioni.orario = orarioSelezionato
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

    const sportiviInvitabili = useSelector(utentePolisportivaSelector);
    const onSportiviInvitabiliSelezione = (emailSportivi: string[]) => {
        setValue("sportiviInvitati", emailSportivi)
    }


    return (
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label style={{ marginLeft: '5px' }}>Seleziona il numero minimo di partecipanti</Label>
                <select
                    className="form-control"
                    name="numeroMinimoPartecipanti"
                    id="numeroMinimoPartecipanti"
                    onClick={(value) => {
                        setValue("numeroMinimoPartecipanti", Number.parseInt(value.currentTarget.value))
                    }}
                >
                    <option key={1} value={1}>1</option>
                    <option key={2} value={2}>2</option>
                    <option key={3} value={3}>3</option>
                    <option key={4} value={4}>4</option>
                    <option key={5} value={5}>5</option>
                </select>
            </FormGroup>
            <FormGroup>
                <Label style={{ marginLeft: '5px' }}>Seleziona il numero massimo di partecipanti</Label>
                <select
                    className="form-control"
                    name="numeroMassimoPartecipanti"
                    id="numeroMassimoPartecipanti"
                    onClick={(value) => {
                        setValue("numeroMassimoPartecipanti", Number.parseInt(value.currentTarget.value))
                    }}
                >
                    <option key={5} value={5}>5</option>
                    <option key={6} value={6}>6</option>
                    <option key={7} value={7}>7</option>
                    <option key={8} value={8}>8</option>
                    <option key={9} value={9}>9</option>
                </select>
            </FormGroup>
            <FormGroup>
                <Label style={{ marginLeft: '5px' }}>Scegli il costo per partecipante</Label>
                <input type="number" id="costoPerPartecipante" name="costoPerPartecipante"
                    style={{width:"100%"}}
                    onInput={(target) => {
                        setValue("costoPerPartecipante", Number.parseInt(target.currentTarget.value))
                    }}/>
            </FormGroup>
            <FormGroup>
            <Label style={{ marginLeft: '5px' }}>Seleziona il numero di date del corso</Label>
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
            <FormGroup>
                <Label>Invita sportivi al corso</Label>
                <Row>
                    <Col>
                        <SportiviInvitabiliSelezione sportiviInvitabili={sportiviInvitabili.sportivi}
                            handleSelezioneSportiviInvitabili={onSportiviInvitabiliSelezione} />
                    </Col>
                </Row>
            </FormGroup>
            <Button type="submit"
                outline
                size="lg"
                block
                color="success"
                style={{ marginBottom: "50px" }}>Procedi</Button>
        </Form>
    )
}
