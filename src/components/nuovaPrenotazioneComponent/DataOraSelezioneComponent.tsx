import React from 'react';

export const DataOraSelezione: React.FC = () => {
    return (
        <>
            
                <div>
                    <label>PRENOTAZIONE IMPIANTO</label>
                    <div className="container">
                        <form>
                            <div className="container form-group border border-dark rounded">
                                <label>Seleziona Sport</label>
                                <div className="row">
                                    <div className="col-sm">
                                        <div>
                                            <label className="form-check-label">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="sportPraticabile"
                                                    id=""
                                                    checked
                                                />
                                                <div>nome sport</div>

                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-sm" id="postiLiberiContenitore">Posti liberi: <span id="postiLiberi"></span></div>
                                </div>
                            </div>

                            <div
                                className="container border border-dark rounded"
                            >
                                <div className="row">
                                    <div className="col-sm">
                                        <label>Data Prenotazione:</label>

                                        <input
                                            type="date"
                                            id="start"
                                            name="trip-start"
                                            value="2021-03-24"
                                            min="2021-03-24"
                                            max="2021-12-31"
                                        />
                                    </div>

                                    <div className="col-sm">
                                        <label>Orario Inizio Prenotazione:</label>
                                        <input
                                            id="timepickerInizio"
                                            className="timepicker"
                                        />
                                    </div>
                                    <div id="inputFine" className="col-sm">
                                        <label>Orario Fine Prenotazione:</label>
                                        <input
                                            id="timepickerFine"
                                            className="timepicker"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="container form-group border border-dark rounded">
                                <label>Seleziona impianto</label>
                                <select
                                    className="form-control"
                                    name=""
                                    id="selezioneImpianto"
                                >
                                    <option/>
                                </select>
                            </div>
                            <div className="container form-group border border-dark rounded">
                                <label>Invita sportivi alla prenotazione</label>
                                <select
                                    multiple
                                    className="form-control selectpicker"
                                    data-live-search="true"
                                    name=""
                                    id="invitaSportivi"
                                >
                                    <option/>
                                </select>
                            </div>
                            <div id="selectPartecipantiNonIscritti" className="container form-group border border-dark rounded">
                                <label>Numero giocatori non iscritti da associare alla prenotazione</label>

                            </div>
                            <div className="container">
                                <input type="submit"/>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    )
}