import React from 'react';
import { Button } from 'reactstrap';
import {Prenotazione} from "../../model/Prenotazone";

export interface ListItemCorsoProps {
    index: number
    corso: Prenotazione
}

export const ListItemCorso: React.FC<ListItemCorsoProps> = ({corso, index}) => {
    return(
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
    )
}

