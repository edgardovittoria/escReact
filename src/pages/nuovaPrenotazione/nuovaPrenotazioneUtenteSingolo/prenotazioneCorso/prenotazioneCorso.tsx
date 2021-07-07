/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../../../store/sportivoAutenticatoSlice';
import { avviaNuovaPrenotazione, corsiDisponibiliSelector } from '../../../../store/prenotazioneSlice';
import { RiepilogoUtente } from '../../../../components/riepilogoProfilo/RiepilogoUtente';
import { Label } from 'reactstrap';
import { CorsiDisponibili } from './components/CorsiDisponibili';

export const PrenotazioneCorso: React.FC = () => {

    const dispatch = useDispatch()

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);
    
    useEffect(() => {
        dispatch(avviaNuovaPrenotazione(sportivoAutenticato.sportivo.email, -1, "CORSO", "SINGOLO_UTENTE"))
    }, [])


    const corsiDisponibili = useSelector(corsiDisponibiliSelector);
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                    <RiepilogoUtente nome={sportivoAutenticato.sportivo.nome}
                            cognome={sportivoAutenticato.sportivo.cognome}
                            email={sportivoAutenticato.sportivo.email}
                            ruoli={sportivoAutenticato.sportivo.ruoli}
                            attributiExtra={sportivoAutenticato.sportivo.attributiExtra}/>
                        <div className="col-8">
                            <Label>PRENOTAZIONE CORSO</Label>
                            <CorsiDisponibili corsiDisponibili={corsiDisponibili}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}