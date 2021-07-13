import {CheckBoxPendingSelezionatoItem} from "../../../model/TipiAusiliari";
import {formPrenotazioneDefault} from "../../../model/FormPrenotazione";
import {useImpostaCheckboxPendingSelezionatoNellaListaCheckboxPending} from "./useImpostaCheckboxPendingSelezionatoNellaListaCheckboxPending";

let checkboxes: CheckBoxPendingSelezionatoItem[] = [];

export const useOnCheckboxPendingSelezione = () => {
    const impostaCheckboxPendingSelezionatoNellaListaCheckboxPending = useImpostaCheckboxPendingSelezionatoNellaListaCheckboxPending();

    return (checkBoxPendingItem: CheckBoxPendingSelezionatoItem) => {
        impostaCheckboxPendingSelezionatoNellaListaCheckboxPending(checkBoxPendingItem, checkboxes)
        formPrenotazioneDefault.checkboxesPending = checkboxes
    }
}