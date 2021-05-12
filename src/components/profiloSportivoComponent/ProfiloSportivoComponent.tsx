/* eslint-disable array-callback-return */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableTennis } from '@fortawesome/free-solid-svg-icons/faTableTennis';
import { faFutbol, faVolleyballBall } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import './profiloSportivo.css';
import { prenotazioniSelector, resetPrenotazioneDaConfermare } from '../../store/prenotazioneSlice';
import { Prenotazione } from '../../model/Prenotazone';




export const ProfiloSportivo: React.FC = () => {

    const dispatch = useDispatch()
    dispatch(resetPrenotazioneDaConfermare())


    const style = {
        display: "block",
        margin: "auto"
    };

    const history = useHistory()
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector);
    const prenotazioniEffettuate = useSelector(prenotazioniSelector);

    return (
        <>
            <div className="img-container">
                <img src="/assets/img/avatarProfilo.png" alt="avatar profilo" />
                <h2>{sportivoAutenticato.sportivo.nome} {sportivoAutenticato.sportivo.cognome}</h2>
                <h3>{sportivoAutenticato.sportivo.email}</h3>
            </div>
            <div className="container">
                <p>Prenota un impianto una lezione o un corso</p>
            </div>
            <div className="btn-container">
                <span></span>
                <button className="btnProfilo" id="prenotazioneLezione" onClick={() => history.push("/nuovaPrenotazioneLezione")}>
                    <FontAwesomeIcon icon={faTableTennis} style={style} />
                    <i></i>LEZIONE
                </button>
                <button className="btnProfilo" id="prenotazioneImpianto" onClick={() => history.push("/nuovaPrenotazioneImpianto")}>
                    <FontAwesomeIcon icon={faFutbol} style={style} />
                    <i></i>IMPIANTO
                </button>

                <button className="btnProfilo" id="prenotazioneCorso">
                    <FontAwesomeIcon icon={faVolleyballBall} style={style} />
                    <i></i>CORSO
                </button>
            </div>
            <h2 style={{ textAlign: "center", marginTop: "50px", marginBottom: "50px" }}>PRENOTAZIONI EFFETTUATE</h2>
            <TablePrenotazioni prenotazioniEffettuate={prenotazioniEffettuate}/>


        </>
    )

}

type TableProsp = {
    prenotazioniEffettuate: Prenotazione[]
}

const TablePrenotazioni: React.FC<TableProsp> = ({ prenotazioniEffettuate }) => {
    if (prenotazioniEffettuate.length !== 0) {
        return (
            <table style={{ marginBottom: "50px" }}>
                <thead>
                    <tr id="label">
                        <th>Sport Prenotato</th>
                        <th>Impianto Prenotato</th>
                        <th>Data</th>
                        <th>Ora Inizio</th>
                        <th>Ora Fine</th>
                        <th>Numero partecipanti</th>
                        <th>Costo totale</th>
                    </tr>
                </thead>
                <tbody>

                    <TableRows prenotazioniEffettuate={prenotazioniEffettuate} />

                </tbody>
            </table>
        )
    } else {
        return <h3 style={{textAlign: "center"}}>Al momento non hai effettuato nessuna prenotazione!!!</h3>
    }
}

const TableRows: React.FC<TableProsp> = ({ prenotazioniEffettuate }) => {
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
                        <th>{appuntamento.listaPartecipanti.length}</th>
                        <th>{appuntamento.specificaPrenotazione.costo} €</th>
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