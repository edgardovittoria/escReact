import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { impiantoSelector } from '../../../store/impiantoSlice';
import { istruttoreSelector } from '../../../store/IstruttoreSlice';
import { aggiornaImpiantiRicorrente, aggiornaIstruttori, riepilogoPrenotazione } from '../../../store/prenotazioneSlice';
import { sportSelector } from '../../../store/SportSlice';
import { DataOraImpiantoIstruttoreSelezione, IstruttoriSelezionatiItem } from '../formComponents/DataOraImpiantoIstruttoreSelezioneComponent';
import { ImpiantiSelezionatiItem } from '../formComponents/DataOraImpiantoRicorrenteComponent';
import { OrarioPrenotazione } from '../formComponents/DataOraSelezioneComponent';
import { SelezioneSport } from '../formComponents/SelezioneSportComponent';

export type FormPrenotaLezione = {
    sportSelezionato: string,
    orariSelezionati: OrarioPrenotazione[],
    impianti: ImpiantiSelezionatiItem[],
    istruttori: IstruttoriSelezionatiItem[],
    tipoPrenotazione: string
}

let orari: OrarioPrenotazione[] = [];
let impiantiSelezionati: ImpiantiSelezionatiItem[] = [];
let istruttoriSelezionati: IstruttoriSelezionatiItem[] = [];

export const FormPrenotazioneLezione: React.FC = () => {

    const { getValues, setValue, handleSubmit, /*formState: { errors }*/ } = useForm<FormPrenotaLezione>();

    const dispatch = useDispatch();
    const history = useHistory();
    const [numeroDate, setNumeroDate] = useState(0);
    const sportPraticabili = useSelector(sportSelector);
    const impiantiDisponibili = useSelector(impiantoSelector);
    const istruttoriDisponibili = useSelector(istruttoreSelector);

    function onSportSelezionato(sportSelezionato: string) {
        setValue("sportSelezionato", sportSelezionato)
        setValue("tipoPrenotazione", "LEZIONE");
        for(let i=1; i<numeroDate+1; i++){
            aggiornaListeImpianti(i, sportSelezionato, getValues("orariSelezionati")[i])
            aggiornaListeIstruttori(i, sportSelezionato, getValues("orariSelezionati")[i])
        }
    }

    const onSubmit = handleSubmit((form: FormPrenotaLezione) => {
        dispatch(riepilogoPrenotazione(form))
        history.push("/riepilogoPrenotazioneLezione");
    })

    const aggiornaListeImpianti = (id: number, sport: string, orarioSelezionato: OrarioPrenotazione) => {
        if (sport !== undefined && orarioSelezionato !== undefined) {
            let object = {
                sport: sport,
                orario: orarioSelezionato
            }
            dispatch(aggiornaImpiantiRicorrente(object, id));
        }else if (sport === undefined && orarioSelezionato !== undefined){
            let object = {
                orario : orarioSelezionato
            }
            dispatch(aggiornaImpiantiRicorrente(object, id));
        }else if(sport !== undefined && orarioSelezionato === undefined){
            let object = {
                sport: sport
            }
            dispatch(aggiornaImpiantiRicorrente(object, id))
        }

    }
    const aggiornaListeIstruttori = (id: number, sport: string, orarioSelezionato: OrarioPrenotazione) => {
        if (sport !== undefined && orarioSelezionato !== undefined) {
            let object = {
                sport: sport,
                orario: orarioSelezionato
            }
            dispatch(aggiornaIstruttori(object, id));
        }else if (sport === undefined && orarioSelezionato !== undefined){
            let object = {
                orario : orarioSelezionato
            }
            dispatch(aggiornaIstruttori(object, id));
        }else if(sport !== undefined && orarioSelezionato === undefined){
            let object = {
                sport: sport
            }
            dispatch(aggiornaIstruttori(object, id))
        }
    }
    const onOrarioSelezione = (orarioSelezionato: OrarioPrenotazione) => {
        if(orari.filter(orario => orario.id === orarioSelezionato.id).length === 0){
            orari.push(orarioSelezionato)
        }else{
            orari.filter(orario => orario.id === orarioSelezionato.id)[0].dataPrenotazione = orarioSelezionato.dataPrenotazione
            orari.filter(orario => orario.id === orarioSelezionato.id)[0].oraInizio = orarioSelezionato.oraInizio
            orari.filter(orario => orario.id === orarioSelezionato.id)[0].oraFine = orarioSelezionato.oraFine
        }
        setValue("orariSelezionati", orari);
        aggiornaListeImpianti(orarioSelezionato.id, getValues("sportSelezionato"), orarioSelezionato)
        aggiornaListeIstruttori(orarioSelezionato.id, getValues("sportSelezionato"), orarioSelezionato)
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
                <select
                    className="form-control"
                    name="numeroDate"
                    id="numeroDate"
                    onClick={(value) => {
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
                <DataOraImpiantoIstruttoreSelezione impianti={impiantiDisponibili.arrayListeImpianti}
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