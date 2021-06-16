import React from 'react';
import {UtentePolisportiva} from "../../../model/UtentePolisportiva";
import {Appuntamento} from "../../../model/Appuntamento";
import {Button} from "reactstrap";
import {RiepilogoAppuntamento} from "../../../components/appuntamentiSottoscrivibili/RiepilogoAppuntamento";

interface CalendarioSportivoProps {
    sportivo: UtentePolisportiva
}

export const CalendarioSportivo: React.FC<CalendarioSportivoProps> = ({sportivo}) => {
    let appuntamenti: Appuntamento[] = sportivo.attributiExtra.appuntamentiSportivo
    appuntamenti.push(...sportivo.attributiExtra.appuntamentiLezioni)
    appuntamenti.push(...sportivo.attributiExtra.appuntamentiManutentore)
    if(appuntamenti.length !== 0){
        return (
            <ul style={{ textAlign: "left", marginTop: "20px" }}>
                {appuntamenti.map((appuntamento, index) => {
                    return (
                        <>
                            <li key={appuntamento.idAppuntamento} style={{ marginTop: "20px", marginLeft: "20px" }}>
                                <b>{appuntamento.specificaPrenotazione.tipoSpecifica} </b><b>{appuntamento.specificaPrenotazione.sportAssociato.nome.toUpperCase()}</b> {appuntamento.dataAppuntamento} {appuntamento.oraInizioAppuntamento} {appuntamento.oraFineAppuntamento}
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
                                <RiepilogoAppuntamento appuntamento={appuntamento}/>
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