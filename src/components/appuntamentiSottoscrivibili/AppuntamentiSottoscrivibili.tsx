import React from 'react';
import { Button } from 'reactstrap';
import { Appuntamento } from '../../model/Appuntamento';
import { RiepilogoAppuntamento } from './RiepilogoAppuntamento'

export type AppuntamentiSottoscrivibiliProps = {
    appuntamenti: Appuntamento[] | undefined
}

export const AppuntamentiSottoscrivibili: React.FC<AppuntamentiSottoscrivibiliProps> = ({ appuntamenti }) => {



    if (appuntamenti?.length === 0) {
        return (
            <h4 style={{ marginTop: "200px", fontWeight: "normal" }}>Al momento non sono presenti appuntamenti a cui potersi iscrivere</h4>
        )
    } else {
        return (
            <ul style={{ textAlign: "left", marginTop: "20px" }}>
                {appuntamenti?.map((appuntamento, index) => {
                    return (
                        <>
                            <li key={index} style={{ marginTop: "20px" }}>
                                {appuntamento.sportAssociato.nome.toUpperCase()} {appuntamento.dataAppuntamento} {appuntamento.oraInizioAppuntamento} {appuntamento.oraFineAppuntamento}
                                <Button outline color="success"
                                    style={{ marginLeft: "20%", width: "20%" }}
                                    onClick={() => {
                                        let element = document.getElementById("riepilogoAppuntamento"+index);
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
                            <div id={"riepilogoAppuntamento"+index} style={{display: "none"}}>
                                <RiepilogoAppuntamento appuntamento={appuntamento} displayButtonPartecipa="block"/>
                            </div>

                        </>
                    )
                })}
            </ul>

        )
    }


}