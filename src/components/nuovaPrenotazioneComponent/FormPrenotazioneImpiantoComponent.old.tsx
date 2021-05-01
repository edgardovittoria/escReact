import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { resetListaSportPraticabili, sportSelector } from '../../store/SportSlice';
import moment from 'moment';
import { impiantoSelector, resetListaImpiantiDisponibili } from '../../store/impiantoSlice';
import { resetListaInvitabili, sportivoSelector } from '../../store/sportivoSlice';
import { aggiornaImpianti, riepilogoPrenotazione } from '../../store/prenotazioneSlice';
import { useHistory } from 'react-router';
import { SelezioneSport } from '../formComponents/SelezioneSportComponent';
import { DataOraSelezione, OrarioPrenotazione } from '../formComponents/DataOraSelezioneComponent';
import { ImpiantoSelezione } from '../formComponents/ImpiantoSelezioneComponet';


export type FormPrenotaImpianto = {
    sportSelezionato: string,
    dataPrenotazione: string,
    oraInizio: string,
    oraFine: string,
    impianto: number,
    sportiviInvitati: string[],
    postiLiberi: number,
    numeroGiocatoriNonIscritti: number
}


export const FormPrenotazioneImpianto: React.FC = () => {

    const { register, getValues, setValue, handleSubmit, formState: { errors } } = useForm<FormPrenotaImpianto>();

    
    const sportPraticabili = useSelector(sportSelector);
    const impiantiDisponibili = useSelector(impiantoSelector);
    const sportiviInvitabili = useSelector(sportivoSelector);
    const [postiLiberi, setPostiliberi] = useState(0);
    const [postiLiberiAggiornato, setPostiliberiAggiornati] = useState(postiLiberi);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = handleSubmit((form: FormPrenotaImpianto) => {
        setValue("postiLiberi", 1)
        dispatch(riepilogoPrenotazione(form))
        dispatch(resetListaImpiantiDisponibili())
        dispatch(resetListaInvitabili())
        dispatch(resetListaSportPraticabili())
        history.push("riepilogoPrenotazione")
        //console.log(form)
        
    })

    function onSportSelezionato(sportSelezionato: string) {
        setValue("sportSelezionato", sportSelezionato)
    }

    function onOrarioSelezione(orarioSelezionato: OrarioPrenotazione){
        setValue("dataPrenotazione", orarioSelezionato.dataOraInizio.toJSON())
        setValue("oraInizio", orarioSelezionato.dataOraInizio.toJSON())
        setValue("oraFine", orarioSelezionato.dataOraFine.toJSON())
        let object = {
            sport: getValues("sportSelezionato"),
            orario: orarioSelezionato
        }
        dispatch(aggiornaImpianti(object))
    }
    const onImpiantoSelezione = (id: number) => {
        setValue("impianto", id)
        //console.log(id)
    }

    return (
        <>
            <Label>PRENOTAZIONE IMPIANTO</Label>

            <Form onSubmit={onSubmit}>
                <FormGroup className="border border-dark rounded" style={{ textAlign: 'left' }}>
                    <Label style={{ marginLeft: '5px' }}>Seleziona Sport</Label>
                    <Row style={{ marginLeft: '1px' }}>
                        <Col>
                            <SelezioneSport sports={sportPraticabili.sports} isLoading={false} errors="" handleSelezioneSport={onSportSelezionato} />
                        </Col>
                        <Col id="postiLiberiContenitore">Posti Liberi: <span {...register("postiLiberi")}>{postiLiberiAggiornato}</span></Col>
                    </Row>
                </FormGroup>
                <FormGroup className="border border-dark rounded" style={{ textAlign: 'left' }}>
                    <DataOraSelezione handleSelezioneOrario={onOrarioSelezione} />
                </FormGroup>
                <FormGroup>
                    <Label style={{ marginLeft: '5px' }}>Seleziona Impianto</Label>
                    <Row style={{ marginLeft: '1px' }}>
                        <Col>
                            <ImpiantoSelezione impianti={impiantiDisponibili.impianti} 
                                isLoading={impiantiDisponibili.isLoading}
                                errors={impiantiDisponibili.errors} 
                                handleSelezioneImpianto={onImpiantoSelezione}/>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Label>Invita sportivi alla prenotazione</Label>
                    <Row>
                        <Col>
                            <select
                                {...register("sportiviInvitati")}
                                multiple
                                className="form-control selectpicker"
                                data-live-search="true"
                                id="invitaSportivi"
                                name="sportiviInvitati"
                            >
                                {sportiviInvitabili.sportivi.map((sportivo) => {
                                    return (<option value={sportivo.email}>{sportivo.nome} {sportivo.cognome}</option>)
                                })}
                            </select>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Label>Numero giocatori non iscritti da associare alla prenotazione</Label>
                    <Row>
                        <Col>
                            <select className="form-control"
                                {...register("numeroGiocatoriNonIscritti")}
                                name="numeroGiocatoriNonIscritti"
                                id="invitaSportiviNonIscritti"
                                onChange={(value) => {
                                    setPostiliberiAggiornati(postiLiberi - parseInt(value.currentTarget.value))
                                    setValue("postiLiberi", postiLiberi - parseInt(value.currentTarget.value))
                                }}
                            >

                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </select>
                        </Col>
                    </Row>
                </FormGroup>
                <Button type="submit" outline size="lg" block color="success">Procedi</Button>
            </Form>
        </>
    )
}