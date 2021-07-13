import React, {useState} from "react";
import { useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import { formPrenotaImpiantoSelector } from "../../../../store/formPrenotaImpiantoSlice";
import { istruttoreSelector } from "../../../../store/IstruttoreSlice";
import { utentePolisportivaSelector } from "../../../../store/utentePolisportivaSlice";
import { sportSelector } from "../../../../store/SportSlice";
import { DataOraImpiantoIstruttoreSelezione } from "../../../../components/formComponents/DataOraImpiantoIstruttoreSelezione";
import { SelezioneSport } from "../../../../components/formComponents/SelezioneSport";
import { SportiviInvitabiliSelezione } from "../../../../components/formComponents/SportiviInvitabiliSelezione";
import {formPrenotazioneDefault} from "../../../../model/FormPrenotazione";
import {useSubmitFormPrenotazione} from "../../hooks/useSubmitFormPrenotazione";
import {DatiPerAggiornamentoOpzioni} from "../../../../model/TipiAusiliari";
import {useOnOrarioselezione} from "../../hooks/useOnOrarioselezione";
import {useOnImpiantoSelezione} from "../../hooks/useOnImpiantoSelezione";
import {useOnIstruttoreSelezione} from "../../hooks/useOnIstruttoreSelezione";
import {useOnSportiviInvitabiliSelezione} from "../../hooks/useOnSportiviInvitabiliSelezione";
import {useOnSportSelezione} from "../../hooks/useOnSportSelezione";


let datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni = {};

export const FormCreazioneCorso: React.FC = () => {

    const [numeroDate, setNumeroDate] = useState(0);
    const sportPraticabili = useSelector(sportSelector);
    const formPrenotaLezione = useSelector(formPrenotaImpiantoSelector);
    const istruttoriDisponibili = useSelector(istruttoreSelector);
    const sportiviInvitabili = useSelector(utentePolisportivaSelector);
    const submitFormPrenotazione = useSubmitFormPrenotazione("CORSO");
    const onSportSelezione = useOnSportSelezione(datiPerAggiornamentoOpzioni);
    const onOrarioSelezione = useOnOrarioselezione(datiPerAggiornamentoOpzioni);
    const onImpiantoSelezione = useOnImpiantoSelezione();
    const onIstruttoreSelezione = useOnIstruttoreSelezione();
    const onSportiviInvitabiliSelezione = useOnSportiviInvitabiliSelezione();



    return (
        <Form onSubmit={() => submitFormPrenotazione(formPrenotazioneDefault)}>
            <FormGroup>
                <Label style={{ marginLeft: '5px' }}>Inserire il nome del corso</Label>
                <input type="text" id="nomeCorso" name="nomeCorso"
                       style={{width:"100%"}}
                       onChange={(target) => {
                           //setValue("nomeEvento", target.currentTarget.value)
                           formPrenotazioneDefault.nomeEvento = target.currentTarget.value
                       }}/>
            </FormGroup>
            <FormGroup>
                <Label style={{ marginLeft: '5px' }}>Seleziona il numero minimo di partecipanti</Label>
                <select
                    className="form-control"
                    name="numeroMinimoPartecipanti"
                    id="numeroMinimoPartecipanti"
                    onClick={(value) => {
                        //setValue("numeroMinimoPartecipanti", Number.parseInt(value.currentTarget.value))
                        formPrenotazioneDefault.numeroMinimoPartecipanti = Number.parseInt(value.currentTarget.value)
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
                        //setValue("numeroMassimoPartecipanti", Number.parseInt(value.currentTarget.value))
                        formPrenotazioneDefault.numeroMassimoPartecipanti = Number.parseInt(value.currentTarget.value)
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
                        //setValue("costoPerPartecipante", Number.parseInt(target.currentTarget.value))
                        formPrenotazioneDefault.costoPerPartecipante = Number.parseInt(target.currentTarget.value)
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
                            handleSelezioneSport={onSportSelezione} />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup className="border border-dark rounded" style={{ textAlign: 'left' }}>
                <DataOraImpiantoIstruttoreSelezione impianti={formPrenotaLezione.arrayListeImpianti}
                    handleSelezioneDataOra={onOrarioSelezione}
                    handleSelezioneImpianto={onImpiantoSelezione}
                    numeroDate={numeroDate}
                    istruttori={istruttoriDisponibili.arrayListeIstruttori}
                    handleSelezioneIstruttore={onIstruttoreSelezione} />
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
