/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from 'reactstrap';
import { avviaNuovaPrenotazione } from '../../../../store/prenotazioneSlice';
import { sportivoAutenticatoSelector } from '../../../../store/sportivoAutenticatoSlice';
import { resetListaSportPraticabili } from '../../../../store/SportSlice';
import { squadraSelector } from '../../../../store/squadraSlice';
import { RiepilogoSquadra } from '../../../../components/riepilogoProfilo/RiepilogoSquadra';
import { TabNuovaPrenotazioneSquadra } from './components/TabNuovaPrenotazioneSquadra';
import {datiAvviaPrenotazione} from "../../../../model/TipiAusiliari";

export const NuovaPrenotazioneImpiantoSquadra: React.FC = () => {

    const dispatch = useDispatch()

    const squadra = useSelector(squadraSelector).squadraSelezionata
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)

    useEffect(() => {
        //dispatch(resetListaInvitabili())
        dispatch(resetListaSportPraticabili())
        datiAvviaPrenotazione.email = sportivoAutenticato.sportivo.email
        datiAvviaPrenotazione.idSquadra = squadra.idSquadra
        datiAvviaPrenotazione.tipoPrenotazione = "IMPIANTO"
        datiAvviaPrenotazione.modalitaPrenotazione = "SQUADRA"
        dispatch(avviaNuovaPrenotazione(datiAvviaPrenotazione))
        console.log("pippo")
    }, [])


    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                    <RiepilogoSquadra nome={squadra.nome}
                        sport={squadra.sport.nome} />
                        <div className="col-8"
                             style={{backgroundColor:"whitesmoke", padding:"20px"}}
                        >
                            <Label>PRENOTAZIONE IMPIANTO</Label>
                            <TabNuovaPrenotazioneSquadra sport={squadra.sport.nome}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}