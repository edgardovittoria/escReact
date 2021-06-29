import {OrarioPrenotazione} from "../components/formComponents/DataOraSelezione";
import {
    CheckBoxPendingSelezionatoItem,
    ImpiantiSelezionatiItem
} from "../components/formComponents/DataOraImpiantoRicorrente";
import {IstruttoriSelezionatiItem} from "../components/formComponents/DataOraImpiantoIstruttoreSelezione";

export type FormPrenotazione = {
    sportSelezionato: string,
    orariSelezionati: OrarioPrenotazione[]
    impianti: ImpiantiSelezionatiItem[],
    squadreInvitate: number[],
    checkboxesPending: CheckBoxPendingSelezionatoItem[]
    sportiviInvitati: string[],
    postiLiberi: number,
    numeroGiocatoriNonIscritti: number,
    istruttori: IstruttoriSelezionatiItem[],
    numeroMinimoPartecipanti: number,
    numeroMassimoPartecipanti: number,
    costoPerPartecipante: number
}