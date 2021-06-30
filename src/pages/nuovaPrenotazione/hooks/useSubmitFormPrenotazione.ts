import {useDispatch, useSelector} from "react-redux";
import {FormPrenotazione} from "../../../model/FormPrenotazione";
import {riepilogoPrenotazione} from "../../../store/prenotazioneSlice";
import {useHistory} from "react-router-dom";
import {sportivoAutenticatoSelector} from "../../../store/sportivoAutenticatoSlice";

export const useSubmitFormPrenotazione = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)
    return (formPrenotazione: FormPrenotazione) => {
        dispatch(riepilogoPrenotazione(formPrenotazione, sportivoAutenticato.jwt))
        history.push("/riepilogoPrenotazione");
    }
}