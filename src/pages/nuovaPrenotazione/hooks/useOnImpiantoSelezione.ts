import {ImpiantiSelezionatiItem} from "../../../model/TipiAusiliari";
import {formPrenotazioneDefault} from "../../../model/FormPrenotazione";
import {useImpostaImpiantoSelezionatoNellaListaImpianti} from "./useImpostaImpiantoSelezionatoNellaListaImpianti";

let impiantiSelezionati: ImpiantiSelezionatiItem[] = [];

export const useOnImpiantoSelezione = () => {
    const impostaImpiantoSelezionatoNellaListaImpianti = useImpostaImpiantoSelezionatoNellaListaImpianti();

    return (impiantoItem: ImpiantiSelezionatiItem) => {
        impostaImpiantoSelezionatoNellaListaImpianti(impiantoItem, impiantiSelezionati)
        formPrenotazioneDefault.impianti = impiantiSelezionati
    }
}