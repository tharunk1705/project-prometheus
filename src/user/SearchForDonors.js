import React, {useState, useEffect} from 'react';
import Base from "../core/Base";
import {Button, Form, FormGroup, Label, Input, Row, Col, Jumbotron } from 'reactstrap';

import { getCategories} from "./helper/userApiCalls";


const SearchForDonors = () => {

    const [values, setValues] = useState({
        categories : [],
        category : "",
        location : "",
        loading : false,
        error : "",
        getRedirect : false,
        formData : ""
    });

    const {categories, category, location, loading, error, getRedirect, formData} = values;

    const preload = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({
                    ...values,
                    error : data.error
                });
            }else {
                setValues({
                    ...values,
                    categories : data,
                    formData : new FormData()
                });
                console.log("CATE",categories);
            }
        })
    }

    useEffect(()=> {
        preload();
    }, []);


    const handleChange = (name) => (event) => {
        const value = event.target.value;
        formData.set(name, value);
        setValues({...values, [name] : value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error : false});
        console.log(values);
        // TODO: backend to search donor and call via helper
    }

    const searchForm = () => {
        return (
        <Row>
            <Col md={{size  : 6, offset : 3}} className="text-left">
                <Jumbotron className="jumbotron-custom">
                    <h1 className="display-5 text-center pb-2">Search for donors!</h1>
                    <hr className="my-2" />
                    <Form>
                        <FormGroup>
                            <Label for="location">Location</Label>
                            <Input type="text" name="location" id="location" onChange={handleChange("location")} value={location}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Blood type</Label>
                            <Input type="select" name="category" id="category" onChange={handleChange("category")}>
                                <option value="Select">Select</option>
                                {categories && categories.map((category, index) => {
                                    return (
                                    <option key={index} value={category._id}>{category.name}</option>
                                    );
                                })
                                }
                            </Input>
                        </FormGroup>
                        <Button color="primary"  onClick={handleSubmit}>Search</Button>
                    </Form>
                </Jumbotron>
            </Col>
        </Row>
        )
    }

    return (
        <Base>
            <div>
                {searchForm()}
            </div>
        </Base>
    )
}

export default SearchForDonors;

