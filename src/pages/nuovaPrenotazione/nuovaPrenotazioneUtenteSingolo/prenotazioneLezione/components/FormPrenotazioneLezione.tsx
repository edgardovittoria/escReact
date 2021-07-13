import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { formPrenotaImpiantoSelector } from '../../../../../store/formPrenotaImpiantoSlice';
import { istruttoreSelector } from '../../../../../store/IstruttoreSlice';
import { sportSelector } from '../../../../../store/SportSlice';
import { DataOraImpiantoIstruttoreSelezione } from '../../../../../components/formComponents/DataOraImpiantoIstruttoreSelezione';
import { SelezioneSport } from '../../../../../components/formComponents/SelezioneSport';
import {formPrenotazioneDefault} from "../../../../../model/FormPrenotazione";
import {useSubmitFormPrenotazione} from "../../../hooks/useSubmitFormPrenotazione";
import {DatiPerAggiornamentoOpzioni} from "../../../../../model/TipiAusiliari";
import {useOnSportSelezione} from "../../../hooks/useOnSportSelezione";
import {useOnOrarioselezione} from "../../../hooks/useOnOrarioselezione";
import {useOnImpiantoSelezione} from "../../../hooks/useOnImpiantoSelezione";
import {useOnIstruttoreSelezione} from "../../../hooks/useOnIstruttoreSelezione";

let datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni = {};

export const FormPrenotazioneLezione: React.FC = () => {


    const [numeroDate, setNumeroDate] = useState(0);
    const sportPraticabili = useSelector(sportSelector);
    const formPrenotaLezione = useSelector(formPrenotaImpiantoSelector);
    const istruttoriDisponibili = useSelector(istruttoreSelector);
    const submitFormPrenotazione = useSubmitFormPrenotazione("LEZIONE");
    const onSportSelezione = useOnSportSelezione(datiPerAggiornamentoOpzioni);
    const onOrarioSelezione = useOnOrarioselezione(datiPerAggiornamentoOpzioni);
    const onImpiantoSelezione = useOnImpiantoSelezione();
    const onIstruttoreSelezione = useOnIstruttoreSelezione();

    return (
        <Form onSubmit={() => submitFormPrenotazione(formPrenotazioneDefault)}>
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
            <Button type="submit" 
            outline 
            size="lg" 
            block 
            color="success"
            style={{marginBottom: "50px"}}>Procedi</Button>
        </Form>
    )
}