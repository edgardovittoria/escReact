import {useDispatch} from "react-redux";
import {FormPrenotazione} from "../../../model/FormPrenotazione";
import {riepilogoPrenotazione} from "../../../store/prenotazioneSlice";
import {useHistory} from "react-router-dom";

export const useSubmitFormPrenotazione = (tipoPrenotazione: string) => {
    const dispatch = useDispatch();
    const history = useHistory();
    return (formPrenotazione: FormPrenotazione) => {
        dispatch(riepilogoPrenotazione(formPrenotazione))
        if(tipoPrenotazione === "CORSO"){
            history.push("/riepilogoCreazioneCorso");
        }else if (tipoPrenotazione === "IMPIANTO"){
            history.push("/riepilogoPrenotazione");
        }else if (tipoPrenotazione === "LEZIONE"){
            history.push("/riepilogoPrenotazioneLezione");
        }

    }
}