import React from "react"
import { Prenotazione } from "../../../model/Prenotazone"
import { SportivoAutenticatoState } from "../../../store/sportivoAutenticatoSlice"
import { RiepilogoUtente } from "../../../components/riepilogoProfilo/RiepilogoUtente"
import {
    CardRiepilogoPrenotazioneImpianto
} from "../../../components/cardRiepilogoPrenotazione/CardRiepilogoPrenotazioneImpianto"

export type DettagliPrenotazioneProps = {
    prenotazione: Prenotazione,
    sportivoAutenticato: SportivoAutenticatoState
    history: any
    onClick: () => void
    testoBottone: string
    displayButtons: string
}

export const DettagliPrenotazione: React.FC<DettagliPrenotazioneProps> = ({ prenotazione, sportivoAutenticato, history, onClick, testoBottone, displayButtons }) => {
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

                        <CardRiepilogoPrenotazioneImpianto prenotazione={prenotazione}
                            history={history}
                            onClick={onClick}
                            testoBottone={testoBottone}
                            displayButtons={displayButtons} />
                    </div>
                </div>
            </section>

        </>
    )
}