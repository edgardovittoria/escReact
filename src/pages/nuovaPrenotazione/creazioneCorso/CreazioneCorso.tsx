import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';
import { avviaNuovaPrenotazioneEventoDirettore } from '../../../store/prenotazioneSlice';
import { resetListaInvitabili } from '../../../store/utentePolisportivaSlice';
import { resetListaSportPraticabili } from '../../../store/SportSlice';
import { RiepilogoUtente } from '../../../components/riepilogoProfilo/RiepilogoUtente'
import { Label } from 'reactstrap';
import { FormCreazioneCorso } from './components/FormCreazioneCorso';
import {datiAvviaPrenotazione} from "../../../model/TipiAusiliari";

export const CreazioneCorso: React.FC = () => {

    const dispatch = useDispatch()

    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);

    useEffect(() => {
        dispatch(resetListaInvitabili())
        dispatch(resetListaSportPraticabili())

        datiAvviaPrenotazione.email = sportivoAutenticato.sportivo.email
        datiAvviaPrenotazione.tipoPrenotazione = "CORSO"
        datiAvviaPrenotazione.modalitaPrenotazione = "SINGOLO_UTENTE"

        dispatch(avviaNuovaPrenotazioneEventoDirettore(datiAvviaPrenotazione ))
    }, []);



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
                        <div className="col-8"
                             style={{backgroundColor:"whitesmoke", padding:"20px"}}
                        >
                            <Label>CREAZIONE CORSO</Label>
                            <FormCreazioneCorso/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}