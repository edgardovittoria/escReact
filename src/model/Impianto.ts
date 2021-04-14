import { Appuntamento } from './Appuntamento';
import { Sport } from './Sport';

export type Impianto = {
    IdImpianto : number
    indoor : boolean
    pavimentazione: string
    sportPraticabili: Sport[]
    appuntamenti: Appuntamento[]
}