import {useDispatch} from "react-redux";
import {FormPrenotazione} from "../../../model/FormPrenotazione";
import {riepilogoPrenotazione} from "../../../store/prenotazioneSlice";
import {useHistory} from "react-router-dom";

export const useSubmitFormPrenotazione = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    return (formPrenotazione: FormPrenotazione) => {
        dispatch(riepilogoPrenotazione(formPrenotazione))
        history.push("/riepilogoPrenotazione");
    }
}