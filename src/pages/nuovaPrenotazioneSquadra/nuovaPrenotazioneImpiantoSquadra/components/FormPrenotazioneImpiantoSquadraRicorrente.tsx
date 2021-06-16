import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { formPrenotaImpiantoSelector } from '../../../../store/formPrenotaImpiantoSlice';
import { aggiornaImpiantiEInvitabili, riepilogoPrenotazione } from '../../../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../../../store/sportivoAutenticatoSlice';
import { squadraSelector } from '../../../../store/squadraSlice';
import { CheckBoxPendingSelezionatoItem, DataOraImpiantoRicorrente, ImpiantiSelezionatiItem } from '../../../../components/formComponents/DataOraImpiantoRicorrente';
import { OrarioPrenotazione } from '../../../../components/formComponents/DataOraSelezione';
import { SquadreInvitabiliSelezione } from '../../../../components/formComponents/SquadreInvitabiliSelezione';

export type FormPrenotaImpiantoSquadra = {
    sportSelezionato: string,
    orariSelezionati: OrarioPrenotazione[]
    impianti: ImpiantiSelezionatiItem[],
    squadreInvitate: number[],
    tipoPrenotazione: string,
    checkboxesPending: CheckBoxPendingSelezionatoItem[]
    modalitaPrenotazione: string
}

let orari: OrarioPrenotazione[] = [];
let impiantiSelezionati: ImpiantiSelezionatiItem[] = [];
let checkboxes: CheckBoxPendingSelezionatoItem[] = [];

export interface FormPrenotazioneImpiantoSquadraRicorrenteProps {
    sport: string
}

export const FormPrenotazioneImpiantoSquadraRicorrente: React.FC<FormPrenotazioneImpiantoSquadraRicorrenteProps> = ({sport}) => {

    const { register, getValues, setValue, handleSubmit, formState: { errors } } = useForm<FormPrenotaImpiantoSquadra>();

    const dispatch = useDispatch();
    const [numeroDate, setNumeroDate] = useState(0);
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);
    const squadreInvitabili = useSelector(squadraSelector).squadreInvitabili
    const opzioni = useSelector(formPrenotaImpiantoSelector);
    const history = useHistory()

    useEffect(() => {
        setValue("sportSelezionato", sport)
        setValue("tipoPrenotazione", "IMPIANTO_SQUADRA")
        setValue("modalitaPrenotazione", "SQUADRA")
    }, [setValue, sport]);



    const onSubmit = handleSubmit((form: FormPrenotaImpiantoSquadra) => {
        dispatch(riepilogoPrenotazione(form, sportivoAutenticato.jwt))
        history.push("/riepilogoPrenotazione");
        //  console.log(form)
    })

    const aggiornaListeImpianti = (id: number, sport: string, orarioSelezionato: OrarioPrenotazione, modalitaPrenotazione: string) => {
        if (sport !== undefined && orarioSelezionato !== undefined) {
            let object = {
                sport: sport,
                orario: orarioSelezionato,
                modalitaPrenotazione: modalitaPrenotazione
            }
            dispatch(aggiornaImpiantiEInvitabili(object, id, sportivoAutenticato.jwt));
        }else if (sport === undefined && orarioSelezionato !== undefined){
            let object = {
                orario : orarioSelezionato,
                modalitaPrenotazione: modalitaPrenotazione
            }
            dispatch(aggiornaImpiantiEInvitabili(object, id, sportivoAutenticato.jwt));
        }else if(sport !== undefined && orarioSelezionato === undefined){
            let object = {
                sport: sport,
                modalitaPrenotazione: modalitaPrenotazione
            }
            dispatch(aggiornaImpiantiEInvitabili(object, id, sportivoAutenticato.jwt))
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
        aggiornaListeImpianti(orarioSelezionato.id, getValues("sportSelezionato"), orarioSelezionato, getValues("modalitaPrenotazione"))
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
    }

    const onSquadreInvitabiliSelezione = (listaSquadre: number[]) => {
        setValue("squadreInvitate", listaSquadre)
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
                <DataOraImpiantoRicorrente impianti={opzioni.arrayListeImpianti}
                    handleSelezioneDataOra={onOrarioSelezione}
                    handleSelezioneImpianto={onImpiantoSelezioneRicorrente}
                    handleSelezioneCheckBoxPending={onCheckBoxPendingSelezioneRicorrente}
                    numeroDate={numeroDate}
                    {...register("impianti",  {required: true})} 
                    {...register("orariSelezionati", {required: true})}/>
            </FormGroup>
            <FormGroup>
                <Label>Invita squadre alla prenotazione</Label>
                <Row>
                    <Col>
                        <SquadreInvitabiliSelezione squadreInvitabili={squadreInvitabili}
                        handleSelezioneSquadra={onSquadreInvitabiliSelezione}/>
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