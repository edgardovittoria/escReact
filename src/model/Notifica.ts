import {Squadra} from "./Squadra";

export type Notifica = {
    idNotifica: number
    messaggio: string
    mittente: string
    letta: boolean
    idEvento: number
    tipoEventoNotificabile: string
    squadraDelMittente: Squadra | null
    squadraDelDestinatario: Squadra | null
}