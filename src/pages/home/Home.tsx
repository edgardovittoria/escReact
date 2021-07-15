import {Col, Row} from "reactstrap";
import {Login} from "../login/Login";

export const Home = () => {
    return (
        <Row>
            <Col style={{backgroundColor:"#F5EFF5"}}>
                <Login/>
            </Col>
            <Col style={{
                backgroundImage: "url('/assets/img/sportBackground.jpeg')",
                backgroundSize:"cover",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
            }}></Col>
        </Row>
    )
}
