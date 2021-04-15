import { Appuntamento } from './Appuntamento';
import { Sportivo } from './Sportivo';

export type Prenotazione = {
    sportivoPrenotante: Sportivo
    appuntamenti: Appuntamento[]
    
}