import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { Prenotazione } from '../../../model/Prenotazone';
import { Appuntamento } from '../../../model/Appuntamento';
import { TablePartecipazioni } from './TablePartecipazioni';
import { RiepilogoIscrizioneCorsi } from './RiepilogoIscrizioneCorsi';
import { RiepilogoPrenotazioniEffettuate } from './RiepilogoPrenotazioniEffettuate';
import { SportivoAutenticatoState } from '../../../store/sportivoAutenticatoSlice';

export type TabRiepilogoPrenotazioniProps = {
    prenotazioniEffettuate: Prenotazione[]
    partecipazioni: Appuntamento[]
    corsiPrenotati: Prenotazione[]
    sportivoAutenticato: SportivoAutenticatoState
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
                        style={{fontSize: "14px"}}
                    >
                        PRENOTAZIONI EFFETTUATE
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                        style={{fontSize: "14px"}}
                    >
                        ISCRIZIONI AD UNA PRENOTAZIONE ESISTENTE
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                        style={{fontSize: "14px"}}
                    >
                        ISCRIZIONI AI CORSI
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <RiepilogoPrenotazioniEffettuate prenotazioni={prenotazioniEffettuate}/>
                </TabPane>
                <TabPane tabId="2">
                    <TablePartecipazioni partecipazioni={partecipazioni}
                        sportivoAutenticato={sportivoAutenticato.sportivo} />
                </TabPane>
                <TabPane tabId="3">
                    <RiepilogoIscrizioneCorsi corsiPrenotati={corsiPrenotati}/>
                </TabPane>
            </TabContent>
        </>
    )
}