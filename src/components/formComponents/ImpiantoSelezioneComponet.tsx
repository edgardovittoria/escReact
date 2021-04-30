import React from 'react';
import { ImpiantoState } from '../../store/impiantoSlice';

export const ImpiantoSelezione: React.FC<ImpiantoState> = ({impianti, isLoading, errors, handleSelezioneImpianto}) => {
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
                        <option value={impianto.idImpianto}>{impianto.idImpianto} {impianto.pavimentazione}</option>
                    </>
                )
            })}
        </select>
    )
}