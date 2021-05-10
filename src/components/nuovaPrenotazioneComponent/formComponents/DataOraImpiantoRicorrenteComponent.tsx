import React from 'react';
import { Impianto } from '../../../model/Impianto';
import { DataOraSelezione, OrarioPrenotazione } from './DataOraSelezioneComponent';
import { ImpiantoSelezione } from './ImpiantoSelezioneComponet';

export type DataOraImpiantoRicorrenteProps = {
    numeroDate: number,
    handleSelezioneDataOra: Function,
    impianti: ArrayLisetImpiantoItem[],
    handleSelezioneImpianto: Function
}

export type ArrayLisetImpiantoItem = {
    id: number,
    impiantiDisponibili: Impianto[]
}


export type ImpiantiSelezionatiItem = {
    idSelezione: number
    idImpianto: string
}



export const DataOraImpiantoRicorrente: React.FC<DataOraImpiantoRicorrenteProps> = ({ numeroDate, handleSelezioneDataOra, impianti, handleSelezioneImpianto }) => {
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

    let elementi: JSX.Element[] = []
    for (let i = 1; i < numeroDate+1; i++) {
        elementi.push(
            <div key={i}>
                <DataOraSelezione handleSelezioneOrario={onOrarioSelezioneRicorrente}
                    chiave={i} />
                <ImpiantoSelezione impianti={impianti.filter(item => item.id === i)[0].impiantiDisponibili}
                    handleSelezioneImpianto={onImpiantoSelezioneRecorrente}
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