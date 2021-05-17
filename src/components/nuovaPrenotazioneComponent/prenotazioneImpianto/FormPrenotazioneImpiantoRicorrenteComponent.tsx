import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { formPrenotaImpiantoSelector } from '../../../store/formPrenotaImpiantoSlice';
import { aggiornaImpiantiRicorrente, riepilogoPrenotazione } from '../../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';
import { sportivoSelector } from '../../../store/sportivoSlice';
import { sportSelector } from '../../../store/SportSlice';
import { CheckBoxPendingSelezionatoItem, DataOraImpiantoRicorrente, ImpiantiSelezionatiItem } from '../formComponents/DataOraImpiantoRicorrenteComponent';
import { OrarioPrenotazione } from '../formComponents/DataOraSelezioneComponent';
import { GiocatoriNonIscritti } from '../formComponents/GiocatoriNonIscrittiSelezioneComponent';
import { PostiLiberi } from '../formComponents/PostiLiberiComponent';
import { SelezioneSport } from '../formComponents/SelezioneSportComponent';
import { SportiviInvitabiliSelezione } from '../formComponents/SportiviInvitabiliSelezioneComponent';

export type FormPrenotaImpianto = {
    sportSelezionato: string,
    orariSelezionati: OrarioPrenotazione[]
    impianti: ImpiantiSelezionatiItem[],
    sportiviInvitati: string[],
    postiLiberi: number,
    numeroGiocatoriNonIscritti: number,
    tipoPrenotazione: string,
    checkboxesPending: CheckBoxPendingSelezionatoItem[]
}

let orari: OrarioPrenotazione[] = [];
let impiantiSelezionati: ImpiantiSelezionatiItem[] = [];
let checkboxes: CheckBoxPendingSelezionatoItem[] = [];

export const FormPrenotazioneImpiantoRicorrente: React.FC = () => {

    const { register, getValues, setValue, handleSubmit, formState: { errors } } = useForm<FormPrenotaImpianto>();

    const dispatch = useDispatch();
    const history = useHistory();
    const [numeroDate, setNumeroDate] = useState(0);
    const [postiLiberi, setPostiliberi] = useState(0);
    const [postiLiberiAggiornato, setPostiliberiAggiornati] = useState(postiLiberi);
    const sportPraticabili = useSelector(sportSelector);
    const sportiviInvitabili = useSelector(sportivoSelector);
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);
    // const impiantiDisponibili = useSelector(impiantoSelector);
    const opzioni = useSelector(formPrenotaImpiantoSelector);
    function onSportSelezionato(sportSelezionato: string) {
        setValue("sportSelezionato", sportSelezionato)
        setValue("tipoPrenotazione", "IMPIANTO")
        for(let i=1; i<numeroDate+1; i++){
            aggiornaListeImpianti(i, sportSelezionato, getValues("orariSelezionati")[i])
        }
        setPostiliberiAggiornati(sportPraticabili.sports.filter((sport) => sport.nome === sportSelezionato)[0].postiLiberi)
        setPostiliberi(sportPraticabili.sports.filter((sport) => sport.nome === sportSelezionato)[0].postiLiberi)

    }

    const onSubmit = handleSubmit((form: FormPrenotaImpianto) => {
        dispatch(riepilogoPrenotazione(form, sportivoAutenticato.jwt))
        history.push("/riepilogoPrenotazione");
    })

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
    }

    const onImpiantoSelezioneRicorrente = (impiantoItem: ImpiantiSelezionatiItem) => {
        if (impiantiSelezionati.filter(item => item.idSelezione === impiantoItem.idSelezione).length === 0) {
            impiantiSelezionati.push(impiantoItem)
        } else {
            impiantiSelezionati.filter(item => item.idSelezione === impiantoItem.idSelezione)[0].idImpianto = impiantoItem.idImpianto
        }
        setValue("impianti", impiantiSelezionati)
    }

    const onCheckBoxPendingSelezioneRicorrente = (checkBoxPendingItem: CheckBoxPendingSelezionatoItem) => {
        if(checkboxes.filter(item => item.idSelezione === checkBoxPendingItem.idSelezione).length === 0){
            checkboxes.push(checkBoxPendingItem)
        }else{
            checkboxes.filter(item => item.idSelezione === checkBoxPendingItem.idSelezione)[0].pending = checkBoxPendingItem.pending
        }
        setValue("checkboxesPending", checkboxes)
        console.log(getValues("checkboxesPending"))
    }

    const onSportiviInvitabiliSelezione = (emailSportivi: string[]) => {
        setValue("sportiviInvitati", emailSportivi)
    }

    const onGiocatoriNonIscrittiSelezione = (giocatoriNonIscritti: number) => {
        setPostiliberiAggiornati(postiLiberi - giocatoriNonIscritti)
        setValue("postiLiberi", postiLiberi - giocatoriNonIscritti)
        setValue("numeroGiocatoriNonIscritti", giocatoriNonIscritti)
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
                    handleSelezioneImpianto={onImpiantoSelezioneRicorrente}
                    handleSelezioneCheckBoxPending={onCheckBoxPendingSelezioneRicorrente}
                    numeroDate={numeroDate}
                    {...register("impianti",  {required: true})} 
                    {...register("orariSelezionati", {required: true})}/>
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