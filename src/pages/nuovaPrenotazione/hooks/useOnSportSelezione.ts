import {DatiPerAggiornamentoOpzioni} from "../../../model/TipiAusiliari";
import {formPrenotazioneDefault} from "../../../model/FormPrenotazione";
import {useAggiornaOpzioniSuSelezioneSport} from "./useAggiornaOpzioniSuSelezioneSport";

export const useOnSportSelezione = (datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni) => {

    const aggiornaOpzioniSuSelezioneSport = useAggiornaOpzioniSuSelezioneSport();

    return (sportSelezionato: string) => {
        datiPerAggiornamentoOpzioni.sport = sportSelezionato
        formPrenotazioneDefault.sportSelezionato = sportSelezionato
        aggiornaOpzioniSuSelezioneSport(datiPerAggiornamentoOpzioni)
    }
}