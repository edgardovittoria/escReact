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
    costoPerPartecipante: number,
    nomeEvento: string,
    tipoPrenotazione: string
}

export const formPrenotazioneDefault: FormPrenotazione = {
    sportSelezionato: "",
    orariSelezionati: [],
    impianti: [],
    squadreInvitate: [],
    checkboxesPending: [],
    sportiviInvitati: [],
    postiLiberi: -1,
    numeroGiocatoriNonIscritti: -1,
    istruttori: [],
    numeroMinimoPartecipanti: -1,
    numeroMassimoPartecipanti: -1,
    costoPerPartecipante: -1,
    nomeEvento:"",
    tipoPrenotazione: "CORSO"
}