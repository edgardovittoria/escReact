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
import { SportiviInvitabiliSelezione } from '../formComponents/SportiviInvitabiliSelezioneComponent';


export type FormPrenotaImpianto = {
    sportSelezionato: string,
    dataPrenotazione: Date,
    oraInizio: Date,
    oraFine: Date,
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
        setPostiliberiAggiornati(sportPraticabili.sports.filter((sport) => sport.nome === sportSelezionato)[0].postiLiberi)
        setPostiliberi(sportPraticabili.sports.filter((sport) => sport.nome === sportSelezionato)[0].postiLiberi)

    }

    

    function onOrarioSelezione(orarioSelezionato: OrarioPrenotazione){
        setValue("dataPrenotazione", orarioSelezionato.dataOraInizio)
        setValue("oraInizio", orarioSelezionato.dataOraInizio)
        setValue("oraFine", orarioSelezionato.dataOraFine)
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

    const onSportiviInvitabiliSelezione = (emailSportivi: string[]) => {
        setValue("sportiviInvitati", emailSportivi)
    }

    return (
        <>
            <Label>PRENOTAZIONE IMPIANTO</Label>

            <Form onSubmit={onSubmit}>
                <FormGroup className="border border-dark rounded" style={{ textAlign: 'left' }}>
                    <Label style={{ marginLeft: '5px' }}>Seleziona Sport</Label>
                    <Row style={{ marginLeft: '1px' }}>
                        <Col>
                            <SelezioneSport sports={sportPraticabili.sports} 
                                handleSelezioneSport={onSportSelezionato} />
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
                                handleSelezioneImpianto={onImpiantoSelezione}/>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Label>Invita sportivi alla prenotazione</Label>
                    <Row>
                        <Col>
                            <SportiviInvitabiliSelezione sportivi={sportiviInvitabili.sportivi}
                                handleSelezioneSportiviInvitabili={onSportiviInvitabiliSelezione} />
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
                                <option key={1} value={1}>1</option>
                                <option key={2} value={2}>2</option>
                                <option key={3} value={3}>3</option>
                            </select>
                        </Col>
                    </Row>
                </FormGroup>
                <Button type="submit" outline size="lg" block color="success">Procedi</Button>
            </Form>
        </>
    )
}