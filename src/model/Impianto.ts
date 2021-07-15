import { Appuntamento } from './Appuntamento';
import { Sport } from './Sport';

export type Impianto = {
    idStruttura : number
    indoor : boolean
    pavimentazione: string
    sportPraticabili: Sport[]
    appuntamenti: Appuntamento[]
}

export let impiantoDefault: Impianto = {
    idStruttura : -1,
    indoor : false,
    pavimentazione: "",
    sportPraticabili: [],
    appuntamenti: []
}