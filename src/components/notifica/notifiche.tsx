/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './notifiche.css';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDettagliNotificha, notificheSelector, setNotificaLetta } from '../../store/notificheSlice';
import { useHistory } from 'react-router';


export const Notifiche: React.FC = () => {

    const notifiche = useSelector(notificheSelector);
    const history = useHistory()
    const dispatch = useDispatch();
    
    const onLinkClick = (idEvento: number, tipoEventoNotificabile: string, idNotifica: number) => {
        dispatch(fetchDettagliNotificha(idEvento, tipoEventoNotificabile))
        dispatch(setNotificaLetta(idNotifica))
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
                            let opacity = 1;
                            if(notifica.letta) opacity = 0.7
                            return (
                                <a className="content"
                                   key={notifica.idNotifica}
                                   onClick={() => onLinkClick(notifica.idEvento, notifica.tipoEventoNotificabile, notifica.idNotifica)}>

                                    <div className="notification-item" style={{opacity : opacity}}>
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