import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { FormPrenotazioneImpianto } from './FormPrenotazioneImpiantoComponent';
import { Card, CardBody, CardImg, CardText, CardTitle, ListGroup, ListGroupItem, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { NavLink as NavLinkRouter } from 'react-router-dom';
import { avviaNuovaPrenotazione } from '../../store/prenotazioneSlice';
import { resetListaImpiantiDisponibili } from '../../store/impiantoSlice';
import { resetListaInvitabili } from '../../store/sportivoSlice';
import { resetListaSportPraticabili } from '../../store/SportSlice';
import classnames from 'classnames';
import { FormPrenotazioneImpiantoRicorrente } from './FormPrenotazioneImpiantoRicorrenteComponent';





export const NuovaPrenotazioneImpianto: React.FC = () => {

    const dispatch = useDispatch()
    // var sportivoRecuperato: Sportivo = JSON.parse(localStorage.getItem("sportivoAutenticato")!);

    // dispatch(setSportivo(sportivoRecuperato))
    //dispatch(resetListaImpiantiDisponibili())
    dispatch(resetListaInvitabili())
    dispatch(resetListaSportPraticabili())

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);

    dispatch(avviaNuovaPrenotazione(sportivoAutenticato.sportivo.email, "IMPIANTO"))

    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab: string) => {
        if (activeTab !== tab) setActiveTab(tab);
    }

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
                                <NavLinkRouter to="/profiloSportivo">Profilo</NavLinkRouter>
                            </CardBody>
                        </Card>
                        <div className="col-8">
                            <div>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' })}
                                            onClick={() => { toggle('1'); }}
                                        >
                                            PRENOTAZIONE SINGOLA
          </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '2' })}
                                            onClick={() => { toggle('2'); }}
                                        >
                                            PRENOTAZIONE RICORRENTE
          </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <FormPrenotazioneImpianto />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <FormPrenotazioneImpiantoRicorrente />
                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>
    )

}

