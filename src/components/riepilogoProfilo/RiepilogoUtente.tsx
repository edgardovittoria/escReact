import React from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import { UtentePolisportiva } from '../../model/UtentePolisportiva';


export const RiepilogoUtente: React.FC<UtentePolisportiva> = ({ nome, cognome, email, attributiExtra }) => {
    
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
                                <ListGroupItem key={sport}>{sport}</ListGroupItem>
                            )
                        })}
                    </ListGroup>
                </CardText>
            </CardBody>
        </Card>
    )
}