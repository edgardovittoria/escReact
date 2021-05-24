import React from 'react';
import { Button } from 'reactstrap';
import { Prenotazione } from '../../model/Prenotazone';
import { Sportivo } from '../../model/Sportivo';
import { DettagliCorso } from '../nuovaPrenotazioneComponent/prenotazioneCorso/DettagliCorsoComponet';

type TableCorsiProsp = {
    corsiPrenotati: Prenotazione[],
    sportivoAutenticato: Sportivo
}


export const TabIscrizioneCorsi: React.FC<TableCorsiProsp> = ({ corsiPrenotati, sportivoAutenticato }) => {
    if (corsiPrenotati.length !== 0) {
        return (
            <ul style={{ textAlign: "left", marginTop: "20px" }}>
                {corsiPrenotati.map((corso, index) => {
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
                                <DettagliCorso corso={corso} giaPrenotato="none"/>
                            </div>

                        </>
                    )
                })}
            </ul>
        )
    } else {
        return <h3 style={{textAlign: "center", marginTop:"80px"}}>Al momento non hai effettuato nessuna prenotazione!!!</h3>
    }
}
