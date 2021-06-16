import { UtentePolisportiva } from './UtentePolisportiva';
import { PrenotazioneSpecs } from './PrenotazioneSpecs';
import { QuotaPartecipazione } from './QuotaPartecipazione';

export type Appuntamento = {
    idAppuntamento: number
    dataAppuntamento: Date
    oraInizioAppuntamento: Date
    oraFineAppuntamento: Date
    partecipanti: string[]
    squadrePartecipanti: number[]
    specificaPrenotazione: PrenotazioneSpecs
    quotePartecipazione: QuotaPartecipazione[]
    creatore: string
    manutentore: UtentePolisportiva
    modalitaPrenotazione: string
    tipoPrenotazione: string
}