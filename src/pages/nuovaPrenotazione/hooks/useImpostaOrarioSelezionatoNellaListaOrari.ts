import {OrarioPrenotazione} from "../../../components/formComponents/DataOraSelezione";

export const useImpostaOrarioSelezionatoNellaListaOrari = () => {
    return (orarioSelezionato: OrarioPrenotazione, listaOrari: OrarioPrenotazione[]) => {
        if(orarioSelezionatoNonPresenteNellaListaOrari(orarioSelezionato, listaOrari)){
            listaOrari.push(orarioSelezionato)
        }else{
            aggiornaOrarioSelezionatoNellaListaOrari(orarioSelezionato, listaOrari)
        }
    }
}

const orarioSelezionatoNonPresenteNellaListaOrari = (orarioSelezionato: OrarioPrenotazione, listaOrari: OrarioPrenotazione[]) => {
    return listaOrari.filter(orario => orario.id === orarioSelezionato.id).length === 0
}

const aggiornaOrarioSelezionatoNellaListaOrari = (orarioSelezionato: OrarioPrenotazione, listaOrari: OrarioPrenotazione[]) => {
    listaOrari.filter(orario => orario.id === orarioSelezionato.id)[0].dataPrenotazione = orarioSelezionato.dataPrenotazione
    listaOrari.filter(orario => orario.id === orarioSelezionato.id)[0].oraInizio = orarioSelezionato.oraInizio
    listaOrari.filter(orario => orario.id === orarioSelezionato.id)[0].oraFine = orarioSelezionato.oraFine
}