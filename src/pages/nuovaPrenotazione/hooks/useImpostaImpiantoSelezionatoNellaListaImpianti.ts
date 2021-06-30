import {ImpiantiSelezionatiItem} from "../../../components/formComponents/DataOraImpiantoRicorrente";

export const useImpostaImpiantoSelezionatoNellaListaImpianti = () => {
    return (impiantoSelezionato: ImpiantiSelezionatiItem, listaImpianti: ImpiantiSelezionatiItem[]) => {
        if (impiantoSelezionatoNonPresenteNellaListaImpianti(impiantoSelezionato, listaImpianti)) {
            listaImpianti.push(impiantoSelezionato)
        } else {
            aggiornaImpiantoSelezionatonellaListaImpianti(impiantoSelezionato, listaImpianti)
        }
    }
}

const impiantoSelezionatoNonPresenteNellaListaImpianti = (impiantoSelezionato: ImpiantiSelezionatiItem, listaImpianti: ImpiantiSelezionatiItem[]) => {
    return listaImpianti.filter(item => item.idSelezione === impiantoSelezionato.idSelezione).length === 0
}

const aggiornaImpiantoSelezionatonellaListaImpianti = (impiantoSelezionato: ImpiantiSelezionatiItem, listaImpianti: ImpiantiSelezionatiItem[]) => {
    listaImpianti.filter(item => item.idSelezione === impiantoSelezionato.idSelezione)[0].idImpianto = impiantoSelezionato.idImpianto
}