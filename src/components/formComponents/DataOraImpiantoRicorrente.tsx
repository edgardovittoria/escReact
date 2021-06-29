import React from 'react';
import { Impianto } from '../../model/Impianto';
import { CheckBoxPending } from './CheckBoxPending';
import { DataOraSelezione, OrarioPrenotazione } from './DataOraSelezione';
import { ImpiantoSelezione } from './ImpiantoSelezione';

export type DataOraImpiantoRicorrenteProps = {
    numeroDate: number,
    handleSelezioneDataOra: Function,
    impianti: ArrayLisetImpiantoItem[],
    handleSelezioneImpianto: Function,
    handleSelezioneCheckBoxPending: Function
}

export type ArrayLisetImpiantoItem = {
    id: number | undefined,
    impiantiDisponibili: Impianto[]
}

export type ArrayCheckBoxPendingItem = {
    id: number,
    checkboxPending: boolean
}


export type ImpiantiSelezionatiItem = {
    idSelezione: number
    idImpianto: string
}

export type CheckBoxPendingSelezionatoItem = {
    idSelezione: number
    pending: boolean
}



export const DataOraImpiantoRicorrente: React.FC<DataOraImpiantoRicorrenteProps> = ({ numeroDate, handleSelezioneDataOra, impianti, handleSelezioneImpianto, handleSelezioneCheckBoxPending }) => {
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

    const onCheckBoxPendingSelezioneRicorrente = (pending: boolean, chiave: number) => {

        let checkBoxPendingItem: CheckBoxPendingSelezionatoItem = {
            idSelezione: chiave,
            pending: pending
        } 
        
        handleSelezioneCheckBoxPending(checkBoxPendingItem);
        
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
                <CheckBoxPending handleSelezioneCheckBox={onCheckBoxPendingSelezioneRicorrente}
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