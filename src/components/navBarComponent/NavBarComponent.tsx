/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, UncontrolledDropdown } from 'reactstrap';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { Notifiche } from '../notificaComponent/notificheComponent';

export const NavBar: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const utenteAutenticato = useSelector(sportivoAutenticatoSelector);
    const [displayFunzioniDirettore, setDisplayFunzioniDirettore] = useState("none");
    useEffect(() => {
        utenteAutenticato.sportivo.ruoli.map(ruolo => {
            if (ruolo === "DIRETTORE") {
                setDisplayFunzioniDirettore("flex")
            }
        })
    }, [])

    return (
        <>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">esc</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {/* <NavItem>
                            <NavLink href="/components/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem> */}
                        <UncontrolledDropdown nav inNavbar
                            style={{ display: displayFunzioniDirettore }}>
                            <DropdownToggle nav caret>
                                Funzioni Direttore
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href="/creazioneCorso">
                                    Creazione Corsi
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav>
                        <Notifiche utenteAutenticato={utenteAutenticato} />
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    )
}