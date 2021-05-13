import React from 'react';
import { Label } from 'reactstrap';

export type CheckBoxPendingSelezioneProps = {
    chiave: number,
    handleSelezioneCheckBox: Function
}

export const CheckBoxPending: React.FC<CheckBoxPendingSelezioneProps> = ({ chiave, handleSelezioneCheckBox }) => {
    return (
        <>
            <Label style={{ marginLeft: "16px", marginTop: "10px" }}>Permetti anche ad utenti non invitati di partecipare</Label>
            <input key={chiave}
                type="checkbox"
                className="form-check-input"
                name="si"
                value="true"
                onInput={(target) => {
                    handleSelezioneCheckBox(target.currentTarget.value, chiave)
                }} />
            <label className="form-check-label">
                Si
            </label>
        </>
    )
}