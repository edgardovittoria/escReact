/* eslint-disable array-callback-return */
import * as React from 'react';
import { Appuntamento } from '../../../../model/Appuntamento';
import { Squadra } from '../../../../model/Squadra';

type CalendarioSquadraProps = {
    appuntamenti: Appuntamento[]
    squadraSelezionata: Squadra
}

export const CalendarioSquadra: React.FC<CalendarioSquadraProps> = ({ appuntamenti, squadraSelezionata }) => {
    if (appuntamenti.length !== 0) {
        return (
            <table style={{ marginBottom: "50px", marginTop: "50px" }}>
                <thead>
                    <tr id="label">
                        <th>Sport Prenotato</th>
                        <th>Impianto Prenotato</th>
                        <th>Data</th>
                        <th>Ora Inizio</th>
                        <th>Ora Fine</th>
                        <th>Costo totale</th>
                        <th>Squadra avversaria</th>
                    </tr>
                </thead>
                <tbody>

                    <TableRows appuntamenti={appuntamenti}
                        squadraSelezionata={squadraSelezionata} />

                </tbody>
            </table>
        )
    } else {
        return <h3 style={{ textAlign: "center", marginTop: "80px" }}>Al momento non hai effettuato nessuna prenotazione!!!</h3>
    }
};

const TableRows: React.FC<CalendarioSquadraProps> = ({ appuntamenti, squadraSelezionata }) => {
    let tableRow: JSX.Element[] = []
    let index = 0;
    appuntamenti.map((appuntamento) => {
        tableRow.push(
            <tr key={index}>
                <th>{appuntamento.sportAssociato.nome}</th>
                <th>{appuntamento.pavimentazioneImpianto}</th>
                <th>{appuntamento.dataAppuntamento}</th>
                <th>{appuntamento.oraInizioAppuntamento}</th>
                <th>{appuntamento.oraFineAppuntamento}</th>
                <th>{appuntamento.costo}</th>
                <th>{appuntamento.squadrePartecipanti.filter((idSquadra) =>
                    squadraSelezionata.idSquadra !== idSquadra)}
                </th>
            </tr>
        )
        index++
    })
    return (
        <>
            {tableRow}
        </>
    )

}