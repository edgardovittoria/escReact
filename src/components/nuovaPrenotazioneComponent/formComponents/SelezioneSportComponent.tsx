import React from 'react';
import { Label } from 'reactstrap';
import { Sport } from '../../../model/Sport';

export type SelezioneSportProps = {
    sports: Sport[],
    handleSelezioneSport: Function
}

export const SelezioneSport: React.FC<SelezioneSportProps> = ({ sports, handleSelezioneSport }) => {

    return (
        <>
            <div className="form-check col-sm col-4">
                {sports.map((sport, index) => {
                    return (
                        <Label key={index} className="form-check-label" style={{ display: 'inline' }}>
                            <input
                                key={sport.nome}
                                type="radio"
                                className="form-check-input"
                                name="sportSelezionato"
                                value={sport.nome}
                                onInput={(target) => {
                                    handleSelezioneSport(target.currentTarget.value)
                                }} />
                            <div>{sport.nome}</div>
                        </Label>
                    )
                })}
            </div>
        </>
    )
}