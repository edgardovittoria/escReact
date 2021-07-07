import {aggiornaOpzioniPrenotazione} from "../../../store/prenotazioneSlice";
import {useDispatch} from "react-redux";
import {DatiPerAggiornamentoOpzioni} from "../../../model/TipiAusiliari";

export const useAggironaOpzioniSuSelezioneOrario = () => {
    const dispatch = useDispatch();
    return (datiPerAggiornamentoOpzioni: DatiPerAggiornamentoOpzioni) => {
        dispatch(aggiornaOpzioniPrenotazione(datiPerAggiornamentoOpzioni))
    }
}