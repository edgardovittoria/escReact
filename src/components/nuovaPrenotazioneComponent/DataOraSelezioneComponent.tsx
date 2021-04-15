import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { RHFInput } from 'react-hook-form-input';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { sportSelector } from '../../store/SportSlice';
import moment, { Moment } from 'moment';
import { impiantoSelector } from '../../store/impiantoSlice';
import { sportivoSelector } from '../../store/sportivoSlice';


export type FormPrenotaImpianto = {
    sportSelezionato: string,
    dataPrenotazione: Date,
    oraInizio: string,
    oraFine: string,
    impianto: number,
    sportiviInvitati: string[],
    postiLiberi: number,
    numeroGiocatoriNonIscritti: number
}


export const DataOraSelezione: React.FC = () => {

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormPrenotaImpianto>();

    const [rangeOrariFinePrenotazione, setOrari] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [orarioFinePrenotazioneDefault, setOrarioDefault] = useState(moment.utc().set({ hour: 10, minute: 0 }));
    const sportPraticabili = useSelector(sportSelector);
    const impiantiDisponibili = useSelector(impiantoSelector);
    const sportiviInvitabili = useSelector(sportivoSelector);
    const [postiLiberi, setPostiliberi] = useState(0);
    const [postiLiberiAggiornato, setPostiliberiAggiornati] = useState(postiLiberi);
    const [sportSelezionato, setSportSelezionato] = useState("");

    const onSubmit = handleSubmit((data: FormPrenotaImpianto) => {
        console.log(data)
    })

    return (
        <>
            <Label>PRENOTAZIONE IMPIANTO</Label>

            <Form onSubmit={onSubmit}>
                <FormGroup className="border border-dark rounded" style={{ textAlign: 'left' }}>
                    <Label style={{ marginLeft: '5px' }}>Seleziona Sport</Label>
                    <Row style={{ marginLeft: '1px' }}>
                        <Col>
                            <div className="form-check col-sm col-4">
                                {sportPraticabili.sports.map((sport) => {
                                    return (
                                        <>
                                            <Label className="form-check-label" style={{ display: 'inline' }}>
                                                <input
                                                    {...register("sportSelezionato")}
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="sportSelezionato"
                                                    value={sport.nome}
                                                    onInput={(target) => {
                                                        sportPraticabili.sports.filter(sport => sport.nome.match(target.currentTarget.value)).map(sportSelezionato => {
                                                            setPostiliberi(sportSelezionato.postiLiberi)
                                                            setPostiliberiAggiornati(sportSelezionato.postiLiberi)
                                                            setSportSelezionato(target.currentTarget.value)
                                                        })
                                                    }} />
                                                <div>{sport.nome}</div>
                                            </Label>
                                        </>
                                    )
                                })}
                            </div>
                        </Col>
                        <Col id="postiLiberiContenitore">Posti Liberi: <span {...register("postiLiberi")}>{postiLiberiAggiornato}</span></Col>
                    </Row>
                </FormGroup>
                <FormGroup className="border border-dark rounded" style={{ textAlign: 'left' }}>
                    <Row style={{ marginLeft: '1px' }}>
                        <Col>
                            <Label>Data Prenotazione : </Label>
                            <input
                                {...register("dataPrenotazione")}
                                type="date"
                                id="start"
                                name="dataPrenotazione"
                                defaultValue="2021-04-15"
                                min="2021-04-15"
                                max="2021-12-31"
                                style={{ width: "70%" }} />
                        </Col>
                        <Col>
                            <Label>Orario Inizio Prenotazione : </Label>
                            <TimePicker
                                {...register("oraInizio")}
                                showSecond={false}
                                minuteStep={30}
                                defaultValue={moment.utc().set({ hour: 10, minute: 0 })}
                                defaultOpenValue={moment.utc().set({ hour: 10, minute: 0 })}
                                disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 23]}
                                onChange={(value) => {
                                    setValue("oraInizio", value.hour() + ":" + value.minutes())
                                    var nuoviOrariFinePrenotazione: number[] = []
                                    for (var i = 0; i < value.hour(); i++) {
                                        nuoviOrariFinePrenotazione.push(i);
                                    }
                                    setOrari(nuoviOrariFinePrenotazione);
                                    setOrarioDefault(moment.utc().set({ hour: value.hour(), minute: 0 }))

                                }} />
                        </Col>
                        <Col>
                            <Label>Orario Fine Prenotazione : </Label>
                            <TimePicker
                                {...register("oraFine")}
                                name="oraFine"
                                showSecond={false}
                                minuteStep={30}
                                disabledHours={() => rangeOrariFinePrenotazione}
                                onChange={(value) => setValue("oraFine", value.hour() + ":" + value.minutes())}
                            />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Label style={{ marginLeft: '5px' }}>Seleziona Impianto</Label>
                    <Row style={{ marginLeft: '1px' }}>
                        <Col>
                            <select
                                {...register("impianto")}
                                className="form-control"
                                name="impianto"
                                id="selezioneImpianto"
                            >
                                {impiantiDisponibili.impianti.map((impianto) => {
                                    return (
                                        <>
                                            <option value={impianto.idImpianto}>{impianto.idImpianto} {impianto.pavimentazione}</option>
                                        </>
                                    )
                                })}
                            </select>
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
                <Button type="submit" outline size="lg" color="success">Conferma Prenotazione</Button>
            </Form>
        </>
    )
}