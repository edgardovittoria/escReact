import { Appuntamento } from './Appuntamento';
import { Sport } from './Sport';

export type Impianto = {
    idImpianto : number
    indoor : boolean
    pavimentazione: string
    sportPraticabili: Sport[]
    appuntamenti: Appuntamento[]
}

export let impiantoDefault: Impianto = {
    idImpianto : -1,
    indoor : false,
    pavimentazione: "",
    sportPraticabili: [],
    appuntamenti: []
}