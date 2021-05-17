import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';
import { avviaNuovaPrenotazione } from '../../../store/prenotazioneSlice';
import { resetListaInvitabili } from '../../../store/sportivoSlice';
import { resetListaSportPraticabili } from '../../../store/SportSlice';
import { RiepilogoUtente } from '../../profiloSportivoComponent/RiepilogoUtenteComponent';
import { FormPrenotazioneLezione } from './FormPrenotazioneLezioneComponent';
import { Label } from 'reactstrap';

export const NuovaPrenotazioneLezione: React.FC = () => {

    const dispatch = useDispatch()

    dispatch(resetListaInvitabili())
    dispatch(resetListaSportPraticabili())

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);

    dispatch(avviaNuovaPrenotazione(sportivoAutenticato.sportivo.email, "LEZIONE", sportivoAutenticato.jwt))

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <RiepilogoUtente nome={sportivoAutenticato.sportivo.nome}
                            cognome={sportivoAutenticato.sportivo.cognome}
                            email={sportivoAutenticato.sportivo.email}
                            sportPraticati={sportivoAutenticato.sportivo.sportPraticati} />
                        <div className="col-8">
                            <Label>PRENOTAZIONE LEZIONE</Label>
                            <FormPrenotazioneLezione />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}