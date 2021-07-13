import {DatiPerAggiornamentoOpzioni, OrarioPrenotazione} from "../../../model/TipiAusiliari";
import {formPrenotazioneDefault} from "../../../model/FormPrenotazione";
import {useImpostaOrarioSelezionatoNellaListaOrari} from "./useImpostaOrarioSelezionatoNellaListaOrari";
import {useAggironaOpzioniSuSelezioneOrario} from "./useAggironaOpzioniSuSelezioneOrario";

let orari: OrarioPrenotazione[] = [];

export const useOnOrarioselezione = (datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni) => {

    const impostaOrarioSelezionatoNellaListaOrari = useImpostaOrarioSelezionatoNellaListaOrari();
    const aggiornaOpzioniSuSelezioneOrario = useAggironaOpzioniSuSelezioneOrario()

    return (orarioSelezionato: OrarioPrenotazione) => {
        impostaOrarioSelezionatoNellaListaOrari(orarioSelezionato, orari)
        datiPerAggiornamentoOpzioni.orario = orarioSelezionato
        datiPerAggiornamentoOpzioni.orariSelezionati = orari
        formPrenotazioneDefault.orariSelezionati = orari
        aggiornaOpzioniSuSelezioneOrario(datiPerAggiornamentoOpzioni)
    }
}