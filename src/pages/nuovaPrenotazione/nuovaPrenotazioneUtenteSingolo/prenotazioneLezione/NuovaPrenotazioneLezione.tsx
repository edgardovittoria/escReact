import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../../../store/sportivoAutenticatoSlice';
import { avviaNuovaPrenotazione } from '../../../../store/prenotazioneSlice';
import { resetListaInvitabili } from '../../../../store/utentePolisportivaSlice';
import { resetListaSportPraticabili } from '../../../../store/SportSlice';
import { RiepilogoUtente } from '../../../../components/riepilogoProfilo/RiepilogoUtente';
import { FormPrenotazioneLezione } from './components/FormPrenotazioneLezione';
import { Label } from 'reactstrap';
import {datiAvviaPrenotazione} from "../../../../model/TipiAusiliari";

export const NuovaPrenotazioneLezione: React.FC = () => {

    const dispatch = useDispatch()


    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);

    useEffect(() => {
        dispatch(resetListaInvitabili())
        dispatch(resetListaSportPraticabili())
        datiAvviaPrenotazione.email = sportivoAutenticato.sportivo.email
        datiAvviaPrenotazione.tipoPrenotazione = "LEZIONE"
        datiAvviaPrenotazione.modalitaPrenotazione = "SINGOLO_UTENTE"
        dispatch(avviaNuovaPrenotazione(datiAvviaPrenotazione))
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
                            attributiExtra={sportivoAutenticato.sportivo.attributiExtra} />
                        <div className="col-8"
                             style={{backgroundColor:"whitesmoke", padding:"20px"}}
                        >
                            <Label>PRENOTAZIONE LEZIONE</Label>
                            <FormPrenotazioneLezione />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}