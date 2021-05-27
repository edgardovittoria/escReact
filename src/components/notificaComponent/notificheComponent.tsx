import React from 'react';
import './notifiche.css';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SportivoAutenticatoState } from '../../store/sportivoAutenticatoSlice';
import { useSelector } from 'react-redux';
import { notificheSelector } from '../../store/notificheSlice';

type NotificheProps = {
    utenteAutenticato: SportivoAutenticatoState
}

export const Notifiche: React.FC<NotificheProps> = ({ utenteAutenticato }) => {

    const notifiche = useSelector(notificheSelector);

    if (notifiche.notifiche.length !== 0) {
        return (
            <div className="dropdown">
                <a id="dLabel" role="button" data-toggle="dropdown" data-target="#" href="/page.html">
                    <i className="glyphicon glyphicon-bell"><FontAwesomeIcon icon={faBell} /></i>
                </a>

                <ul className="dropdown-menu notifications" role="menu" aria-labelledby="dLabel">
                    <div className="notification-heading"><h4 className="menu-title">Notifications</h4><h4 className="menu-title pull-right">View all<i className="glyphicon glyphicon-circle-arrow-right"></i></h4>
                    </div>
                    <li className="divider"></li>
                    <div className="notifications-wrapper">
                    {notifiche.notifiche.map(notifica => {
                        return(
                            <a className="content" href="#">

                            <div className="notification-item">
                                <h4 className="item-title">{notifica.mittente}</h4>
                                <p className="item-info">{notifica.messaggio}</p>
                            </div>

                        </a>
                        )
                    })}
                    </div>
                    <li className="divider"></li>
                    <div className="notification-footer"><h4 className="menu-title">View all<i className="glyphicon glyphicon-circle-arrow-right"></i></h4></div>
                </ul>

            </div>
        )
    } else {
        return (
            <div className="dropdown">
                <a id="dLabel" role="button" data-toggle="dropdown" data-target="#" href="/page.html">
                    <i className="glyphicon glyphicon-bell"><FontAwesomeIcon icon={faBell} /></i>
                </a>
                <ul className="dropdown-menu notifications" role="menu" aria-labelledby="dLabel">
                    <div>Nessuna notifica presente</div>
                </ul>
            </div>
        )
    }



}