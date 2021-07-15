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
    const [displayProfiloSportivo, setDisplayProfiloSportivo] = useState("none");
    const [displayProfiloIstruttore, setDisplayProfiloIstruttore] = useState("none");
    const [displayProfiloManutentore, setDisplayProfiloManutentore] = useState("none");
    const [displayProfili, setDisplayProfili] = useState("none");
    const squadre = useSelector(squadraSelector).squadre
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
            setDisplayProfili("none")
        } else {
            setDisplayItem("block")
            setDisplayProfili("block")
        }
        utenteAutenticato.sportivo.ruoli.map(ruolo => {
            switch (ruolo) {
                case "DIRETTORE":
                    setDisplayFunzioniDirettore("flex")
                    break
                case "SPORTIVO":
                    setDisplayProfiloSportivo("flex")
                    break
                case "ISTRUTTORE":
                    setDisplayProfiloIstruttore("flex")
                    break
                case "MANUTENTORE":
                    setDisplayProfiloManutentore("flex")
                    break
                default:
                    break
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
                                              style={{ marginLeft: "10px", padding: "5px" }}>
                            <DropdownToggle nav caret style={{
                                display: displayProfili,
                                color: "white" }}>
                                Profili
                            </DropdownToggle>
                            <DropdownMenu right
                                          style={{backgroundColor: "#343A40", color: "white"}}>
                                <DropdownItem href="/profiloSportivo" style={{
                                    display: displayProfiloSportivo,
                                    color: "white"}}>
                                    Sportivo
                                </DropdownItem>
                                <DropdownItem href="/profiloIstruttore" style={{
                                    display: displayProfiloIstruttore,
                                    color: "white"}}>
                                    Istruttore
                                </DropdownItem>
                                <DropdownItem href="/profiloManutentore" style={{
                                    display: displayProfiloManutentore,
                                    color: "white"}}>
                                    Manutentore
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
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
                                    Crea Corso
                                </DropdownItem>
                                <DropdownItem href="/aggiungiNuovoImpianto" style={{color: "white"}}>
                                    Aggiungi Nuovo Impianto
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav style={{display: displayItem}}>
                        <Notifiche />
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