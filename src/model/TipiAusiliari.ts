import {UtentePolisportiva} from "./UtentePolisportiva";
import {Impianto} from "./Impianto";

export interface DatiIscrizioneEventoEsistente{
    idEvento: number | null,
    identificativoPartecipante: string | number,
    tipoPrenotazione: string,
    modalitaPrenotazione: string
}

export interface DatiPerAggiornamentoOpzioni {
    sport?: string,
    orario?: OrarioPrenotazione,
    orariSelezionati?: OrarioPrenotazione[],
    numeroDate?: number,
}

export const datiIscrizioneEventoEsistenteDefault: DatiIscrizioneEventoEsistente = {
    idEvento: -1,
    identificativoPartecipante: "",
    tipoPrenotazione: "",
    modalitaPrenotazione: ""
}

export type ArrayListeIstruttoreItem = {
    id: number | undefined,
    istruttoriDisponibili: UtentePolisportiva[]
}


export type IstruttoriSelezionatiItem = {
    idSelezione: number
    istruttore: string
}

export type ArrayLisetImpiantoItem = {
    id: number | undefined,
    impiantiDisponibili: Impianto[]
}

export type ArrayCheckBoxPendingItem = {
    id: number,
    checkboxPending: boolean
}


export type ImpiantiSelezionatiItem = {
    idSelezione: number
    idImpianto: string
}

export type CheckBoxPendingSelezionatoItem = {
    idSelezione: number
    pending: boolean
}

export type OrarioPrenotazione = {
    id: number
    dataPrenotazione: Date
    oraInizio: Date
    oraFine: Date

}