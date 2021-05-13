import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { NuovaPrenotazioneImpianto } from '../nuovaPrenotazioneComponent/prenotazioneImpianto/NuovaPrenotazioneImpiantoComponent';
import { FormPrenotazioneImpiantoRicorrente } from '../nuovaPrenotazioneComponent/prenotazioneImpianto/FormPrenotazioneImpiantoRicorrenteComponent';

export const TabComponent: React.FC = () => {
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
                        NUOVA PRENOTAZIONE
          </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        ISCRIZIONE AD UNA PRENOTAZIONE ESISTENTE
          </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <FormPrenotazioneImpiantoRicorrente />
                </TabPane>
                <TabPane tabId="2">
                    <div>ciao</div>
                </TabPane>
            </TabContent>
        </>
    )
}