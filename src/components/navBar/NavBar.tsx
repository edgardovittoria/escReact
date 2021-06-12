/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, UncontrolledDropdown } from 'reactstrap';
import { sportivoAutenticatoSelector } from '../../store/sportivoAutenticatoSlice';
import { addSquadraSelezionata, squadraSelector } from '../../store/squadraSlice';
import { Notifiche } from '../notifica/notifiche';

export const NavBar: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const utenteAutenticato = useSelector(sportivoAutenticatoSelector);
    const [displayFunzioniDirettore, setDisplayFunzioniDirettore] = useState("none");
    const squadre = useSelector(squadraSelector).squadre
    //in questo caso lo stato iniziale deve essere "none"
    const [displayFunzioniSquadra, setDisplayFunzioniSquadra] = useState("none");
    const [displayItem, setDisplayItem] = useState("none");
    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {
        if (squadre.length !== 0) {
            setDisplayFunzioniSquadra("flex")
        }

    }, [squadre])

    useEffect(() => {
        if (utenteAutenticato.sportivo.nome === "") {
            setDisplayFunzioniDirettore("none")
            setDisplayFunzioniSquadra("none")
            setDisplayItem("none")
        } else {
            setDisplayItem("block")
        }
        utenteAutenticato.sportivo.ruoli.map(ruolo => {
            if (ruolo === "DIRETTORE") {
                setDisplayFunzioniDirettore("flex")
            }
        })
    }, [utenteAutenticato])



    return (
        <>
            <Navbar color="dark" light expand="md">
                <NavbarBrand href="/" style={{ color: "white" }}>esc</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar style={{borderLeft: "2px solid white"}}>
                    <Nav className="mr-auto" navbar>    
                        <UncontrolledDropdown nav inNavbar
                            style={{ display: displayFunzioniSquadra, marginLeft: "10px", padding: "5px" }}>
                            <DropdownToggle nav caret style={{ color: "white" }}>
                                Squadre
                            </DropdownToggle>
                            <DropdownMenu right 
                                style={{backgroundColor: "#343A40"}}>
                                {squadre.map((squadra) => {
                                    return (
                                        <DropdownItem
                                            key={squadra.idSquadra}
                                            style={{color: "white"}}
                                            onClick={() => {
                                                dispatch(addSquadraSelezionata(squadra))
                                                history.push("/profiloSquadra")
                                            }}>{squadra.nome}</DropdownItem>
                                    )
                                })}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar
                            style={{ display: displayFunzioniDirettore, marginLeft: "10px", padding: "5px" }}>
                            <DropdownToggle nav caret style={{ color: "white" }}>
                                Funzioni Direttore
                            </DropdownToggle>
                            <DropdownMenu right 
                                style={{backgroundColor: "#343A40", color: "white"}}>
                                <DropdownItem href="/creazioneCorso" style={{color: "white"}}>
                                    Creazione Corsi
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav style={{display: displayItem}}>
                        <Notifiche utenteAutenticato={utenteAutenticato} />
                    </Nav>
                    <Nav>
                        <UncontrolledDropdown nav inNavbar
                            style={{ marginLeft: "10px", padding: "0px", display: displayItem }}>
                            <DropdownToggle nav caret style={{ color: "white" }} id="dropdownImgProfilo">
                                <img src="/assets/img/avatarProfilo.png" alt="immagine Profilo"
                                id="imgProfilo" />
                            </DropdownToggle>
                            <DropdownMenu right
                                style={{backgroundColor: "#343A40"}}>
                                <DropdownItem href="/profiloSportivo"
                                    style={{color: "white"}}>
                                    Profilo
                                </DropdownItem>
                                <DropdownItem href="/"
                                    style={{color: "white"}}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>


                </Collapse>
            </Navbar>
        </>
    )
}