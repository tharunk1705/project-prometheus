import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
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

                                {donors.map((donor, index) =>{
                                    return (
                                        <Row key={index}>
                                            <Col md="4">
                                                <h2 className="text-white text-left">{donor.firstName}</h2>
                                            </Col>
                                        </Row>
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