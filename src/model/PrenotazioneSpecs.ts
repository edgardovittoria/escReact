import { Istruttore } from './Istruttore';
import { Sportivo } from './Sportivo';
import { Sport } from './Sport';

export type PrenotazioneSpecs = {
    idPrenotazioneSpecsDTO: number
    confermata: boolean
    pending: boolean
    costo: Number
    sportAssociato: Sport
    tipoSpecifica: string
    invitati: Sportivo[]
    idImpiantoPrenotato: number
    pavimentazioneImpianto: string
    istruttore: Istruttore
}