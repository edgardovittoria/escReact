import { Appuntamento } from './Appuntamento';
import { Sportivo } from './Sportivo';

export type Prenotazione = {
    idPrenotazione: number | null
    sportivoPrenotante: Sportivo
    appuntamenti: Appuntamento[]
    infoGeneraliEvento: Map<string, object>
    
}