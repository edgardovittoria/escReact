import { Appuntamento } from './Appuntamento';
import { Sportivo } from './Sportivo';
export type IstruttoreBase = {
    sportInsegnati: string[],
    appuntamentiLezioni: Appuntamento[]
}

export type Istruttore = IstruttoreBase & Sportivo
