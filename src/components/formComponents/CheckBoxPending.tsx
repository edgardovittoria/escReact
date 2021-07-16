import React, {useEffect, useState} from 'react';
import { Label } from 'reactstrap';

export type CheckBoxPendingSelezioneProps = {
    chiave: number,
    handleSelezioneCheckBox: Function
}

export const CheckBoxPending: React.FC<CheckBoxPendingSelezioneProps> = ({ chiave, handleSelezioneCheckBox }) => {

    const [checked, setChecked] = useState<boolean>(true);
    useEffect(() => {
        handleSelezioneCheckBox(checked, chiave)
    }, [checked]);

    return (
        <>
            <Label style={{ marginLeft: "16px", marginTop: "10px" }}>Permetti anche ad utenti/squadre non invitati/e di partecipare</Label>
            <input key={chiave}
                type="checkbox"
                className="form-check-input"
                checked={checked}
                name="si"
                style={{ marginLeft: "10px", marginTop: "16px" }}
                onClick={() => {
                    setChecked(!checked)
                }} />
        </>
    )
}