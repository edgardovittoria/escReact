import React from 'react';
import {Appuntamento} from "../../model/Appuntamento";
import {Button} from "reactstrap";
import {RiepilogoAppuntamento} from "../appuntamentiSottoscrivibili/RiepilogoAppuntamento";

interface CalendarioSportivoProps {
    appuntamenti: Appuntamento[]
}

export const Calendario: React.FC<CalendarioSportivoProps> = ({appuntamenti}) => {

    if(appuntamenti.length !== 0){
        return (
            <ul style={{ textAlign: "left", marginTop: "20px" }}>
                {appuntamenti.map((appuntamento, index) => {
                    return (
                        <>
                            <li key={appuntamento.idAppuntamento} style={{ marginTop: "20px", marginLeft: "20px" }}>
                                <b>{appuntamento.tipoPrenotazione} </b><b>{appuntamento.sportAssociato.nome.toUpperCase()}</b> {appuntamento.dataAppuntamento} {appuntamento.oraInizioAppuntamento} {appuntamento.oraFineAppuntamento}
                                <Button outline color="success"
                                        style={{ marginLeft: "20%", width: "20%" }}
                                        onClick={() => {
                                            let element = document.getElementById("dettagliPrenotazione" + index);
                                            if (element?.style.display === "none") {
                                                element?.setAttribute("style", "display:block")
                                            } else {
                                                element?.setAttribute("style", "display:none")
                                            }

                                        }}>
                                    Dettagli
                                </Button>
                                <hr />
                            </li>
                            <div id={"dettagliPrenotazione" + index} style={{ display: "none" }}>
                                <RiepilogoAppuntamento appuntamento={appuntamento} displayButtonPartecipa="none"/>
                            </div>
                        </>
                    )
                })}
            </ul>
        )
    }else{
        return <p>Non hai ancora effettuato nessuna prenotazione</p>
    }


}