import React from 'react';
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper";
import {
    Container,
    Col,
    Row,
    Jumbotron,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const {user : {firstName, lastName, email, phone, _id}} = isAuthenticated();
    console.log(firstName);

    return(
        <Base>
            <Container fluid>
                <Row className="mt-4 p-3">
                    <Col md={{size : "6", offset : "3"}}>
                        <Jumbotron className="jumbotron-custom" >
                            <h2 className="display-5 text-center">Welcome {firstName}!</h2>
                            <hr className="my-2" />
                            <Row>
                                <Col md={{size : "4", offset : "2"}} >First Name : </Col>
                                <Col md="6">{firstName}</Col>
                            </Row>
                            <Row>
                                <Col md={{size : "4", offset : "2"}} >Last Name : </Col>
                                <Col md="6">{lastName}</Col>
                            </Row>
                            <Row>
                                <Col md={{size : "4", offset : "2"}} >Email : </Col>
                                <Col md="6">{email}</Col>
                            </Row>
                            <Row>
                                <Col md={{size : "4", offset : "2"}} >Phone : </Col>
                                <Col md="6">{phone}</Col>
                            </Row>
                            <Row>
                                <Col   md="6">
                                    <Button color="primary" className="mt-4" tag={Link} to={`/user/${_id}/update`}>Update Details</Button>
                                </Col>
                                <Col  md="6" >
                                    <Button color="primary" className="mt-4" tag={Link} to={`/user/${_id}/signup-as-donor`}>Signup As Donor</Button>
                                </Col>
                            </Row>
                            
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default UserDashboard;