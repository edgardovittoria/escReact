import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { AppuntamentiSottoscrivibili } from '../nuovaPrenotazioneComponent/prenotazioneImpianto/AppuntamentiSottoscrivibiliComponent';
import { useSelector } from 'react-redux';
import { prenotazioneSelector } from '../../store/prenotazioneSlice';
import { FormPrenotazioneImpiantoSquadraRicorrente } from '../nuovaPrenotazioneSquadraComponent/FormPrenotazioneImpiantoSquadraRicorrente';

export const TabNuovaPrenotazioneSquadraComponent: React.FC = () => {
    const [activeTab, setActiveTab] = useState('1');
    const prenotazione = useSelector(prenotazioneSelector)

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
                    <FormPrenotazioneImpiantoSquadraRicorrente/>
                </TabPane>
                <TabPane tabId="2">
                    <AppuntamentiSottoscrivibili appuntamenti={prenotazione.appuntamentiSottoscrivibiliSquadra} />
                </TabPane>
            </TabContent>
        </>
    )
}