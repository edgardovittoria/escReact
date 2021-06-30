import {aggiornaOpzioniPrenotazione} from "../../../store/prenotazioneSlice";
import {useDispatch} from "react-redux";
import {DatiPerAggiornamentoOpzioni} from "../nuovaPrenotazioneUtenteSingolo/prenotazioneImpianto/components/FormPrenotazioneImpiantoRicorrente";

export const useAggiornaOpzioniSuSelezioneSport = () => {
    const dispatch = useDispatch();
    return(
        datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni
    ) => {
        if(datiPerAggiornamentoOpzioni.numeroDate !== undefined)
        for(let i=1; i<datiPerAggiornamentoOpzioni.numeroDate+1; i++){
            dispatch(aggiornaOpzioniPrenotazione(datiPerAggiornamentoOpzioni))
        }
    }
}