import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {confermaPrenotazione} from "../../../store/prenotazioneSlice";

export const useConfermaPrenotazione = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    return () => {
        dispatch(confermaPrenotazione())
        setTimeout(()=>{
            history.push("/profiloSportivo")
        },500);
    }
}