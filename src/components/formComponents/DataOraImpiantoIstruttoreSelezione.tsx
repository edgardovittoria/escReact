import React from 'react';
import { Impianto } from '../../model/Impianto';
import { UtentePolisportiva } from '../../model/UtentePolisportiva';
import { DataOraSelezione, OrarioPrenotazione } from './DataOraSelezione';
import { ImpiantoSelezione } from './ImpiantoSelezione';
import { IstruttoreSelezione } from './IstruttoreSelezione';

export type DataOraImpiantoRicorrenteProps = {
    numeroDate: number,
    handleSelezioneDataOra: Function,
    impianti: ArrayLisetImpiantoItem[],
    istruttori: ArrayListeIstruttoreItem[],
    handleSelezioneImpianto: Function,
    handleSelezioneIstruttore: Function
}

export type ArrayLisetImpiantoItem = {
    id: number,
    impiantiDisponibili: Impianto[]
}

export type ArrayListeIstruttoreItem = {
    id: number,
    istruttoriDisponibili: UtentePolisportiva[]
}


export type ImpiantiSelezionatiItem = {
    idSelezione: number
    idImpianto: string
}

export type IstruttoriSelezionatiItem = {
    idSelezione: number
    istruttore: string
}



export const DataOraImpiantoIstruttoreSelezione: React.FC<DataOraImpiantoRicorrenteProps> = ({ numeroDate, handleSelezioneDataOra, istruttori, impianti, handleSelezioneImpianto, handleSelezioneIstruttore }) => {
    const onOrarioSelezioneRicorrente = (orarioPrenotazione: OrarioPrenotazione) => {
        handleSelezioneDataOra(orarioPrenotazione)
    }
    const onImpiantoSelezioneRecorrente = (impianto: string, chiave: number) => {
        let impiantoItem: ImpiantiSelezionatiItem = {
            idSelezione: chiave,
            idImpianto: impianto
        } 
        handleSelezioneImpianto(impiantoItem);
    }
    const onIstruttoreSelezioneRecorrente = (istruttore: string, chiave: number) => {
        let istruttoreItem: IstruttoriSelezionatiItem = {
            idSelezione: chiave,
            istruttore: istruttore
        } 
        handleSelezioneIstruttore(istruttoreItem)
    }

    let elementi: JSX.Element[] = []
    for (let i = 1; i < numeroDate+1; i++) {
        elementi.push(
            <div key={i}>
                <DataOraSelezione handleSelezioneOrario={onOrarioSelezioneRicorrente}
                    chiave={i} />
                <ImpiantoSelezione impianti={impianti.filter(item => item.id === i)[0].impiantiDisponibili}
                    handleSelezioneImpianto={onImpiantoSelezioneRecorrente}
                    chiave={i} />
                <IstruttoreSelezione istruttori={istruttori.filter(item => item.id === i)[0].istruttoriDisponibili}
                    handleSelezioneIstruttore={onIstruttoreSelezioneRecorrente}
                    chiave={i} />
            </div>
        )
    }
    return (
        <div>
            {elementi}
        </div>
    )
}