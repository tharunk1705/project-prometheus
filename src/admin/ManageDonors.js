import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Base from "../core/Base";
import {  getDonors } from './helper/adminApiCalls';
import { Button, Row, Col, Jumbotron } from 'reactstrap';


const ManageDonors = () => {

    const [donors, setDonors] = useState([]);

    const preload = () => {
        getDonors()
        .then((data) => {
            if(data.error) {
                console.log(data.error);
            }else {
                setDonors(data);
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    return(
       <Base>
            <Row>
                <Col md={{size  : 6, offset : 3}} className="text-left">
                    <Jumbotron className="jumbotron-custom" >
                        <h1 className="display-5 text-center pb-2">Manage Donors</h1>
                        <hr className="my-2" />
                        <Row>
                            <Col>
                                <h2 className="text-center text-white my-3">Total {donors.length} donors</h2>
                                <Row>
                                    <Col md="4"  className="text-center">
                                        <h3>Name</h3>
                                    </Col>
                                    <Col md="4"  className="text-center">
                                        <h3>Location</h3>
                                    </Col>
                                    <Col md="4"  className="text-center">
                                        
                                    </Col>
                                </Row>
                                <hr className="my-2" />
                                {donors.map((donor, index) =>{
                                    return (
                                        <div key={index}>
                                            <Row >
                                                <Col md="4">
                                                    <h5 className="text-white text-center">{donor.firstName}</h5>
                                                </Col>
                                                <Col md="4">
                                                    <Button className="btn btn-primary disabled" size="sm" >
                                                    {donor.location}
                                                    </Button>
                                                </Col>
                                                <Col md="4">
                                                    <Button
                                                        className="btn btn-danger"
                                                        size="sm"
                                                    >
                                                        Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <hr className="my-2" />
                                        </div>
                                    );
                                }
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{size  : 6, offset : 3}} className="text-left">
                                <Button 
                                    tag={Link} 
                                    to={`/admin/dashboard`}
                                    className="btn btn-primary mt-4"
                                >Back to Admin Dashboard</Button>
                            </Col>
                        </Row>
                    </Jumbotron>
                </Col>
            </Row>
       </Base>
    );
}

export default ManageDonors;