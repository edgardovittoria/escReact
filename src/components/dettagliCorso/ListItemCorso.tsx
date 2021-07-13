import React from 'react';
import {Button, ListGroupItem} from 'reactstrap';
import {Prenotazione} from "../../model/Prenotazone";

export interface ListItemCorsoProps {
    index: number
    corso: Prenotazione
}

export const ListItemCorso: React.FC<ListItemCorsoProps> = ({corso, index}) => {
    return(
        <ListGroupItem key={index} style={{ marginTop: "20px" }}>
            {corso.appuntamenti[0].sportAssociato.nome.toUpperCase()} {corso.infoGeneraliEvento.costoPerPartecipante}
            <Button outline color="success"
                    style={{ marginLeft: "66%", width: "20%" }}
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
        </ListGroupItem>
    )
}

