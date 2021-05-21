import React from 'react';
import { Button } from 'reactstrap';
import { Prenotazione } from '../../../model/Prenotazone';
import { DettagliCorso } from './DettagliCorsoComponet';

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
                            <li key={index} style={{ marginTop: "20px" }}>
                                {corso.appuntamenti[0].specificaPrenotazione.sportAssociato.nome.toUpperCase()} {corso.infoGeneraliEvento.get("costoPerPartecipante")} €
                                <Button outline color="success"
                                    style={{ marginLeft: "20%", width: "20%" }}
                                    onClick={() => {
                                        let element = document.getElementById("dettagliCorso"+index);
                                        if(element?.style.display === "none"){
                                            element?.setAttribute("style", "display:block")
                                        }else{
                                            element?.setAttribute("style", "display:none")
                                        }
                                        
                                    }}>
                                        Dettagli
                                    </Button>
                                <hr />
                            </li>
                            <div id={"dettagliCorso"+index} style={{display: "none"}}>
                                <DettagliCorso corso={corso} />
                            </div>

                        </>
                    )
                })}
            </ul>

        )
    }


}