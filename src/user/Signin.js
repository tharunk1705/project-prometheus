import React, {useState} from 'react';
import Base from "../core/Base";
import { Redirect} from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Row, Col, Jumbotron } from 'reactstrap';
import {signin, authenticate, isAuthenticated} from "../auth/helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {

    const [values, setValues] = useState({
        email : "",
        password : "",
        error : "",
        loading : false,
        didRedirect : false
    });

    const { email, password, error, loading, didRedirect}= values;

    const {user} = isAuthenticated();
    
    const handleChange = name =>  event => {
        setValues({...values, error : false, [name] : event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValues({...values, error : false, loading : true});
        loadingMessage(loading);
        signin({email, password})
            .then(data => {
                if(data.error) {
                    setValues({...values, error : data.error, loading : false});
                    errorMessage(error);     
                }else{
                    authenticate(data, ()=> {
                        setValues({
                            ...values,
                            didRedirect : true
                        });
                    });    
                }
            })
    }

    const performRedirect = () => {

        // TODO: do a redirection here
        if(didRedirect) {
            if(user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/" />
            }
        }
        if(isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const loadingMessage = (message) => {
        if(message) {
            toast.success('Loading!', {
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

    const errorMessage = (message) => {
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
        }
    }

    // const loadingMessage = () => {
    //     return(
    //         loading && (
    //             <div className="alert alert-info">
    //                 <h2>Loading...</h2>
    //             </div>
    //         )
    //     );
    // }

    // const errorMessage = () => {
    //     return(
    //         <div className="row">
    //             <div className="col-md-6 offset-sm-3 text-left">
    //                 <div 
    //                     className="alert alert-danger"
    //                     style={{display : error ? "" : "none"}}
    //                 >
    //                     {error}
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    const signInForm = () => {
        return(
            <Row>
                <Col md={{size  : 6, offset : 3}} className="text-left">
                    <Jumbotron className="jumbotron-custom">
                        <h1 className="display-5 text-center pb-2">Signin Here!</h1>
                        <hr className="my-2" />
                        <Form>
                            <FormGroup>
                                <Label className="text-light" for="email">Email :</Label>
                                <Input 
                                    type="text" 
                                    name="email" 
                                    id="email" 
                                    placeholder="example@example.com" 
                                    onChange={handleChange("email")}
                                    value={email}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="password">Password :</Label>
                                <Input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="Enter your password." 
                                    onChange={handleChange("password")}
                                    value={password}
                                    required
                                />
                            </FormGroup>
                            <Button color="primary" onClick={handleSubmit} >Signin</Button>
                        </Form>
                    </Jumbotron>
                </Col>
            </Row>
        );
    }

    return(
        <Base>
            <ToastContainer />
            {signInForm()}
            {performRedirect()}
        </Base>
    );
}

export default Signin;