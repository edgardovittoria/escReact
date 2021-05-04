import React from 'react';
import { Impianto } from '../../model/Impianto';

export type ImpiantoSelezioneProps = {
    chiave: number,
    impianti: Impianto[],
    handleSelezioneImpianto: Function
}

export const ImpiantoSelezione: React.FC<ImpiantoSelezioneProps> = ({ chiave, impianti, handleSelezioneImpianto }) => {
    return (
        <select
            key={chiave}
            className="form-control"
            name="impianto"
            id="selezioneImpianto"
            onClick={(value) => {
                handleSelezioneImpianto(value.currentTarget.value, chiave)
            }}
        >
            {impianti.map((impianto, index) => {
                return (
                    <option key={impianto.idImpianto} value={impianto.idImpianto}>{impianto.idImpianto} {impianto.pavimentazione}</option>
                )
            })}
        </select>
    )
}