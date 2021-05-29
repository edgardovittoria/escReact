import { Notificabile } from './Notificabile';
import { UtentePolisportiva } from './UtentePolisportiva';
import { Appuntamento } from './Appuntamento';

export type Prenotazione = {
    idPrenotazione: number | null
    sportivoPrenotante: UtentePolisportiva
    appuntamenti: Appuntamento[]
    infoGeneraliEvento: Map<string, object>
    
}&Notificabile