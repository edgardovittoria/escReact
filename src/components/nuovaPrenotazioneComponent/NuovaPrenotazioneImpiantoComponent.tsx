import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSportivo, sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { FormPrenotazioneImpianto } from './FormPrenotazioneImpiantoComponent';
import { Card, CardBody, CardImg, CardText, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { avviaNuovaPrenotazione } from '../../store/prenotazioneSlice';
import { Sportivo } from '../../model/Sportivo';
import { resetListaImpiantiDisponibili } from '../../store/impiantoSlice';
import { resetListaInvitabili } from '../../store/sportivoSlice';
import { resetListaSportPraticabili } from '../../store/SportSlice';





export const NuovaPrenotazioneImpianto: React.FC = () => {

    const dispatch = useDispatch()
    // var sportivoRecuperato: Sportivo = JSON.parse(localStorage.getItem("sportivoAutenticato")!);

    // dispatch(setSportivo(sportivoRecuperato))
    dispatch(resetListaImpiantiDisponibili())
    dispatch(resetListaInvitabili())
    dispatch(resetListaSportPraticabili())

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);

    dispatch(avviaNuovaPrenotazione(sportivoAutenticato.sportivo.email, "IMPIANTO"))

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <Card className="col-4">
                            <CardImg
                                src="/assets/img/avatarProfilo.png"
                                alt="Avatar Sportivo" />
                            <CardBody>
                                <CardTitle>
                                    {sportivoAutenticato.sportivo.nome} {sportivoAutenticato.sportivo.cognome}
                                </CardTitle>
                                <CardText>
                                    Eventuali info dello Sportivo...
                                    </CardText>
                            </CardBody>
                            <ListGroup>
                                <ListGroupItem>
                                    {sportivoAutenticato.sportivo.email}
                                </ListGroupItem>
                            </ListGroup>
                            <CardBody>
                                <NavLink to="/profiloSportivo">Profilo</NavLink>
                            </CardBody>
                        </Card>
                        <div className="col-8">
                            <div><FormPrenotazioneImpianto /></div>
                        </div>
                    </div>
                </div>
            </section>



        </>
    )

}

