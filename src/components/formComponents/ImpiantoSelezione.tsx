import React from 'react';
import { Label } from 'reactstrap';
import { Impianto } from '../../model/Impianto';

export type ImpiantoSelezioneProps = {
    chiave: number,
    impianti: Impianto[],
    handleSelezioneImpianto: Function
}

export const ImpiantoSelezione: React.FC<ImpiantoSelezioneProps> = ({ chiave, impianti, handleSelezioneImpianto }) => {
    return (
        <>
        <Label style={{marginLeft: "16px", marginTop: "10px"}}>Seleziona Impianto</Label>
        <select
            key={chiave}
            className="form-control"
            name="impianto"
            id="selezioneImpianto"
            onClick={(value) => {
                handleSelezioneImpianto(value.currentTarget.value, chiave)
            }}
            style={{marginLeft: "16px", width: "92%", marginBottom: "10px"}}
        >
            {impianti.map((impianto) => {
                return (
                    <option key={impianto.idStruttura} value={impianto.idStruttura}>{impianto.idStruttura} {impianto.pavimentazione}</option>
                )
            })}
        </select>
        </>
    )
}