import React, {useEffect, useState} from 'react';
import Base from "../core/Base";
import {isAuthenticated, signupasdonor} from "../auth/helper"
import { Button, Form, FormGroup, Label, Input, Row, Col, Jumbotron } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getCategories} from "./helper/userApiCalls";
import 'react-toastify/dist/ReactToastify.css';


const SignupAsDonor = () => {
    const [categories, setCategories] = useState([]);
    const {user, token} = isAuthenticated();
    const userId = user._id;
    const [values, setValues] = useState({
        category : "",
        info : "",
        location : "",
        isAvailable : true,
        lastDonation : "",
        error : "",
        success : false
    });

    const preload = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log("UNABLE TO FETCH CATEGORIES");
            }else {
                setCategories(data);
            }
        })
    }

    const { category, location, isAvailable, info, lastDonation, error, success} = values;

    useEffect(() => {
        preload();
    }, []);


    const handleChange = name => event => {
        setValues({...values, error : false, [name] : event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        setValues({...values, error : false});
        signupasdonor(user._id, token, {userId, category, info, location, isAvailable, lastDonation})
            .then( data => {
                if(data.error) {
                    setValues({...values, error : data.error, success : false});
                    message(error);
                }else {
                    setValues({
                        info : "",
                        isAvailable : true,
                        category : "",
                        location : "",
                        lastDonation : "",
                        error : "",
                        success : false
                    });
                    message(success);
                }
            })
            .catch(err => console.log(err));
    }

    const signUpForm = () => {
        return(
            <Row className="signup-row">
                <Col md={{size  : 6, offset : 3}} className="text-left">
                    <Jumbotron className="jumbotron-custom" >
                        <h1 className="display-5 text-center pb-2">Signup As a Donor!</h1>
                        <hr className="my-2" />
                        <Form>
                            <FormGroup>
                                <Label className="text-light" for="category">Blood Type : </Label>
                                <Input 
                                    type="select" 
                                    onChange={handleChange("category")}
                                >
                                    <option>--Select--</option>
                                    {categories.map((category, index) => {
                                        return(
                                            <option key={index} value={category._id}>{category.name}</option>
                                        );
                                    })}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="location">Location :</Label>
                                <Input 
                                    type="text" 
                                    name="location" 
                                    id="location" 
                                    placeholder="Enter your current location" 
                                    onChange={handleChange("location")}
                                    value={location}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="lastDonation">Last Donation :</Label>
                                <Input 
                                    type="date" 
                                    name="lastDonation" 
                                    id="lastDonation" 
                                    placeholder="Any remarks" 
                                    onChange={handleChange("lastDonation")}
                                    value={lastDonation}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="info">Remarks :</Label>
                                <Input 
                                    type="text" 
                                    name="info" 
                                    id="info" 
                                    placeholder="Any remarks" 
                                    onChange={handleChange("info")}
                                    value={info}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="isAvailable">Available :</Label>
                                <FormGroup check>
                                    <Label check>
                                        <Input 
                                            type="radio" 
                                            name="isAvailable" 
                                            id="notAvailable" 
                                            onChange={handleChange("isAvailable")}
                                            value={false}
                                        />Not Available
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input 
                                            type="radio" 
                                            name="isAvailable" 
                                            id="Available" 
                                            onChange={handleChange("isAvailable")}
                                            value={true}
                                        />Available
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                            <Button color="primary" onClick={handleSubmit} >Signup</Button>
                        </Form>
                    </Jumbotron>
                </Col>
            </Row>
        );
    }
    const message = (error) => {
        if(error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else {
            toast.success('Successfully Signedup!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }



    return (
        <Base>
            <ToastContainer />
            {signUpForm()}
        </Base>
    );
}

export default SignupAsDonor;