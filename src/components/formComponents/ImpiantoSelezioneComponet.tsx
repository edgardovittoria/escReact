import React from 'react';
import { Impianto } from '../../model/Impianto';
import { ImpiantoState } from '../../store/impiantoSlice';

export type ImpiantoSelezioneProps = {
    impianti: Impianto[],
    handleSelezioneImpianto: Function
}

export const ImpiantoSelezione: React.FC<ImpiantoSelezioneProps> = ({impianti, handleSelezioneImpianto}) => {
    return (
        <select
            className="form-control"
            name="impianto"
            id="selezioneImpianto"
            onChange={(value) => {
                handleSelezioneImpianto(value.currentTarget.value)
            }}
        >
            {impianti.map((impianto) => {
                return (
                    <>
                        <option key={impianto.idImpianto} value={impianto.idImpianto}>{impianto.idImpianto} {impianto.pavimentazione}</option>
                    </>
                )
            })}
        </select>
    )
}