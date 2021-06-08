import { UtentePolisportiva } from './UtentePolisportiva';
import { Sport } from './Sport';
import { Appuntamento } from './Appuntamento';

export type Squadra = {
    idSquadra: number
    nome: string
    sport: Sport
    membri: UtentePolisportiva[]
    amministratori: UtentePolisportiva[]
    appuntamenti: Appuntamento[]
}