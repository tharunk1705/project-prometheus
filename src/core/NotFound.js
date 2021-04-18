import React from 'react';
import Base from './Base';
import NotFoundImg from "./404.png";
import {
    Container,
    Col,
    Row,
    Jumbotron,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {


    return (
        <Base>
            <Container fluid>
                <Row className="mt-4 p-4">
                    <Col md="6">
                        <Jumbotron className="jumbotron-custom" >
                            <h1 className="display-5 text-center">Oops! Page Not Found!</h1>
                            <Button color="primary" className="mt-4" tag={Link} to="/">Return to Home</Button>
                        </Jumbotron>
                    </Col>
                    <Col md={{size : 5, offset : 1}}>
                        <img src={NotFoundImg} className="img-fluid" alt="A 404 illustration" />
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default NotFound;