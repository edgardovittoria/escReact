import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { DataOraSelezione } from './DataOraSelezioneComponent';
import { Card, CardBody, CardImg, CardText, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { avviaNuovaPrenotazione } from '../../store/prenotazioneSlice';





export const NuovaPrenotazioneImpianto: React.FC = () => {


    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);

    const dispatch = useDispatch();

    dispatch(avviaNuovaPrenotazione(sportivoAutenticato.sportivo.email, "IMPIANTO"))

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <Card className="col-4">
                            <CardImg 
                                src="/assets/img/avatarProfilo.png"
                                alt="Avatar Sportivo"/>
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
                            <div><DataOraSelezione /></div>
                        </div>
                    </div>
                </div>
            </section>



        </>
    )

}

