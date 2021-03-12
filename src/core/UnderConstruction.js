import React from 'react';
import Base from './Base';
import UnderConstructionImg from "./underConstruction.png";
import {
    Container,
    Col,
    Row,
    Jumbotron,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UnderConstruction = () => {


    return (
        <Base>
            <Container fluid>
                <Row className="mt-4 p-4">
                    <Col md="6">
                        <Jumbotron className="jumbotron-custom" >
                            <h1 className="display-5 text-center">Coming Soon!</h1>
                           <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                           >
                            <Button 
                                    color="primary" 
                                    className="mt-4" 
                                    tag={Link} 
                                    to="/"
                                >
                                    Return to Home
                                </Button>
                           </motion.div>
                        </Jumbotron>
                    </Col>
                    <Col md={{size : 5, offset : 1}}>
                        <img src={UnderConstructionImg} class="img-fluid" alt="Under construction illustration" />
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default UnderConstruction;