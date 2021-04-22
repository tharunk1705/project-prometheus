import React, {useState} from 'react';
import Base from "../core/Base";
import { Button, Form, FormGroup, Label, Input, Row, Col, Jumbotron } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createResource} from "./helper/userApiCalls";
import { isAuthenticated } from '../auth/helper';

const CreateResource = () => {
    const {user} = isAuthenticated();
    let userId = user._id.toString();
    const [values, setValues] = useState({
        resourceName : "",
        resourceProvider : "",
        location : "",
        contactNumber : "",
        city : "",
        units : "",
        isFulfilled : false,
        providerUserId : userId,
        date : "",
        error : "",
        success : false
    });

   
    const { resourceName,
            resourceProvider, 
            location, 
            contactNumber, 
            city, 
            units,
            isFulfilled,
            providerUserId,
            date,
            error,
            success
        } = values;

    const handleChange = name => event => {
        setValues({...values, error : false, [name] : event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        setValues({...values, error : false});

        createResource({
            resourceName,
            resourceProvider, 
            location, 
            contactNumber, 
            city, 
            units,
            isFulfilled,
            providerUserId,
            date
        })
        .then(data => {
            if(data.error) {
                setValues({...values, error : data.error, success : false});
                message(error);
            }else {
                setValues({
                    ...values,
                    resourceName : "",
                    resourceProvider : "",
                    location : "",
                    contactNumber : "",
                    city : "",
                    units : "",
                    isFulfilled : false,
                    providerUserId : null,
                    date : "",
                    error : "",
                    success : false
                });
                message(success);
            }
        })
        .catch(err =>  console.log(err));
    }

    const message = (error) => {
        if(error) {
            toast.error(error, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else {
            toast.success('Successfully Created Resource!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            
        }
    }


    const createResourceForm = () => {
        return(
            <Row className="signup-row">
                <Col md={{size  : 6, offset : 3}} className="text-left">
                    <Jumbotron className="jumbotron-custom" >
                        <h1 className="display-5 text-center pb-2">Create Resource!</h1>
                        <hr className="my-2" />
                        <Form>
                            <FormGroup>
                                <Label className="text-light" for="resourceName">Resource Name:</Label>
                                <Input 
                                    type="text" 
                                    name="resourceName" 
                                    id="resourceName" 
                                    placeholder="Enter Minimum 3 character" 
                                    onChange={handleChange("resourceName")}
                                    value={resourceName}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="resourceProvider">Resource Provider :</Label>
                                <Input 
                                    type="text" 
                                    name="resourceProvider" 
                                    id="resourceProvider" 
                                    placeholder="Enter Minimum 3 character" 
                                    onChange={handleChange("resourceProvider")}
                                    value={resourceProvider}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="location">Address :</Label>
                                <Input 
                                    type="text" 
                                    name="location" 
                                    id="location" 
                                    placeholder="Type the address where resource is available" 
                                    onChange={handleChange("location")}
                                    value={location}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="contactNumber">Contact Number :</Label>
                                <Input 
                                    type="tel" 
                                    name="contactNumber" 
                                    id="contactNumber" 
                                    placeholder="Eg. 9876543210" 
                                    onChange={handleChange("contactNumber")}
                                    value={contactNumber}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="city">City :</Label>
                                <Input 
                                    type="text" 
                                    name="city" 
                                    id="city" 
                                    placeholder="Eg. Chennai | Bangalore | Mumbai" 
                                    onChange={handleChange("city")}
                                    value={city}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="text-light" for="units">Quantity :</Label>
                                <Input 
                                    type="text" 
                                    name="units" 
                                    id="units" 
                                    placeholder="Type here the units/no. of resources available" 
                                    onChange={handleChange("units")}
                                    value={units}
                                />
                            </FormGroup>
                            <Button color="primary" onClick={handleSubmit} >Create Resource</Button>
                        </Form>
                    </Jumbotron>
                </Col>
            </Row>
        );
    }

    return(
        <Base>
            <ToastContainer />
            {createResourceForm()}
        </Base>
    );

}

export default CreateResource;