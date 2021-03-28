import React, {useState} from 'react';
import Base from "../core/Base";
import {signupasdonor} from "../auth/helper"
import { Button, Form, FormGroup, Label, Input, Row, Col, Jumbotron } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignupAsDonor = () => {
    const [values, setValues] = useState({
        firstName : "",
        lastName : "",
        email : "",
        phone : "",
        infor : "",
        location : "",
        isAvailable : true,
        lastDonation : "",
        error : "",
        success : false
    });

    const { firstName, lastName, email, location, phone, isAvailable, info, lastDonation, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error : false, [name] : event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        setValues({...values, error : false});
        signupasdonor({firstName, lastName, email,info, location, phone, isAvailable, lastDonation})
            .then( data => {
                if(data.error) {
                    setValues({...values, error : data.error, success : false});
                    message(error);
                }else {
                    setValues({
                        ...values,
                        firstName : "",
                        lastName : "",
                        info : "",
                        isAvailable : true,
                        category : "",
                        location : "",
                        lastDonation : "",
                        email : "",
                        phone : "",
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
                                <Label className="text-light" for="firstName">First Name :</Label>
                                <Input 
                                    type="text" 
                                    name="firstName" 
                                    id="firstName" 
                                    placeholder="Enter Minimum 3 character" 
                                    onChange={handleChange("firstName")}
                                    value={firstName}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="lastName">Last Name :</Label>
                                <Input 
                                    type="text" 
                                    name="lastName" 
                                    id="lastName" 
                                    placeholder="Enter Minimum 3 character" 
                                    onChange={handleChange("lastName")}
                                    value={lastName}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="email">Email :</Label>
                                <Input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder="example@example.com" 
                                    onChange={handleChange("email")}
                                    value={email}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="phone">Phone :</Label>
                                <Input 
                                    type="tel" 
                                    name="phone" 
                                    id="phone" 
                                    placeholder="9876543210" 
                                    onChange={handleChange("phone")}
                                    value={phone}
                                    disabled
                                />
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
                                <Input 
                                    type="radio" 
                                    name="isAvailable" 
                                    id="notAvailable" 
                                    onChange={handleChange("isAvailable")}
                                    value={false}
                                    className="ml-2"
                                />
                                <Input 
                                    type="radio" 
                                    name="isAvailable" 
                                    id="Available" 
                                    onChange={handleChange("isAvailable")}
                                    value={true}
                                    className="ml-4"
                                />
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