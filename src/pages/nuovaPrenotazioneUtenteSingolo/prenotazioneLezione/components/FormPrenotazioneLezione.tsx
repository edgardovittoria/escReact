import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { formPrenotaImpiantoSelector } from '../../../../store/formPrenotaImpiantoSlice';
import { istruttoreSelector } from '../../../../store/IstruttoreSlice';
import { aggiornaImpiantiEInvitabili, aggiornaIstruttori, riepilogoPrenotazione } from '../../../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../../../store/sportivoAutenticatoSlice';
import { sportSelector } from '../../../../store/SportSlice';
import { DataOraImpiantoIstruttoreSelezione, IstruttoriSelezionatiItem } from '../../../../components/formComponents/DataOraImpiantoIstruttoreSelezione';
import { ImpiantiSelezionatiItem } from '../../../../components/formComponents/DataOraImpiantoRicorrente';
import { OrarioPrenotazione } from '../../../../components/formComponents/DataOraSelezione';
import { SelezioneSport } from '../../../../components/formComponents/SelezioneSport';

export type FormPrenotaLezione = {
    sportSelezionato: string,
    orariSelezionati: OrarioPrenotazione[],
    impianti: ImpiantiSelezionatiItem[],
    istruttori: IstruttoriSelezionatiItem[],
    tipoPrenotazione: string
    modalitaPrenotazione: string
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
    //const impiantiDisponibili = useSelector(impiantoSelector);
    const formPrenotaLezione = useSelector(formPrenotaImpiantoSelector);
    const istruttoriDisponibili = useSelector(istruttoreSelector);
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);

    function onSportSelezionato(sportSelezionato: string) {
        setValue("sportSelezionato", sportSelezionato)
        setValue("tipoPrenotazione", "LEZIONE");
        setValue("modalitaPrenotazione", "SINGOLO_UTENTE")
        for(let i=1; i<numeroDate+1; i++){
            aggiornaListeImpianti(i, sportSelezionato, getValues("orariSelezionati")[i])
            aggiornaListeIstruttori(i, sportSelezionato, getValues("orariSelezionati")[i])
        }
    }

    const onSubmit = handleSubmit((form: FormPrenotaLezione) => {
        dispatch(riepilogoPrenotazione(form, sportivoAutenticato.jwt))
        history.push("/riepilogoPrenotazioneLezione");
    })

    const aggiornaListeImpianti = (id: number, sport: string, orarioSelezionato: OrarioPrenotazione) => {
        if (sport !== undefined && orarioSelezionato !== undefined) {
            let object = {
                sport: sport,
                orario: orarioSelezionato
            }
            dispatch(aggiornaImpiantiEInvitabili(object, id, sportivoAutenticato.jwt));
        }else if (sport === undefined && orarioSelezionato !== undefined){
            let object = {
                orario : orarioSelezionato
            }
            dispatch(aggiornaImpiantiEInvitabili(object, id, sportivoAutenticato.jwt));
        }else if(sport !== undefined && orarioSelezionato === undefined){
            let object = {
                sport: sport
            }
            dispatch(aggiornaImpiantiEInvitabili(object, id, sportivoAutenticato.jwt))
        }

    }

    const aggiornaListeIstruttori = (id: number, sport: string, orarioSelezionato: OrarioPrenotazione) => {
        if (sport !== undefined && orarioSelezionato !== undefined) {
            let object = {
                sport: sport,
                orario: orarioSelezionato
            }
            dispatch(aggiornaIstruttori(object, id, sportivoAutenticato.jwt));
        }else if (sport === undefined && orarioSelezionato !== undefined){
            let object = {
                orario : orarioSelezionato
            }
            dispatch(aggiornaIstruttori(object, id, sportivoAutenticato.jwt));
        }else if(sport !== undefined && orarioSelezionato === undefined){
            let object = {
                sport: sport
            }
            dispatch(aggiornaIstruttori(object, id, sportivoAutenticato.jwt))
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
                <p style={{marginTop: "10px"}}>Selezionare il numero di date da prenotare</p>
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
                <DataOraImpiantoIstruttoreSelezione impianti={formPrenotaLezione.arrayListeImpianti}
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