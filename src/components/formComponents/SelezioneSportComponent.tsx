import React from 'react';
import { Label } from 'reactstrap';
import { SportState } from '../../store/SportSlice';


export const SelezioneSport : React.FC<SportState> = ({sports, isLoading, errors, handleSelezioneSport}) => {

    return (
        <>
            <div className="form-check col-sm col-4">
                {sports.map((sport) => {
                    return (
                        <>
                            <Label className="form-check-label" style={{ display: 'inline' }}>
                                <input
                                    // {...register("sportSelezionato")}
                                    type="radio"
                                    className="form-check-input"
                                    name="sportSelezionato"
                                    value={sport.nome}
                                    onInput={(target) => { handleSelezioneSport(target.currentTarget.value)
                                        // sportPraticabili.sports.filter(sport => sport.nome.match(target.currentTarget.value)).map(sportSelezionato => {
                                        //     setPostiliberi(sportSelezionato.postiLiberi)
                                        //     setPostiliberiAggiornati(sportSelezionato.postiLiberi)
                                        //     //setSportSelezionato(target.currentTarget.value)
                                        //     setValue("postiLiberi", sportSelezionato.postiLiberi)
                                        // })
                                    }} />
                                <div>{sport.nome}</div>
                            </Label>
                        </>
                    )
                })}
            </div>
        </>
    )
}