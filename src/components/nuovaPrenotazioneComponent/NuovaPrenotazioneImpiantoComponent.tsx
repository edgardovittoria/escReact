import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoSelector } from '../../store/sportivoAutenticatoSlice';
import { useHistory } from 'react-router';
import { DataOraSelezione } from './DataOraSelezioneComponent';
import { fetchSportPraticabili } from '../../store/SportSlice';
import { fetchImpiantiDisponibili } from '../../store/impiantoSlice';
import { fetchSportiviInvitabili } from '../../store/sportivoSlice';





export const NuovaPrenotazioneImpianto: React.FC = () => {


    const sportvoAutenticato = useSelector(sportivoSelector);

    const history = useHistory()

    const dispatch = useDispatch();

    dispatch(fetchSportPraticabili());
    dispatch(fetchImpiantiDisponibili());
    dispatch(fetchSportiviInvitabili());

    return (
        <>            
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="card col-4">
                                <img
                                    className="card-img-top"
                                    src="/assets/img/avatarProfilo.png"
                                    alt="Avatar Sportivo"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <div>
                                            Sportivo prenotante
              </div>
                                    </h5>
                                    <p className="card-text">Eventuali info dello sportivo....</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div></div>
                                    </li>
                                </ul>
                                <div className="card-body">
                                    <a className="card-link">Profilo</a>
                                </div>
                            </div>
                            <div className="col-8">
                                <div><DataOraSelezione /></div>
                            </div>
                        </div>
                    </div>
                </section>



        </>
    )

}

