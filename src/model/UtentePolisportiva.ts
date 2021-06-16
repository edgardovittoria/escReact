import {Appuntamento} from "./Appuntamento";

export type UtentePolisportiva = {
    nome: string
    cognome : string
    email: string
    ruoli: string[]
    attributiExtra: AttributiExtra
}

export type AttributiExtra = {
    moroso: boolean,
    sportPraticati: string[],
    appuntamentiSportivo: Appuntamento[]
    appuntamentiLezioni: Appuntamento[]
    appuntamentiManutentore: Appuntamento[]
}