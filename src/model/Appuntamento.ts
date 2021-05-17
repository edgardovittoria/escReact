import { PrenotazioneSpecs } from './PrenotazioneSpecs';
import { QuotaPartecipazione } from './QuotaPartecipazione';
import { Sportivo } from './Sportivo';

export type Appuntamento = {
    idAppuntamento: number
    dataAppuntamento: Date
    oraInizioAppuntamento: Date
    oraFineAppuntamento: Date
    partecipanti: Sportivo[]
    specificaPrenotazione: PrenotazioneSpecs
    quotePartecipazione: QuotaPartecipazione[]
    creatore: Sportivo
}