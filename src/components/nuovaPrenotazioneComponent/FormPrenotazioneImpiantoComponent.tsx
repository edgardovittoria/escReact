import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { resetListaSportPraticabili, sportSelector } from '../../store/SportSlice';
import { impiantoSelector, resetListaImpiantiDisponibili } from '../../store/impiantoSlice';
import { resetListaInvitabili, sportivoSelector } from '../../store/sportivoSlice';
import { aggiornaImpianti, riepilogoPrenotazione } from '../../store/prenotazioneSlice';
import { useHistory } from 'react-router';
import { SelezioneSport } from '../formComponents/SelezioneSportComponent';
import { DataOraSelezione, OrarioPrenotazione } from '../formComponents/DataOraSelezioneComponent';
import { ImpiantoSelezione } from '../formComponents/ImpiantoSelezioneComponet';
import { SportiviInvitabiliSelezione } from '../formComponents/SportiviInvitabiliSelezioneComponent';
import { PostiLiberi } from '../formComponents/PostiLiberiComponent';
import { GiocatoriNonIscritti } from '../formComponents/GiocatoriNonIscrittiSelezioneComponent';


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

    const { getValues, setValue, handleSubmit/*, formState: { errors }*/ } = useForm<FormPrenotaImpianto>();


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

    })

    function onSportSelezionato(sportSelezionato: string) {
        setValue("sportSelezionato", sportSelezionato)
        setPostiliberiAggiornati(sportPraticabili.sports.filter((sport) => sport.nome === sportSelezionato)[0].postiLiberi)
        setPostiliberi(sportPraticabili.sports.filter((sport) => sport.nome === sportSelezionato)[0].postiLiberi)

    }



    function onOrarioSelezione(orarioSelezionato: OrarioPrenotazione) {
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
                        <Col id="postiLiberiContenitore">Posti Liberi: <PostiLiberi postiLiberiAggiornati={postiLiberiAggiornato} /></Col>
                    </Row>
                </FormGroup>
                <FormGroup className="border border-dark rounded" style={{ textAlign: 'left' }}>
                    <DataOraSelezione handleSelezioneOrario={onOrarioSelezione}
                        chiave={1} />
                </FormGroup>
                <FormGroup>
                    <Label style={{ marginLeft: '5px' }}>Seleziona Impianto</Label>
                    <Row style={{ marginLeft: '1px' }}>
                        <Col>
                            <ImpiantoSelezione impianti={impiantiDisponibili.impianti}
                                handleSelezioneImpianto={onImpiantoSelezione}
                                chiave={1} />
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
                            <GiocatoriNonIscritti postiLiberi={postiLiberi}
                                handleGiocatoriNonIscrittiSelezione={onGiocatoriNonIscrittiSelezione} />
                        </Col>
                    </Row>
                </FormGroup>
                <Button type="submit" outline size="lg" block color="success">Procedi</Button>
            </Form>

        </>
    )
}