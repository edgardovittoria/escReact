/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';
import '../css/profiloSportivo.css';
import { RiepilogoUtente } from '../../../components/riepilogoProfilo/RiepilogoUtente';
import {Calendario} from "../../../components/calendario/Calendario";
import {useFetchDatiUtente} from "../hooks/useFetchDatiUtente";


export const ProfiloIstruttore: React.FC = () => {

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);
    const fetchDatiUtente = useFetchDatiUtente();

    useEffect(() => {
        fetchDatiUtente()
    }, [])


    return (
        <>

            <section>
                <div className="container">
                    <div className="row justify-content-center">

                        <RiepilogoUtente nome={sportivoAutenticato.sportivo.nome}
                                         cognome={sportivoAutenticato.sportivo.cognome}
                                         email={sportivoAutenticato.sportivo.email}
                                         ruoli={sportivoAutenticato.sportivo.ruoli}
                                         attributiExtra={sportivoAutenticato.sportivo.attributiExtra} />

                        <div className="col-8">
                            <div id="riepilogoPrenotazioni" style={{ margin: "auto", width: "100%" }}>
                                <Calendario appuntamenti={sportivoAutenticato.sportivo.attributiExtra.appuntamentiLezioni} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

