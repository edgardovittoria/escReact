/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './notifiche.css';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SportivoAutenticatoState } from '../../store/sportivoAutenticatoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDettagliNotificha, notificheSelector, setNotificaLetta } from '../../store/notificheSlice';
import { useHistory } from 'react-router';

type NotificheProps = {
    utenteAutenticato: SportivoAutenticatoState
}

export const Notifiche: React.FC<NotificheProps> = ({ utenteAutenticato }) => {

    const notifiche = useSelector(notificheSelector);
    const history = useHistory()
    const dispatch = useDispatch();
    
    const onLinkClick = (idEvento: number, tipoEventoNotificabile: string, idNotifica: number) => {
        dispatch(fetchDettagliNotificha(idEvento, tipoEventoNotificabile, utenteAutenticato.jwt))
        dispatch(setNotificaLetta(idNotifica, utenteAutenticato.jwt))
        history.push("/dettagliNotifica")
    }

    if (notifiche.notifiche.length !== 0) {
        return (
            <div className="dropdown">
                {notifiche.notifiche.filter(notifica => !notifica.letta).length === 0 && (
                    <a id="dLabel" role="button" data-toggle="dropdown">
                        <i className="glyphicon glyphicon-bell"><FontAwesomeIcon icon={faBell}  /></i>
                    </a>
                )}
                {notifiche.notifiche.filter(notifica => !notifica.letta).length !== 0 && (
                    <a id="dLabel" role="button" data-toggle="dropdown">
                        <i className="glyphicon glyphicon-bell" id="iconaNotificheNonLette"><FontAwesomeIcon icon={faBell} /></i>
                    </a>
                )}

                <ul className="dropdown-menu dropdown-menu-right notifications" role="menu" aria-labelledby="dLabel">
                    <div className="notification-heading"><h4 className="menu-title">Notifiche</h4>
                    </div>
                    <li className="divider"/>
                    <div className="notifications-wrapper">
                        {notifiche.notifiche.map(notifica => {
                            return (
                                <a className="content"
                                   key={notifica.idNotifica}
                                   onClick={() => onLinkClick(notifica.idEvento, notifica.tipoEventoNotificabile, notifica.idNotifica)}>

                                    <div className="notification-item">
                                        <h4 className="item-title" style={{color: "black"}}>{notifica.mittente}</h4>
                                        <p className="item-info" style={{color: "black"}}>{notifica.messaggio}</p>
                                    </div>

                                </a>
                            )
                        })}
                    </div>
                    <li className="divider"/>
                </ul>

            </div>
        )
    } else {
        return (
            <div className="dropdown">
                <a id="dLabel" role="button" data-toggle="dropdown" data-target="#" >
                    <i className="glyphicon glyphicon-bell"><FontAwesomeIcon icon={faBell} /></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-right notifications" role="menu" aria-labelledby="dLabel">
                    <div style={{textAlign: "center"}}>Nessuna notifica presente</div>
                </ul>
            </div>
        )
    }



}