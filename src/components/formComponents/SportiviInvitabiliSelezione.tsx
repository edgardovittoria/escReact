import React from 'react';
import { UtentePolisportiva } from '../../model/UtentePolisportiva';

export type sportiviInvitabiliProps = {
    sportiviInvitabili: UtentePolisportiva[],
    handleSelezioneSportiviInvitabili: Function
}

export const SportiviInvitabiliSelezione: React.FC<sportiviInvitabiliProps> = ({sportiviInvitabili, handleSelezioneSportiviInvitabili}) => {
    return (
        <select
            multiple
            className="form-control selectpicker"
            data-live-search="true"
            id="invitaSportivi"
            name="sportiviInvitabili"
            onChange={(values) => {
                //handleSelezioneSportiviInvitabili(values.target.selectedOptions)
                let sportiviSelezionati = Array.from(values.target.selectedOptions, option => option.value)
                handleSelezioneSportiviInvitabili(sportiviSelezionati)
            }}
        >
            {sportiviInvitabili.map((sportivo) => {
                return (<option key={sportivo.email} value={sportivo.email}>{sportivo.nome} {sportivo.cognome}</option>)
            })}
        </select>
    )
}