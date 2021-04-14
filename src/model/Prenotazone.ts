import { Appuntamento } from './Appuntamento';
import { Sport } from './Sport';
import { Sportivo } from './Sportivo';

export type Prenotazione = {
    sportivoPrenotante: Sportivo
    appuntamenti: Appuntamento[]
    sportAssociato: Sport
    tipoSpecifica: string
}