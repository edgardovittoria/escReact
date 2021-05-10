import React from 'react';
import { Sportivo } from '../../../model/Sportivo';

export type sportiviInvitabiliProps = {
    sportivi: Sportivo[],
    handleSelezioneSportiviInvitabili: Function
}

export const SportiviInvitabiliSelezione: React.FC<sportiviInvitabiliProps> = ({sportivi, handleSelezioneSportiviInvitabili}) => {
    return (
        <select
            multiple
            className="form-control selectpicker"
            data-live-search="true"
            id="invitaSportivi"
            name="sportiviInvitati"
            onChange={(values) => {
                //handleSelezioneSportiviInvitabili(values.target.selectedOptions)
                let sportiviSelezionati = Array.from(values.target.selectedOptions, option => option.value)
                handleSelezioneSportiviInvitabili(sportiviSelezionati)
            }}
        >
            {sportivi.map((sportivo) => {
                return (<option key={sportivo.email} value={sportivo.email}>{sportivo.nome} {sportivo.cognome}</option>)
            })}
        </select>
    )
}