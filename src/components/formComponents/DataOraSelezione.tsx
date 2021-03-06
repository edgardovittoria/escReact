/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Col, Label, Row } from 'reactstrap';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment, { Moment } from 'moment';
import {OrarioPrenotazione} from "../../model/TipiAusiliari";

export type OrarioProps = {
    handleSelezioneOrario: Function,
    chiave: number
}

const dataApprossimata = (): Date => {
    let oraInizio = new Date()
    if(oraInizio.getMinutes() < 30){
        oraInizio.setMinutes(30)
    }else{
        oraInizio.setMinutes(0)
        oraInizio.setHours(oraInizio.getHours() + 1)
    }
    return oraInizio;
    
}

export const DataOraSelezione: React.FC<OrarioProps> = ({ handleSelezioneOrario, chiave }) => {

    const [oraInizio, setOraInizio] = useState<Date>(dataApprossimata())
    const [oraFine, setOraFine] = useState<Date>(dataApprossimata())

    useEffect(() => {
        let orarioSelezionato: OrarioPrenotazione = {
            id: chiave,
            dataPrenotazione: oraInizio,
            oraInizio: oraInizio,
            oraFine: oraFine
        }
        handleSelezioneOrario(orarioSelezionato)
    }, [oraFine])

    

    const [rangeOrariFinePrenotazione, setOrari] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [oraFineDefault, setOraFineDefault] = useState<Moment>(moment.utc().set({ date: oraInizio.getDate(), hour: oraInizio.getHours() + 1, minute: oraInizio.getMinutes() }))


    return (
        <Row style={{ marginLeft: '1px' }} key={chiave}>
            <Col>
                <Label>Data Prenotazione : </Label>
                <input
                    type="date"
                    id="start"
                    name="dataPrenotazione"
                    defaultValue={oraInizio.toISOString().substring(0, 10)}
                    min={oraInizio.toISOString().substring(0, 10)}
                    max="2021-12-31"
                    style={{ width: "70%" }}
                    onChange={(target) => {

                        let oraInizioDaImpostare = new Date(Date.parse(target.currentTarget.value))
                        oraInizioDaImpostare.setHours(oraInizio.getHours())
                        oraInizioDaImpostare.setMinutes(oraInizio.getMinutes())
                        setOraInizio(oraInizioDaImpostare)
                        let oraFineDaImpostare = new Date(Date.parse(target.currentTarget.value))
                        oraFineDaImpostare.setHours(oraFine.getHours())
                        oraFineDaImpostare.setMinutes(oraFine.getMinutes())
                        setOraFine(oraFineDaImpostare)


                    }} />
            </Col>
            <Col>
                <Label>Orario Inizio Prenotazione : </Label>
                <TimePicker
                    showSecond={false}
                    minuteStep={30}
                    defaultValue={moment.utc().set({ date: oraInizio.getDate(), hour: oraInizio.getHours(), minute: oraInizio.getMinutes() })}
                    defaultOpenValue={moment.utc().set({ date: oraInizio.getDate(), hour: oraInizio.getHours(), minute: oraInizio.getMinutes() })}
                    disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 23]}
                    onChange={(value) => {

                        setOraFineDefault(moment.utc().set({ date: oraInizio.getDate(), hour: value.hours() + 1, minute: value.minutes() }))

                        let oraInizioConData = new Date(oraInizio)
                        oraInizioConData.setHours(value.hours())
                        oraInizioConData.setMinutes(value.minutes())
                        setOraInizio(oraInizioConData)

                        let nuoviOrariFinePrenotazione: number[] = []
                        for (let i = 0; i < value.hours()+1; i++) {
                            nuoviOrariFinePrenotazione.push(i);
                        }
                        setOrari(nuoviOrariFinePrenotazione);

                    }} />
            </Col>
            <Col>
                <Label>Orario Fine Prenotazione : </Label>
                <TimePicker
                    name="oraFine"
                    showSecond={false}
                    minuteStep={30}
                    defaultValue={oraFineDefault}
                    defaultOpenValue={oraFineDefault}
                    disabledHours={() => rangeOrariFinePrenotazione}
                    onChange={(value) => {

                        let oraFineConData = new Date(oraFine)
                        oraFineConData.setHours(value.hours())
                        oraFineConData.setMinutes(value.minutes())
                        setOraFine(oraFineConData)


                    }}
                />
            </Col>
        </Row>
    )
}