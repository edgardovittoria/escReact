import React from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import { NavLink as NavLinkRouter } from 'react-router-dom';
import { UtentePolisportiva } from '../../model/UtentePolisportiva';


export const RiepilogoUtente: React.FC<UtentePolisportiva> = ({ nome, cognome, email, ruoli, attributiExtra }) => {
    
    return (
        <Card className="col-4" style={{ height: "min-content" }}>
            <CardImg
                src="/assets/img/avatarProfilo.png"
                alt="Avatar Sportivo"
            />
            <CardBody>
                <CardTitle>
                    {nome} {cognome}
                </CardTitle>
                <CardSubtitle>{email}</CardSubtitle>
                <CardText style={{marginTop: "20px"}}>
                    Sport Praticati
                    <ListGroup>
                        {(attributiExtra.sportPraticati).map(sport => {
                            return(
                                <ListGroupItem>{sport}</ListGroupItem>
                            )
                        })}
                    </ListGroup>
                </CardText>
            </CardBody>
        </Card>
    )
}