import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import { formPrenotaImpiantoSelector } from "../../../store/formPrenotaImpiantoSlice";
import { istruttoreSelector } from "../../../store/IstruttoreSlice";
import { aggiornaImpiantiRicorrente, aggiornaIstruttori, riepilogoPrenotazione } from "../../../store/prenotazioneSlice";
import { sportivoAutenticatoSelector } from "../../../store/sportivoAutenticatoSlice";
import { utentePolisportivaSelector } from "../../../store/utentePolisportivaSlice";
import { sportSelector } from "../../../store/SportSlice";
import { DataOraImpiantoIstruttoreSelezione, IstruttoriSelezionatiItem } from "../formComponents/DataOraImpiantoIstruttoreSelezioneComponent";
import { ImpiantiSelezionatiItem } from "../formComponents/DataOraImpiantoRicorrenteComponent";
import { OrarioPrenotazione } from "../formComponents/DataOraSelezioneComponent";
import { SelezioneSport } from "../formComponents/SelezioneSportComponent";
import { SportiviInvitabiliSelezione } from "../formComponents/SportiviInvitabiliSelezioneComponent";
import { FormPrenotaLezione } from "../prenotazioneLezione/FormPrenotazioneLezioneComponent";

export type FormCorso = {
    numeroMinimoPartecipanti: number
    numeroMassimoPartecipanti: number
    costoPerPartecipante: number
    invitatiCorso: string[]
    tipoPrenotazione: string
    formLezione: FormPrenotaLezione
}

let orari: OrarioPrenotazione[] = [];
let impiantiSelezionati: ImpiantiSelezionatiItem[] = [];
let istruttoriSelezionati: IstruttoriSelezionatiItem[] = [];

export const FormCreazioneCorso: React.FC = () => {

    const { handleSubmit, getValues, setValue } = useForm<FormCorso>();

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);


    const onSubmit = handleSubmit((form: FormCorso) => {
        dispatch(riepilogoPrenotazione(form, sportivoAutenticato.jwt))
        history.push("/riepilogoCreazioneCorso");
    })

    const dispatch = useDispatch();
    const history = useHistory();
    const [numeroDate, setNumeroDate] = useState(0);
    const sportPraticabili = useSelector(sportSelector);
    //const impiantiDisponibili = useSelector(impiantoSelector);
    const formPrenotaLezione = useSelector(formPrenotaImpiantoSelector);
    const istruttoriDisponibili = useSelector(istruttoreSelector);

    function onSportSelezionato(sportSelezionato: string) {
        setValue("formLezione.sportSelezionato", sportSelezionato)
        setValue("formLezione.tipoPrenotazione", "LEZIONE");
        setValue("tipoPrenotazione", "CORSO")
        for(let i=1; i<numeroDate+1; i++){
            aggiornaListeImpianti(i, sportSelezionato, getValues("formLezione.orariSelezionati")[i])
            aggiornaListeIstruttori(i, sportSelezionato, getValues("formLezione.orariSelezionati")[i])
        }
    }

    const aggiornaListeImpianti = (id: number, sport: string, orarioSelezionato: OrarioPrenotazione) => {
        if (sport !== undefined && orarioSelezionato !== undefined) {
            let object = {
                sport: sport,
                orario: orarioSelezionato
            }
            dispatch(aggiornaImpiantiRicorrente(object, id, sportivoAutenticato.jwt));
        }else if (sport === undefined && orarioSelezionato !== undefined){
            let object = {
                orario : orarioSelezionato
            }
            dispatch(aggiornaImpiantiRicorrente(object, id, sportivoAutenticato.jwt));
        }else if(sport !== undefined && orarioSelezionato === undefined){
            let object = {
                sport: sport
            }
            dispatch(aggiornaImpiantiRicorrente(object, id, sportivoAutenticato.jwt))
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
        setValue("formLezione.orariSelezionati", orari);
        aggiornaListeImpianti(orarioSelezionato.id, getValues("formLezione.sportSelezionato"), orarioSelezionato)
        aggiornaListeIstruttori(orarioSelezionato.id, getValues("formLezione.sportSelezionato"), orarioSelezionato)
    }

    const onImpiantoSelezioneRicorrente = (impiantoItem: ImpiantiSelezionatiItem) => {
        if (impiantiSelezionati.filter(item => item.idSelezione === impiantoItem.idSelezione).length === 0) {
            impiantiSelezionati.push(impiantoItem)
        } else {
            impiantiSelezionati.filter(item => item.idSelezione === impiantoItem.idSelezione)[0].idImpianto = impiantoItem.idImpianto
        }
        setValue("formLezione.impianti", impiantiSelezionati)
    }
    const onIstruttoreSelezioneRicorrente = (istruttoreItem: IstruttoriSelezionatiItem) => {
        if (istruttoriSelezionati.filter(item => item.idSelezione === istruttoreItem.idSelezione).length === 0) {
            istruttoriSelezionati.push(istruttoreItem)
        } else {
            istruttoriSelezionati.filter(item => item.idSelezione === istruttoreItem.idSelezione)[0].istruttore = istruttoreItem.istruttore
        }
        setValue("formLezione.istruttori", istruttoriSelezionati)
    }

    const sportiviInvitabili = useSelector(utentePolisportivaSelector);
    const onSportiviInvitabiliSelezione = (emailSportivi: string[]) => {
        setValue("invitatiCorso", emailSportivi)
    }


    return (
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label style={{ marginLeft: '5px' }}>Seleziona il numero minimo di partecipanti</Label>
                <select
                    className="form-control"
                    name="numeroMinimoPartecipanti"
                    id="numeroMinimoPartecipanti"
                    onClick={(value) => {
                        setValue("numeroMinimoPartecipanti", Number.parseInt(value.currentTarget.value))
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
                        setValue("numeroMassimoPartecipanti", Number.parseInt(value.currentTarget.value))
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
                        setValue("costoPerPartecipante", Number.parseInt(target.currentTarget.value))
                    }}></input>
            </FormGroup>
            <FormGroup>
            <Label style={{ marginLeft: '5px' }}>Seleziona il numero di date del corso</Label>
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
