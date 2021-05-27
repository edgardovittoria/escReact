import { UtentePolisportiva } from './UtentePolisportiva';
import { PrenotazioneSpecs } from './PrenotazioneSpecs';
import { QuotaPartecipazione } from './QuotaPartecipazione';

export type Appuntamento = {
    idAppuntamento: number
    dataAppuntamento: Date
    oraInizioAppuntamento: Date
    oraFineAppuntamento: Date
    partecipanti: UtentePolisportiva[]
    specificaPrenotazione: PrenotazioneSpecs
    quotePartecipazione: QuotaPartecipazione[]
    creatore: UtentePolisportiva
}