import {Prenotazione} from "./Prenotazone";
import {Appuntamento} from "./Appuntamento";

export type Notificabile = {
    tipoEventoNotificabile: string
}&Prenotazione&Appuntamento