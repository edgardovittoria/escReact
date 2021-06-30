import {IstruttoriSelezionatiItem} from "../../../components/formComponents/DataOraImpiantoIstruttoreSelezione";

export const useImpostaIstruttoreSelezionatoNellaListaIstruttori = () => {
    return (istruttoreSelezionato: IstruttoriSelezionatiItem, listaIstruttori: IstruttoriSelezionatiItem[]) => {
        if (istruttoreSelezionatoNonPresenteNellaListaIstruttori(istruttoreSelezionato, listaIstruttori)) {
            listaIstruttori.push(istruttoreSelezionato)
        } else {
            aggiornaIstruttoreSelezionatoNellaListaIstruttori(istruttoreSelezionato, listaIstruttori)
        }
    }
}

const istruttoreSelezionatoNonPresenteNellaListaIstruttori = (istruttoreSelezionato: IstruttoriSelezionatiItem, listaIstruttori: IstruttoriSelezionatiItem[]) => {
    return listaIstruttori.filter(item => item.idSelezione === istruttoreSelezionato.idSelezione).length === 0
}

const aggiornaIstruttoreSelezionatoNellaListaIstruttori = (istruttoreSelezionato: IstruttoriSelezionatiItem, listaIstruttori: IstruttoriSelezionatiItem[]) => {
    listaIstruttori.filter(item => item.idSelezione === istruttoreSelezionato.idSelezione)[0].istruttore = istruttoreSelezionato.istruttore
}