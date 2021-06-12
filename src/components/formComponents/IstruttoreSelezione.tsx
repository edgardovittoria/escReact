import React from 'react';
import { Label } from 'reactstrap';
import { UtentePolisportiva } from '../../model/UtentePolisportiva';

export type IstruttoreSelezioneProps = {
    istruttori: UtentePolisportiva[],
    handleSelezioneIstruttore: Function,
    chiave: number
}

export const IstruttoreSelezione: React.FC<IstruttoreSelezioneProps> = ({ istruttori, handleSelezioneIstruttore, chiave }) => {
    return (
        <>
            <Label style={{marginLeft: "16px"}}>Seleziona Istruttore</Label>
            <select
                className="form-control"
                name="istruttoreSelezione"
                id="istruttoreSelezione"
                key={chiave}
                onClick={(value) => {
                    handleSelezioneIstruttore(value.currentTarget.value, chiave)
                }}
                style={{marginLeft: "16px", width: "92%", marginBottom: "10px"}}
            >
                {istruttori.map((istruttore) => {
                    return (<option key={istruttore.email} value={istruttore.email}>{istruttore.nome} {istruttore.cognome}</option>)
                })}
            </select>
        </>
    )
}