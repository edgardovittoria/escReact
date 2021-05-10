import React from 'react';
import { Label } from 'reactstrap';
import { Istruttore } from '../../../model/Istruttore';

export type IstruttoreSelezioneProps = {
    istruttori: Istruttore[],
    handleSelezioneIstruttore: Function,
    chiave: number
}

export const IstruttoreSelezione: React.FC<IstruttoreSelezioneProps> = ({ istruttori, handleSelezioneIstruttore, chiave }) => {
    return (
        <>
            <Label>Seleziona Istruttore</Label>
            <select
                className="form-control"
                name="istruttoreSelezione"
                id="istruttoreSelezione"
                key={chiave}
                onClick={(value) => {
                    handleSelezioneIstruttore(value.currentTarget.value, chiave)
                }}
            >
                {istruttori.map((istruttore) => {
                    return (<option key={istruttore.email} value={istruttore.email}>{istruttore.nome} {istruttore.cognome}</option>)
                })}
            </select>
        </>
    )
}