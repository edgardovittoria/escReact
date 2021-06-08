import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import { NavLink as NavLinkRouter } from 'react-router-dom';

type RiepilogoSquadraProps = {
    nome: string,
    sport: string
}

export const RiepilogoSquadra: React.FC<RiepilogoSquadraProps> = ({ nome, sport }) => {
    return (
        <Card className="col-4" style={{ height: "min-content" }}>
            <CardImg
                src="/assets/img/teamIcon.png"
                alt="team icon" />
            <CardBody>
                <CardTitle>
                    {nome}
                </CardTitle>
                <CardText>
                    Sport praticato : {sport}
                </CardText>
            </CardBody>
            <CardBody>
                <NavLinkRouter to="/profiloSquadra">Profilo</NavLinkRouter>
            </CardBody>
        </Card>
    )
}