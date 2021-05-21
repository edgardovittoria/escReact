import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';
import { avviaNuovaPrenotazione } from '../../../store/prenotazioneSlice';
import { resetListaInvitabili } from '../../../store/sportivoSlice';
import { resetListaSportPraticabili } from '../../../store/SportSlice';
import { RiepilogoUtente } from '../../profiloSportivoComponent/RiepilogoUtenteComponent';
import { Label } from 'reactstrap';
import { TabComponent } from '../../tabComponent/TabComponent';

export const NuovaPrenotazioneImpianto: React.FC = () => {

    const dispatch = useDispatch()
    
    

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);

    useEffect(() => {
        dispatch(resetListaInvitabili())
        dispatch(resetListaSportPraticabili())
        dispatch(avviaNuovaPrenotazione(sportivoAutenticato.sportivo.email, "IMPIANTO", sportivoAutenticato.jwt))
    }, [])

    


    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                    <RiepilogoUtente nome={sportivoAutenticato.sportivo.nome}
                            cognome={sportivoAutenticato.sportivo.cognome}
                            email={sportivoAutenticato.sportivo.email}
                            sportPraticati={sportivoAutenticato.sportivo.sportPraticati}/>
                        <div className="col-8">
                            <Label>PRENOTAZIONE IMPIANTO</Label>
                            <TabComponent/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}