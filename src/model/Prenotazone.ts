import { Notificabile } from './Notificabile';
import { UtentePolisportiva } from './UtentePolisportiva';
import { Appuntamento } from './Appuntamento';

export type Prenotazione = {
    idPrenotazione: number | null
    sportivoPrenotante: UtentePolisportiva
    appuntamenti: Appuntamento[]
    infoGeneraliEvento: InfoGeneraliEvento
    
}&Notificabile

export type InfoGeneraliEvento = {
    numeroMinimoPartecipanti: number
    numeroMassimoPartecipanti: number
    costoPerPartecipante: number
    invitatiCorso: UtentePolisportiva[]
}