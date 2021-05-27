import React from 'react';
import { Prenotazione } from '../../model/Prenotazone';
import { UtentePolisportiva } from '../../model/UtentePolisportiva';

type TableProsp = {
    prenotazioniEffettuate: Prenotazione[],
    sportivoAutenticato: UtentePolisportiva
}

export const TablePrenotazioni: React.FC<TableProsp> = ({ prenotazioniEffettuate, sportivoAutenticato }) => {
    if (prenotazioniEffettuate.length !== 0) {
        return (
            <table style={{ marginBottom: "50px", marginTop:"80px" }}>
                <thead>
                    <tr id="label">
                        <th>Sport Prenotato</th>
                        <th>Impianto Prenotato</th>
                        <th>Data</th>
                        <th>Ora Inizio</th>
                        <th>Ora Fine</th>
                        <th>Numero partecipanti</th>
                        <th>Costo totale</th>
                        <th>Quota Partecipazione</th>
                    </tr>
                </thead>
                <tbody>

                    <TableRows prenotazioniEffettuate={prenotazioniEffettuate} 
                        sportivoAutenticato={sportivoAutenticato}/>

                </tbody>
            </table>
        )
    } else {
        return <h3 style={{textAlign: "center", marginTop:"80px"}}>Al momento non hai effettuato nessuna prenotazione!!!</h3>
    }
}

const TableRows: React.FC<TableProsp> = ({ prenotazioniEffettuate, sportivoAutenticato }) => {
    let tableRow: JSX.Element[] = []
    let index = 0;
    if (prenotazioniEffettuate.length !== 0) {
        prenotazioniEffettuate.map((prenotazione) => {
            prenotazione.appuntamenti.map((appuntamento) => {
                tableRow.push(
                    <tr key={index}>
                        <th>{appuntamento.specificaPrenotazione.sportAssociato.nome}</th>
                        <th>{appuntamento.specificaPrenotazione.pavimentazioneImpianto}</th>
                        <th>{appuntamento.dataAppuntamento}</th>
                        <th>{appuntamento.oraInizioAppuntamento}</th>
                        <th>{appuntamento.oraFineAppuntamento}</th>
                        <th>{appuntamento.partecipanti.length}</th>
                        <th>{appuntamento.specificaPrenotazione.costo} €</th>
                        <th>{(appuntamento.quotePartecipazione.length !== 0)?appuntamento.quotePartecipazione.filter(quota => 
                            quota.sportivo.email === sportivoAutenticato.email)[0].costo : "in attesa di conferma"}</th>
                    </tr>
                )
                index++
            })
        })
        return (
            <>
                {tableRow}
            </>
        )

    } else {
        return <tr><th>Al momento non hai effettuato nessuna prenotazione!!!</th></tr>
    }
}