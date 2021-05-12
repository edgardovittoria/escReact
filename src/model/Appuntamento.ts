import { PrenotazioneSpecs } from './PrenotazioneSpecs';
import { QuotaPartecipazione } from './QuotaPartecipazione';
import { Sportivo } from './Sportivo';

export type Appuntamento = {
    dataAppuntamento: Date
    oraInizioAppuntamento: Date
    oraFineAppuntamento: Date
    listaPartecipanti: Sportivo[]
    specificaPrenotazione: PrenotazioneSpecs
    quotePartecipazione: QuotaPartecipazione[]
}