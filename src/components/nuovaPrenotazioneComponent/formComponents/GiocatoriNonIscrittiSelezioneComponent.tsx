import React from 'react';

export type GiocatoriNonIscrittiProps = {
    postiLiberi: number,
    handleGiocatoriNonIscrittiSelezione: Function
}

let opzioni: JSX.Element[] = []

const generaOpzioni = (postiLiberi: number) => {
    opzioni = [];
    for (let i = 0; i < postiLiberi; i++) {
        opzioni.push(
            <option key={i} value={i}>{i}</option>
        )
    }
    return opzioni;
}

export const GiocatoriNonIscritti: React.FC<GiocatoriNonIscrittiProps> = ({ postiLiberi, handleGiocatoriNonIscrittiSelezione }) => {
    return (
        <select className="form-control"
            name="numeroGiocatoriNonIscritti"
            id="invitaSportiviNonIscritti"
            onChange={(value) => {
                handleGiocatoriNonIscrittiSelezione(value.currentTarget.value)
            }}
        >
            {generaOpzioni(postiLiberi)}
        </select>
    )
}