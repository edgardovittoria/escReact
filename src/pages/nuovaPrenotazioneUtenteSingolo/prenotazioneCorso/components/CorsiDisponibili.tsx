import React from 'react';
import { Prenotazione } from '../../../../model/Prenotazone';
import { DettagliCorso } from '../../../../components/dettagliCorso/DettagliCorso';
import {ListItemCorso} from "../../../../components/dettagliCorso/ListItemCorso";

export type CorsiDisponibiliProps = {
    corsiDisponibili: Prenotazione[]
}

export const CorsiDisponibili: React.FC<CorsiDisponibiliProps> = ({ corsiDisponibili }) => {



    if (corsiDisponibili.length === 0) {
        return (
            <h4 style={{ marginTop: "200px", fontWeight: "normal" }}>Al momento non sono presenti corsi a cui potersi iscrivere</h4>
        )
    } else {
        return (
            <ul style={{ textAlign: "left", marginTop: "20px" }}>
                {corsiDisponibili.map((corso, index) => {
                    return (
                        <>
                            <ListItemCorso index={index} corso={corso}/>
                            <div id={"dettagliCorso"+index} style={{display: "none"}}>
                                <DettagliCorso corso={corso} giaPrenotato="block" />
                            </div>

                        </>
                    )
                })}
            </ul>

        )
    }


}