import {formPrenotazioneDefault} from "../../../model/FormPrenotazione";

export const useOnSportiviInvitabiliSelezione = () => {
    return (emailSportivi: string[]) => {
        formPrenotazioneDefault.sportiviInvitati = emailSportivi
    }
}