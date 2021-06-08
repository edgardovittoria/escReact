import React from 'react';
import { Squadra } from '../../../model/Squadra';

export type squadreInvitabiliProps = {
    squadreInvitabili: Squadra[],
    handleSelezioneSquadra: Function
}

export const SquadreInvitabiliSelezione: React.FC<squadreInvitabiliProps> = ({squadreInvitabili, handleSelezioneSquadra}) => {
    return (
        <select
            multiple
            className="form-control selectpicker"
            data-live-search="true"
            id="invitaSquadre"
            name="squadreInvitabili"
            onChange={(values) => {
                //handleSelezioneSportiviInvitabili(values.target.selectedOptions)
                let squadreSelezionate = Array.from(values.target.selectedOptions, option => option.value)
                handleSelezioneSquadra(squadreSelezionate)
            }}
        >
            {squadreInvitabili.map((squadra) => {
                return (<option key={squadra.idSquadra} value={squadra.idSquadra}>{squadra.nome}</option>)
            })}
        </select>
    )
}