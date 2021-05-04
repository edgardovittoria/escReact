import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { impiantoSelector } from '../../store/impiantoSlice';
import { aggiornaImpiantiRicorrente } from '../../store/prenotazioneSlice';
import { sportSelector } from '../../store/SportSlice';
import { DataOraImpiantoRicorrente, ImpiantiSelezionatiItem } from '../formComponents/DataOraImpiantoRicorrenteComponent';
import { OrarioPrenotazione } from '../formComponents/DataOraSelezioneComponent';
import { PostiLiberi } from '../formComponents/PostiLiberiComponent';
import { SelezioneSport } from '../formComponents/SelezioneSportComponent';

export type FormPrenotaImpiantoRicorrente = {
    sportSelezionato: string,
    orariSelezionati: OrarioPrenotazione[]
    impianti: ImpiantiSelezionatiItem[],
    sportiviInvitati: string[],
    postiLiberi: number,
    numeroGiocatoriNonIscritti: number
}

export const FormPrenotazioneImpiantoRicorrente: React.FC = () => {
    
    const { getValues, setValue, handleSubmit, formState: { errors } } = useForm<FormPrenotaImpiantoRicorrente>();

    const dispatch = useDispatch();
    const [numeroDate, setNumeroDate] = useState(0);
    const [postiLiberi, setPostiliberi] = useState(0);
    const [postiLiberiAggiornato, setPostiliberiAggiornati] = useState(postiLiberi);
    const sportPraticabili = useSelector(sportSelector);
    const impiantiDisponibili = useSelector(impiantoSelector);
    function onSportSelezionato(sportSelezionato: string) {
        setValue("sportSelezionato", sportSelezionato)
        setPostiliberiAggiornati(sportPraticabili.sports.filter((sport) => sport.nome === sportSelezionato)[0].postiLiberi)
        setPostiliberi(sportPraticabili.sports.filter((sport) => sport.nome === sportSelezionato)[0].postiLiberi)

    }

    const aggiornaListeImpianti = (id: number, sport: string, orarioSelezionato: OrarioPrenotazione) => {
        if(sport !== undefined){
            let object = {
                sport: sport,
                orario: orarioSelezionato
            }
            dispatch(aggiornaImpiantiRicorrente(object, id));
        }
        
    }
    
    let orari: OrarioPrenotazione[] = [];
    const onOrarioSelezione = (orarioSelezionato: OrarioPrenotazione) => {
        orari.push(orarioSelezionato);
        setValue("orariSelezionati", orari);
        aggiornaListeImpianti(orarioSelezionato.id, getValues("sportSelezionato"), orarioSelezionato)
    }

    let impiantiSelezionati: ImpiantiSelezionatiItem[] = [];
    const onImpiantoSelezioneRicorrente = (impiantoItem: ImpiantiSelezionatiItem) => {
        if(impiantiSelezionati.filter(item => item.idSelezione === impiantoItem.idSelezione).length === 0){
            impiantiSelezionati.push(impiantoItem)
        }else{
            impiantiSelezionati.filter(item => item.idSelezione === impiantoItem.idSelezione)[0].idImpianto = impiantoItem.idImpianto
        }
        setValue("impianti", impiantiSelezionati)
        console.log(impiantiSelezionati)
    }
    

    return (
        <Form>
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
                        <Col id="postiLiberiContenitore">Posti Liberi: <PostiLiberi postiLiberiAggiornati={postiLiberiAggiornato} /></Col>
                    </Row>
                </FormGroup>
            <FormGroup className="border border-dark rounded" style={{ textAlign: 'left' }}>
                     <DataOraImpiantoRicorrente impianti={impiantiDisponibili.arrayListeImpianti}
                        handleSelezioneDataOra={onOrarioSelezione}
                        handleSelezioneImpianto={onImpiantoSelezioneRicorrente}
                        numeroDate={numeroDate} />
            </FormGroup>
        </Form>
    )
}