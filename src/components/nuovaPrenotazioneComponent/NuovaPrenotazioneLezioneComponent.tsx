import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { Card, CardBody, CardImg, CardText, CardTitle, ListGroup, ListGroupItem, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { NavLink as NavLinkRouter } from 'react-router-dom';
import { avviaNuovaPrenotazione } from '../../store/prenotazioneSlice';
import { resetListaInvitabili } from '../../store/sportivoSlice';
import { resetListaSportPraticabili } from '../../store/SportSlice';
import { FormPrenotazioneLezione } from './FormPrenotazioneLezioneComponent';





export const NuovaPrenotazioneLezione: React.FC = () => {

    const dispatch = useDispatch()
    // var sportivoRecuperato: Sportivo = JSON.parse(localStorage.getItem("sportivoAutenticato")!);

    // dispatch(setSportivo(sportivoRecuperato))
    //dispatch(resetListaImpiantiDisponibili())
    dispatch(resetListaInvitabili())
    dispatch(resetListaSportPraticabili())

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);

    dispatch(avviaNuovaPrenotazione(sportivoAutenticato.sportivo.email, "LEZIONE"))

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <Card className="col-4" style={{height: "min-content"}}>
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
                                <NavLinkRouter to="/profiloSportivo">Profilo</NavLinkRouter>
                            </CardBody>
                        </Card>
                        <div className="col-8">
                            <FormPrenotazioneLezione />
                            
                        </div>
                    </div>
                </div>
            </section>



        </>
    )

}

