import { PrenotazioneSpecs } from './PrenotazioneSpecs';
import { Sportivo } from './Sportivo';

export type Appuntamento = {
    dataAppuntamento: Date
    oraInizioAppuntamento: Date
    oraFineAppuntamento: Date
    partecipanti: Sportivo[]
    specificaPrenotazione: PrenotazioneSpecs
}