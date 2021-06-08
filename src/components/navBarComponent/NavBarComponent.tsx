/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { addSquadraSelezionata, squadraSelector } from '../../store/squadraSlice';
import { Notifiche } from '../notificaComponent/notificheComponent';

export const NavBar: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const utenteAutenticato = useSelector(sportivoAutenticatoSelector);
    const [displayFunzioniDirettore, setDisplayFunzioniDirettore] = useState("none");
    const squadre = useSelector(squadraSelector).squadre
    //in questo caso lo stato iniziale deve essere "none"
    const [displayFunzioniSquadra, setDisplayFunzioniSquadra] = useState("none");
    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {
        if(squadre.length !== 0){
            setDisplayFunzioniSquadra("flex")
        }

    }, [squadre])

    useEffect(() => {
        utenteAutenticato.sportivo.ruoli.map(ruolo => {
            if (ruolo === "DIRETTORE") {
                setDisplayFunzioniDirettore("flex")
            }
        })
    }, [])

    

    return (
        <>
            <Navbar color="dark" light expand="md">
                <NavbarBrand href="/" style={{color: "white"}}>esc</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem style={{padding: "5px", borderLeft: "2px solid white"}}>
                            <NavLink href="http://localhost:3000/profiloSportivo" style={{color: "white"}}>Profilo Sportivo</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar
                            style={{ display: displayFunzioniSquadra, marginLeft: "10px", padding: "5px"}}>
                            <DropdownToggle nav caret style={{color: "white"}}>
                                Squadre
                            </DropdownToggle>
                            <DropdownMenu right>
                                {squadre.map((squadra) => {
                                    return(
                                        <DropdownItem onClick={() => {
                                            dispatch(addSquadraSelezionata(squadra))
                                            history.push("/profiloSquadra")
                                        }}>{squadra.nome}</DropdownItem>
                                    )
                                })}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar
                            style={{ display: displayFunzioniDirettore, marginLeft: "10px", padding: "5px"}}>
                            <DropdownToggle nav caret style={{color: "white"}}>
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