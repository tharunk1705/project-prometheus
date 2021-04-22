import React from 'react';
import Base from "../core/Base";
import {
    Container,
    Col,
    Row,
    Jumbotron,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faProcedures, faListAlt} from '@fortawesome/free-solid-svg-icons';

const Resources = () => {


    return(
        <Base>
            <Container fluid>
                <Row className="mt-4 p-3">
                    <Col md={{size : "6", offset : "3"}}>
                        <Jumbotron className="jumbotron-custom text-center" >
                            <h1><FontAwesomeIcon icon={faListAlt} /> Resources</h1>
                            <hr className="my-2" />
                            <Row>
                                <Col   md="6">
                                    <Button color="primary" className="mt-4 btn-lg" tag={Link} to={`/resource/available`}><FontAwesomeIcon icon={faProcedures} /> Available Resources</Button>
                                </Col>
                                <Col  md="6" >
                                    <Button color="primary" className="mt-4  btn-lg" tag={Link} to={`/resource/create`}><FontAwesomeIcon icon={faPlusSquare} /> Create Resources</Button>
                                </Col>
                            </Row>
                            
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default Resources;