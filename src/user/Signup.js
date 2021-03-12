import React, {useState} from 'react';
import Base from "../core/Base";
import {signup} from "../auth/helper"
import { Button, Form, FormGroup, Label, Input, Row, Col, Jumbotron } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [values, setValues] = useState({
        firstName : "",
        lastName : "",
        email : "",
        phone : "",
        password : "",
        error : "",
        success : false
    });

    const { firstName, lastName, email, password, phone, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error : false, [name] : event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        setValues({...values, error : false});
        signup({firstName, lastName, email, password, phone})
            .then( data => {
                if(data.error) {
                    setValues({...values, error : data.error, success : false});
                    message(error);
                }else {
                    setValues({
                        ...values,
                        firstName : "",
                        lastName : "",
                        email : "",
                        phone : "",
                        password : "",
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
                        <h1 className="display-5 text-center pb-2">Signup Here!</h1>
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
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="password">Password :</Label>
                                <Input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="Should be greater than 3 characters" 
                                    onChange={handleChange("password")}
                                    value={password}
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

export default Signup;