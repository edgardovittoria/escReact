import { Sportivo } from './Sportivo';
import { Sport } from './Sport';

export type PrenotazioneSpecs = {
    confermata: boolean
    costo: Number
    sportAssociato: Sport
    tipoSpecifica: string
    invitati: Sportivo[]
    idImpiantoPrenotato: number
    pavimentazioneImpianto: string
}