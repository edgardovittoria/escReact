import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { formPrenotaImpiantoSelector } from '../../../../../store/formPrenotaImpiantoSlice';
import { utentePolisportivaSelector } from '../../../../../store/utentePolisportivaSlice';
import { sportSelector } from '../../../../../store/SportSlice';
import { DataOraImpiantoRicorrente } from '../../../../../components/formComponents/DataOraImpiantoRicorrente';
import { GiocatoriNonIscritti } from '../../../../../components/formComponents/GiocatoriNonIscrittiSelezione';
import { PostiLiberi } from '../../../../../components/formComponents/PostiLiberi';
import { SelezioneSport } from '../../../../../components/formComponents/SelezioneSport';
import { SportiviInvitabiliSelezione } from '../../../../../components/formComponents/SportiviInvitabiliSelezione';
import {FormPrenotazione, formPrenotazioneDefault} from "../../../../../model/FormPrenotazione";
import {useSubmitFormPrenotazione} from "../../../hooks/useSubmitFormPrenotazione";
import {
    CheckBoxPendingSelezionatoItem,
    DatiPerAggiornamentoOpzioni,
} from "../../../../../model/TipiAusiliari";
import {useOnSportSelezione} from "../../../hooks/useOnSportSelezione";
import {useOnOrarioselezione} from "../../../hooks/useOnOrarioselezione";
import {useOnImpiantoSelezione} from "../../../hooks/useOnImpiantoSelezione";
import {useOnSportiviInvitabiliSelezione} from "../../../hooks/useOnSportiviInvitabiliSelezione";
import {useOnCheckboxPendingSelezione} from "../../../hooks/useOnCheckboxPendingSelezione";


let datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni = {};



export const FormPrenotazioneImpiantoRicorrente: React.FC = () => {

    const { register, formState: { errors } } = useForm<FormPrenotazione>();

    const [numeroDate, setNumeroDate] = useState(0);
    const [postiLiberi, setPostiliberi] = useState(0);
    const [postiLiberiAggiornato, setPostiliberiAggiornati] = useState(postiLiberi);
    const sportPraticabili = useSelector(sportSelector);
    const sportiviInvitabili = useSelector(utentePolisportivaSelector);
    const opzioni = useSelector(formPrenotaImpiantoSelector);
    const submitFormPrenotazione = useSubmitFormPrenotazione("IMPIANTO");
    const onSportSelezione = useOnSportSelezione(datiPerAggiornamentoOpzioni);
    const onOrarioSelezione = useOnOrarioselezione(datiPerAggiornamentoOpzioni);
    const onImpiantoSelezione = useOnImpiantoSelezione();
    const onSportiviInvitabiliSelezione = useOnSportiviInvitabiliSelezione();
    const onCheckboxPendingSelezione = useOnCheckboxPendingSelezione();

    useEffect(() => {
        datiPerAggiornamentoOpzioni.numeroDate = numeroDate
        formPrenotazioneDefault.tipoPrenotazione = "IMPIANTO"
    }, [numeroDate]);



    const onSportSelezionato = (sportSelezionato: string) => {
        onSportSelezione(sportSelezionato)
        setPostiliberiAggiornati(sportPraticabili.sports.filter((sport) => sport.nome === sportSelezionato)[0].postiLiberi)
        setPostiliberi(sportPraticabili.sports.filter((sport) => sport.nome === sportSelezionato)[0].postiLiberi)
    }




    const onGiocatoriNonIscrittiSelezione = (giocatoriNonIscritti: number) => {
        setPostiliberiAggiornati(postiLiberi - giocatoriNonIscritti)
        formPrenotazioneDefault.postiLiberi = postiLiberi - giocatoriNonIscritti
        formPrenotazioneDefault.numeroGiocatoriNonIscritti = giocatoriNonIscritti
    }


    return (
        <Form onSubmit={() => submitFormPrenotazione(formPrenotazioneDefault)}>
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
                                pending: true
                            }
                            checkboxesPendingDefault.push(checkboxesPendingItem)
                        }
                        formPrenotazioneDefault.checkboxesPending = checkboxesPendingDefault
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
                    handleSelezioneImpianto={onImpiantoSelezione}
                    handleSelezioneCheckBoxPending={onCheckboxPendingSelezione}
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