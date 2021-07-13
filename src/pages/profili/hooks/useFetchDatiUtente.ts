import {useDispatch, useSelector} from "react-redux";
import {fetchSportivo, sportivoAutenticatoSelector} from "../../../store/sportivoAutenticatoSlice";
import {fetchNotifiche} from "../../../store/notificheSlice";
import {fetchSquadre} from "../../../store/squadraSlice";
import {resetPrenotazioneDaConfermare} from "../../../store/prenotazioneSlice";

export const useFetchDatiUtente = () => {
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)
    const dispatch = useDispatch()
    return () => {
        dispatch(fetchNotifiche(sportivoAutenticato.sportivo.email))
        dispatch(fetchSquadre(sportivoAutenticato.sportivo.email))
        dispatch(fetchSportivo(sportivoAutenticato.sportivo.email))
        dispatch(resetPrenotazioneDaConfermare())
    }
}