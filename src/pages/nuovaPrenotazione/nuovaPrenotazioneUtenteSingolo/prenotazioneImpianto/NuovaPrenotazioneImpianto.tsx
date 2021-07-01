/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../../../store/sportivoAutenticatoSlice';
import { avviaNuovaPrenotazione } from '../../../../store/prenotazioneSlice';
import { resetListaInvitabili } from '../../../../store/utentePolisportivaSlice';
import { resetListaSportPraticabili } from '../../../../store/SportSlice';
import { RiepilogoUtente } from '../../../../components/riepilogoProfilo/RiepilogoUtente';
import { Label } from 'reactstrap';
import { TabNuovaPrenotazione } from './components/TabNuovaPrenotazione';

export const NuovaPrenotazioneImpianto: React.FC = () => {

    const dispatch = useDispatch()
    
    

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);

    useEffect(() => {
        dispatch(resetListaInvitabili())
        dispatch(resetListaSportPraticabili())
        dispatch(avviaNuovaPrenotazione(sportivoAutenticato.sportivo.email, -1, "IMPIANTO", "SINGOLO_UTENTE"))
    }, [])

    


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
                            <Label>PRENOTAZIONE IMPIANTO</Label>
                            <TabNuovaPrenotazione/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}