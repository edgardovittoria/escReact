import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { prenotazioneSelector } from '../../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../../store/sportivoAutenticatoSlice';
import { RiepilogoUtente } from '../../../components/riepilogoProfilo/RiepilogoUtente';
import {CardRiepilogoPrenotazioneLezione} from "../../../components/cardRiepilogoPrenotazione/CardRiepilogoPrenotazioneLezione";
import {useConfermaPrenotazione} from "../hooks/useConfermaPrenotazione";



export const RiepilogoPrenotazioneLezione: React.FC = () => {

    const prenotazioneDaConfermare = useSelector(prenotazioneSelector).prenotazioneDaConfermare
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)
    const history = useHistory();
    const confermaPrenotazione = useConfermaPrenotazione();


    if (prenotazioneDaConfermare.appuntamenti[0] !== undefined) {

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

                            <CardRiepilogoPrenotazioneLezione
                                prenotazione={prenotazioneDaConfermare}
                                history={history}
                                onClick={confermaPrenotazione}
                                testoBottone="Conferma Prenotazione"
                                displayButtons="block" />
                        </div>
                    </div>
                </section>

            </>
        )
    } else {
        return <Spinner animation="grow" />
    }

}

