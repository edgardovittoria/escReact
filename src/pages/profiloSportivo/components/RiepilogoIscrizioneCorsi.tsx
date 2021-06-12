import React from 'react';
import { Button } from 'reactstrap';
import { Prenotazione } from '../../../model/Prenotazone';
import { UtentePolisportiva } from '../../../model/UtentePolisportiva';
import { DettagliCorso } from '../../../components/dettagliCorso/DettagliCorso';

type RiepilogoIscrizioneCorsiProsp = {
    corsiPrenotati: Prenotazione[],
    sportivoAutenticato: UtentePolisportiva
}


export const RiepilogoIscrizioneCorsi: React.FC<RiepilogoIscrizioneCorsiProsp> = ({ corsiPrenotati, sportivoAutenticato }) => {
    if (corsiPrenotati.length !== 0) {
        return (
            <ul style={{ textAlign: "left", marginTop: "20px" }}>
                {corsiPrenotati.map((corso, index) => {
                    return (
                        <>
                            <li key={index} style={{ marginTop: "20px" }}>
                                {corso.appuntamenti[0].specificaPrenotazione.sportAssociato.nome.toUpperCase()} {corso.infoGeneraliEvento.costoPerPartecipante} €
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
        return <p style={{textAlign: "center", marginTop:"50px"}}>Al momento non hai effettuato nessuna prenotazione!!!</p>
    }
}
