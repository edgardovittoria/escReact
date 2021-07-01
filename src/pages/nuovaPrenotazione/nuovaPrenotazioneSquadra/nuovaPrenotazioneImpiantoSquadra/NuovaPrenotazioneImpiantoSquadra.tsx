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

export const NuovaPrenotazioneImpiantoSquadra: React.FC = () => {

    const dispatch = useDispatch()
    
    

    const squadra = useSelector(squadraSelector).squadraSelezionata
    const sportivoAutenticato = useSelector(sportivoAutenticatoSelector)

    useEffect(() => {
        //dispatch(resetListaInvitabili())
        dispatch(resetListaSportPraticabili())
        dispatch(avviaNuovaPrenotazione(sportivoAutenticato.sportivo.email, squadra.idSquadra, "IMPIANTO", "SQUADRA"))
    }, [])

    


    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                    <RiepilogoSquadra nome={squadra.nome}
                        sport={squadra.sport.nome} />
                        <div className="col-8">
                            <Label>PRENOTAZIONE IMPIANTO</Label>
                            <TabNuovaPrenotazioneSquadra sport={squadra.sport.nome}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}