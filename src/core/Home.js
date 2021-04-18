import React from 'react';
import "../styles.css";
import Base from "./Base";
import main from "./main.png";
import {
    Col,
    Row,
    Jumbotron,
    Button
} from 'reactstrap';

const Home = () => {


    return (
        <Base>
            <Row className="mt-4 home-row">
                <Col md="6">
                    <Jumbotron className="jumbotron-custom" >
                        <h2>Welcome to your LYFLINE!</h2>
                        <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor explicabo, illo impedit pariatur temporibus, in, perspiciatis facilis rem ut sequi ad consequatur praesentium modi! Alias aliquid pariatur inventore impedit cupiditate.</p>
                        <hr className="my-2" />
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure quia odio dignissimos illo quas esse, sunt sint aliquid impedit nemo sequi repellendus, rem voluptates qui ab suscipit officiis vitae aliquam.</p>
                        <p className="lead">
                            <Button color="primary">Learn More</Button>
                        </p>
                    </Jumbotron>
                </Col>
                <Col md={{size : 5, offset : 1}}>
                    <img src={main} className="img-fluid" alt="Blood Donation" />
                </Col>
            </Row>
        </Base>
    );
}

export default Home;