export type UtentePolisportiva = {
    nome: string
    cognome : string
    email: string
    ruoli: string[]
    attributiExtra: AttributiExtra
}

export type AttributiExtra = {
    moroso: boolean,
    sportPraticati: string[]
}