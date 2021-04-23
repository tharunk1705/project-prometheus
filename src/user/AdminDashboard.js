import React from 'react';
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper";
import {
    Container,
    Col,
    Row,
    Jumbotron,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';



const AdminDashboard = () => {
    const {user : {firstName}} = isAuthenticated();

    return(
        <Base>
            <Container fluid>
                <Row className="mt-4 p-3">
                    <Col md="6">
                        <Jumbotron className="jumbotron-custom" >
                            <h2 className="display-5 text-center">Welcome {firstName}!</h2>
                            <hr className="my-2" />
                            <p className="lead">Admin Dashboard.</p>
                        </Jumbotron>
                    </Col>
                    <Col md="6">
                        <Jumbotron className="jumbotron-custom">
                            <h2 className="display-5 text-center">Admin Navigation</h2>
                            <hr className="my-2" />
                            <ListGroup>
                                <ListGroupItem>
                                    <Link to="/admin/create/category">
                                        Create Category
                                    </Link>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Link to="/admin/categories">
                                        Manage Category
                                    </Link>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Link to="/admin/donors">
                                        Manage Donors
                                    </Link>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Link to="/user/:userId/resource">
                                        Created Resources
                                    </Link>
                                </ListGroupItem>
                            </ListGroup>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default AdminDashboard;