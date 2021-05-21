import React from 'react';
import { Appuntamento } from '../../model/Appuntamento';
import { Sportivo } from '../../model/Sportivo';

type TablePartecipazioniProsp = {
    partecipazioni: Appuntamento[],
    sportivoAutenticato: Sportivo
}

export const TablePartecipazioni: React.FC<TablePartecipazioniProsp> = ({ partecipazioni, sportivoAutenticato }) => {
    if (partecipazioni.length !== 0) {
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

                    <TableRows partecipazioni={partecipazioni}
                        sportivoAutenticato={sportivoAutenticato} />

                </tbody>
            </table>
        )
    } else {
        return <h3 style={{ textAlign: "center", marginTop:"80px"}}>Al momento non hai effettuato nessuna prenotazione!!!</h3>
    }
}

const TableRows: React.FC<TablePartecipazioniProsp> = ({ partecipazioni, sportivoAutenticato }) => {
    let tableRow: JSX.Element[] = []
    let index = 0;
    if (partecipazioni.length !== 0) {
        partecipazioni.map((partecipazione) => {
            tableRow.push(
                <tr key={index}>
                    <th>{partecipazione.specificaPrenotazione.sportAssociato.nome}</th>
                    <th>{partecipazione.specificaPrenotazione.pavimentazioneImpianto}</th>
                    <th>{partecipazione.dataAppuntamento}</th>
                    <th>{partecipazione.oraInizioAppuntamento}</th>
                    <th>{partecipazione.oraFineAppuntamento}</th>
                    <th>{partecipazione.partecipanti.length}</th>
                    <th>{partecipazione.specificaPrenotazione.costo} €</th>
                    <th>{partecipazione.quotePartecipazione.filter(quota =>
                        quota.sportivo.email === sportivoAutenticato.email)[0].costo}€</th>
                </tr>
            )
            index++
        })
        return (
            <>
                {tableRow}
            </>
        )

    } else {
        return <tr><th>Al momento non hai effettuato nessuna partecipazione!!!</th></tr>
    }
}