import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { FormPrenotazioneImpiantoRicorrente } from '../nuovaPrenotazioneComponent/prenotazioneImpianto/FormPrenotazioneImpiantoRicorrenteComponent';
import { AppuntamentiSottoscrivibili } from '../nuovaPrenotazioneComponent/prenotazioneImpianto/AppuntamentiSottoscrivibiliComponent';
import { useSelector } from 'react-redux';
import { prenotazioneSelector } from '../../store/prenotazioneSlice';
import { TablePrenotazioni } from '../profiloSportivoComponent/TablePrenotazioniEffettuateComponent';
import { Prenotazione } from '../../model/Prenotazone';
import { Sportivo } from '../../model/Sportivo';
import { Appuntamento } from '../../model/Appuntamento';
import { TablePartecipazioni } from '../profiloSportivoComponent/TablePartecipazioniComponent';

export type TabRiepilogoPrenotazioniProps = {
    prenotazioniEffettuate: Prenotazione[]
    partecipazioni: Appuntamento[]
    corsiPrenotati: Prenotazione[]
    sportivoAutenticato: Sportivo
}

export const TabRiepilogoPrenotazioni: React.FC<TabRiepilogoPrenotazioniProps> = ({ prenotazioniEffettuate, partecipazioni, corsiPrenotati, sportivoAutenticato }) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab: string) => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    return (
        <>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        PRENOTAZIONI EFFETTUATE
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        ISCRIZIONI AD UNA PRENOTAZIONE ESISTENTE
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        ISCRIZIONI AI CORSI
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <TablePrenotazioni prenotazioniEffettuate={prenotazioniEffettuate}
                        sportivoAutenticato={sportivoAutenticato} />
                </TabPane>
                <TabPane tabId="2">
                    <TablePartecipazioni partecipazioni={partecipazioni}
                        sportivoAutenticato={sportivoAutenticato} />
                </TabPane>
                <TabPane tabId="3">
                    <div>corsi prenotati</div>
                </TabPane>
            </TabContent>
        </>
    )
}