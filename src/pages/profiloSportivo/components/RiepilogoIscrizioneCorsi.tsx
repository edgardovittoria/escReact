import React from 'react';
import { Prenotazione } from '../../../model/Prenotazone';
import { DettagliCorso } from '../../../components/dettagliCorso/DettagliCorso';
import {ListItemCorso} from "../../../components/dettagliCorso/ListItemCorso";

type RiepilogoIscrizioneCorsiProsp = {
    corsiPrenotati: Prenotazione[],
}


export const RiepilogoIscrizioneCorsi: React.FC<RiepilogoIscrizioneCorsiProsp> = ({ corsiPrenotati }) => {
    if (corsiPrenotati.length !== 0) {
        return (
            <ul style={{ textAlign: "left", marginTop: "20px" }}>
                {corsiPrenotati.map((corso, index) => {
                    return (
                        <>
                            <ListItemCorso index={index} corso={corso} />
                            <div id={"dettagliCorso"+index} style={{display: "none"}}>
                                <DettagliCorso corso={corso} />
                            </div>

                        </>
                    )
                })}
            </ul>
        )
    } else {
        return <p style={{textAlign: "center", marginTop:"50px"}}>Al momento non hai effettuato nessuna prenotazione!!!</p>
    }
}
