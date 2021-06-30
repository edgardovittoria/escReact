import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { formPrenotaImpiantoSelector } from '../../../../../store/formPrenotaImpiantoSlice';
import { sportivoAutenticatoSelector } from '../../../../../store/sportivoAutenticatoSlice';
import { utentePolisportivaSelector } from '../../../../../store/utentePolisportivaSlice';
import { sportSelector } from '../../../../../store/SportSlice';
import { CheckBoxPendingSelezionatoItem, DataOraImpiantoRicorrente, ImpiantiSelezionatiItem } from '../../../../../components/formComponents/DataOraImpiantoRicorrente';
import { OrarioPrenotazione } from '../../../../../components/formComponents/DataOraSelezione';
import { GiocatoriNonIscritti } from '../../../../../components/formComponents/GiocatoriNonIscrittiSelezione';
import { PostiLiberi } from '../../../../../components/formComponents/PostiLiberi';
import { SelezioneSport } from '../../../../../components/formComponents/SelezioneSport';
import { SportiviInvitabiliSelezione } from '../../../../../components/formComponents/SportiviInvitabiliSelezione';
import {FormPrenotazione} from "../../../../../model/FormPrenotazione";
import {useAggiornaOpzioniSuSelezioneSport} from "../../../hooks/useAggiornaOpzioniSuSelezioneSport";
import {useAggironaOpzioniSuSelezioneOrario} from "../../../hooks/useAggironaOpzioniSuSelezioneOrario";
import {useImpostaOrarioSelezionatoNellaListaOrari} from "../../../hooks/useImpostaOrarioSelezionatoNellaListaOrari";
import {useImpostaImpiantoSelezionatoNellaListaImpianti} from "../../../hooks/useImpostaImpiantoSelezionatoNellaListaImpianti";
import {useSubmitFormPrenotazione} from "../../../hooks/useSubmitFormPrenotazione";
import {useImpostaCheckboxPendingSelezionatoNellaListaCheckboxPending} from "../../../hooks/useImpostaCheckboxPendingSelezionatoNellaListaCheckboxPending";

let orari: OrarioPrenotazione[] = [];
let impiantiSelezionati: ImpiantiSelezionatiItem[] = [];
let checkboxes: CheckBoxPendingSelezionatoItem[] = [];
let datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni = {};

export interface DatiPerAggiornamentoOpzioni {
    sport?: string,
    orario?: OrarioPrenotazione,
    orariSelezionati?: OrarioPrenotazione[],
    jwt?: string,
    numeroDate?: number,
}

export const FormPrenotazioneImpiantoRicorrente: React.FC = () => {

    console.log("render")
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormPrenotazione>();

    const [numeroDate, setNumeroDate] = useState(0);
    const [postiLiberi, setPostiliberi] = useState(0);
    const [postiLiberiAggiornato, setPostiliberiAggiornati] = useState(postiLiberi);
    const sportPraticabili = useSelector(sportSelector);
    const sportiviInvitabili = useSelector(utentePolisportivaSelector);
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);
    const opzioni = useSelector(formPrenotaImpiantoSelector);
    const aggiornaOpzioniSuSelezioneSport = useAggiornaOpzioniSuSelezioneSport();
    const aggiornaOpzioniSuSelezioneOrario = useAggironaOpzioniSuSelezioneOrario();
    const impostaOrarioSelezionatoNellaListaOrari = useImpostaOrarioSelezionatoNellaListaOrari();
    const impostaImpiantoSelezionatoNellaListaImpianti = useImpostaImpiantoSelezionatoNellaListaImpianti();
    const submitFormPrenotazione = useSubmitFormPrenotazione();
    const impostaCheckboxPendingSelezionatoNellaListaCheckboxPending = useImpostaCheckboxPendingSelezionatoNellaListaCheckboxPending();

    useEffect(() => {
        datiPerAggiornamentoOpzioni.numeroDate = numeroDate
        datiPerAggiornamentoOpzioni.jwt = sportivoAutenticato.jwt
    }, [numeroDate, sportivoAutenticato.jwt]);



    const onSportSelezionato = (sportSelezionato: string) => {
        datiPerAggiornamentoOpzioni.sport = sportSelezionato
        setValue("sportSelezionato", sportSelezionato)
        aggiornaOpzioniSuSelezioneSport(datiPerAggiornamentoOpzioni)
        setPostiliberiAggiornati(sportPraticabili.sports.filter((sport) => sport.nome === sportSelezionato)[0].postiLiberi)
        setPostiliberi(sportPraticabili.sports.filter((sport) => sport.nome === sportSelezionato)[0].postiLiberi)
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

    const onCheckBoxPendingSelezioneRicorrente = (checkBoxPendingItem: CheckBoxPendingSelezionatoItem) => {
        impostaCheckboxPendingSelezionatoNellaListaCheckboxPending(checkBoxPendingItem, checkboxes)
        setValue("checkboxesPending", checkboxes)
    }

    const onSportiviInvitabiliSelezione = (emailSportivi: string[]) => {
        setValue("sportiviInvitati", emailSportivi)
    }

    const onGiocatoriNonIscrittiSelezione = (giocatoriNonIscritti: number) => {
        setPostiliberiAggiornati(postiLiberi - giocatoriNonIscritti)
        setValue("postiLiberi", postiLiberi - giocatoriNonIscritti)
        setValue("numeroGiocatoriNonIscritti", giocatoriNonIscritti)
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
                        setNumeroDate(Number.parseInt(value.currentTarget.value))
                        let checkboxesPendingDefault: CheckBoxPendingSelezionatoItem[] = [];
                        for(let i = 1; i<= Number.parseInt(value.currentTarget.value); i++){
                            let checkboxesPendingItem: CheckBoxPendingSelezionatoItem = {
                                idSelezione: i,
                                pending: false
                            }
                            checkboxesPendingDefault.push(checkboxesPendingItem)
                        }
                        setValue("checkboxesPending", checkboxesPendingDefault)
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
                            handleSelezioneSport={onSportSelezionato}
                            {...register("sportSelezionato", {required: true})} />
                            {errors.sportSelezionato?.type === "required" && "Selezionare uno sport prima di procedere"}
                    </Col>
                    <Col id="postiLiberiContenitore">Posti Liberi: <PostiLiberi postiLiberiAggiornati={postiLiberiAggiornato} /></Col>
                </Row>
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
                <Label>Invita sportivi alla prenotazione</Label>
                <Row>
                    <Col>
                        <SportiviInvitabiliSelezione sportiviInvitabili={sportiviInvitabili.sportivi}
                            handleSelezioneSportiviInvitabili={onSportiviInvitabiliSelezione} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Label>Numero giocatori non iscritti da associare alla prenotazione</Label>
                <Row>
                    <Col>
                        <GiocatoriNonIscritti postiLiberi={postiLiberi}
                            handleGiocatoriNonIscrittiSelezione={onGiocatoriNonIscrittiSelezione} />
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