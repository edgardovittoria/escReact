import { UtentePolisportiva } from './UtentePolisportiva';
import { Sport } from './Sport';

export type PrenotazioneSpecs = {
    confermata: boolean
    pending: boolean
    costo: Number
    sportAssociato: Sport
    tipoSpecifica: string
    invitati: UtentePolisportiva[]
    idImpiantoPrenotato: number
    pavimentazioneImpianto: string
    istruttore: UtentePolisportiva

}