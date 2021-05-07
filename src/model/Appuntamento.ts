import { PrenotazioneSpecs } from './PrenotazioneSpecs';
import { Sportivo } from './Sportivo';

export type Appuntamento = {
    dataAppuntamento: Date
    oraInizioAppuntamento: Date
    oraFineAppuntamento: Date
    listaPartecipanti: Sportivo[]
    specificaPrenotazione: PrenotazioneSpecs
}