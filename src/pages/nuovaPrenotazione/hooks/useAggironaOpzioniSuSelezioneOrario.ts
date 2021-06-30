import {aggiornaOpzioniPrenotazione} from "../../../store/prenotazioneSlice";
import {useDispatch} from "react-redux";
import {DatiPerAggiornamentoOpzioni} from "../nuovaPrenotazioneUtenteSingolo/prenotazioneImpianto/components/FormPrenotazioneImpiantoRicorrente";

export const useAggironaOpzioniSuSelezioneOrario = () => {
    const dispatch = useDispatch();
    return (datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni) => {
        dispatch(aggiornaOpzioniPrenotazione(datiPerAggiornamentoOpzioni))
    }
}