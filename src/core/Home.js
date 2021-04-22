import React from 'react';
import "../styles.css";
import Base from "./Base";
import main from "./main.png";

import {
    Col,
    Row,
    Jumbotron
} from 'reactstrap';

const Home = () => {


    return (
        <Base>
            <Row className="mt-4 home-row">
                <Col md="6">
                    <Jumbotron className="jumbotron-custom text-center" >
                        <h2>Welcome to your LYFLINE!</h2>
                        <p className="lead">Donating blood is one of the greatest ways to help humankind. By doing so, we save someone’s precious life, and that is a blessing in itself. There are people who hesitate to donate blood if they aren’t given monetary returns or because of the various myths surrounding it.</p>
                        <hr className="my-2" />
                        <figure className="text-center">
                            <blockquote className="blockquote">
                                <p>"Remember that the happiest people are not those getting more, but those giving more."</p>
                            </blockquote>
                            <figcaption className="blockquote-footer text-white">
                                <cite title="Source Title">H. Jackson Brown Jr.</cite>
                            </figcaption>
                        </figure>
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