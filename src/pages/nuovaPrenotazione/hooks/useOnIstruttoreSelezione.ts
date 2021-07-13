import {IstruttoriSelezionatiItem} from "../../../model/TipiAusiliari";
import {formPrenotazioneDefault} from "../../../model/FormPrenotazione";
import {useImpostaIstruttoreSelezionatoNellaListaIstruttori} from "./useImpostaIstruttoreSelezionatoNellaListaIstruttori";

let istruttoriSelezionati: IstruttoriSelezionatiItem[] = [];

export const useOnIstruttoreSelezione = () => {

    const impostaIstruttoreSelezionatoNellaListaIstruttori = useImpostaIstruttoreSelezionatoNellaListaIstruttori();

    return (istruttoreItem: IstruttoriSelezionatiItem) => {
        impostaIstruttoreSelezionatoNellaListaIstruttori(istruttoreItem, istruttoriSelezionati)
        formPrenotazioneDefault.istruttori = istruttoriSelezionati
    }
}