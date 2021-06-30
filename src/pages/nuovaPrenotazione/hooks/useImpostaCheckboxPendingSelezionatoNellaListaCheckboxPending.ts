import {CheckBoxPendingSelezionatoItem} from "../../../components/formComponents/DataOraImpiantoRicorrente";

export const useImpostaCheckboxPendingSelezionatoNellaListaCheckboxPending = () => {
    return (checkBoxPendingItem: CheckBoxPendingSelezionatoItem, listaCheckbox: CheckBoxPendingSelezionatoItem[]) => {
        if(checkboxPendingSelezionatoNonPresenteNellaListaCheckboxPending(checkBoxPendingItem, listaCheckbox)){
            listaCheckbox.push(checkBoxPendingItem)
        }else{
            aggiornaCheckboxPendingSelezionatoNellaListaCheckboxPending(checkBoxPendingItem, listaCheckbox)
        }
    }
}

const checkboxPendingSelezionatoNonPresenteNellaListaCheckboxPending = (checkBoxPendingItem: CheckBoxPendingSelezionatoItem, listaCheckbox: CheckBoxPendingSelezionatoItem[]) => {
    return listaCheckbox.filter(item => item.idSelezione === checkBoxPendingItem.idSelezione).length === 0
}

const aggiornaCheckboxPendingSelezionatoNellaListaCheckboxPending = (checkBoxPendingItem: CheckBoxPendingSelezionatoItem, listaCheckbox: CheckBoxPendingSelezionatoItem[]) => {
    listaCheckbox.filter(item => item.idSelezione === checkBoxPendingItem.idSelezione)[0].pending = checkBoxPendingItem.pending
}