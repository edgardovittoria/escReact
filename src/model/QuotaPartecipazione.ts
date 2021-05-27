import { UtentePolisportiva } from './UtentePolisportiva';


export type QuotaPartecipazione = {
    costo: number
    pagata: boolean
    sportivo: UtentePolisportiva
}