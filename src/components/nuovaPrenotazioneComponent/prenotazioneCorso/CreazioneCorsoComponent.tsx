import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';
import { avviaNuovaPrenotazioneEventoDirettore } from '../../../store/prenotazioneSlice';
import { resetListaInvitabili } from '../../../store/utentePolisportivaSlice';
import { resetListaSportPraticabili } from '../../../store/SportSlice';
import { RiepilogoUtente } from '../../profiloSportivoComponent/RiepilogoUtenteComponent';
import { Label } from 'reactstrap';
import { FormCreazioneCorso } from './FormCreazioneCorsoComponent';

export const CreazioneCorso: React.FC = () => {

    const dispatch = useDispatch()

    dispatch(resetListaInvitabili())
    dispatch(resetListaSportPraticabili())

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);

    dispatch(avviaNuovaPrenotazioneEventoDirettore(sportivoAutenticato.sportivo.email, "CORSO", "SINGOLO_UTENTE", sportivoAutenticato.jwt))

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <RiepilogoUtente nome={sportivoAutenticato.sportivo.nome}
                            cognome={sportivoAutenticato.sportivo.cognome}
                            email={sportivoAutenticato.sportivo.email}
                            ruoli={sportivoAutenticato.sportivo.ruoli}
                            attributiExtra={sportivoAutenticato.sportivo.attributiExtra} />
                        <div className="col-8">
                            <Label>CREAZIONE CORSO</Label>
                            <FormCreazioneCorso/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}