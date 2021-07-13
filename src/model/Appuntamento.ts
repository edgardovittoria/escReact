import { QuotaPartecipazione } from './QuotaPartecipazione';
import {Sport} from "./Sport";

export type Appuntamento = {
    idAppuntamento: number
    dataAppuntamento: Date
    oraInizioAppuntamento: Date
    oraFineAppuntamento: Date
    partecipanti: string[]
    squadrePartecipanti: number[]
    quotePartecipazione: QuotaPartecipazione[]
    creatore: string
    manutentore: string
    modalitaPrenotazione: string
    tipoPrenotazione: string
    confermata: boolean
    pending: boolean
    costo: string
    sportAssociato: Sport
    invitati: string[]
    idImpiantoPrenotato: number
    pavimentazioneImpianto: string
    istruttore: string
}