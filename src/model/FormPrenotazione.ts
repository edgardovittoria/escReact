import {
    CheckBoxPendingSelezionatoItem,
    ImpiantiSelezionatiItem,
    IstruttoriSelezionatiItem,
    OrarioPrenotazione
} from "./TipiAusiliari";

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