import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from "../core/Base";
import { createCategory} from "./helper/adminApiCalls";
import { Button, Form, FormGroup, Input, Row, Col, Jumbotron } from 'reactstrap';
const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    const goBack = () => {
        return(

            <Button color="primary" tag={Link}  className="btn btn-sm btn-info mb-3" to="/admin/dashboard">Admin Home</Button>
        )
    }

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        // backend request fired
        createCategory(user._id, token, {name})
            .then(data => {
                if(data.error) {
                    setError(true);
                }else{
                    setError(false);
                    setSuccess(true);
                    setName("");
                }
            })
    }

    const successMessage = () => {
        if(success)  {
            return (
                <h4 className="text-success">Category Created Successfully</h4>
            )
        }
    }

    const warningMessage = () => {
        if(error) {
            return(
                <h4 className="text-danger">Failed to create category</h4>
            )
        }

    }

    const myCategoryForm = () => (
        <Form>
            <FormGroup>
                <p className="lead">Enter the category</p>
                <Input 
                    type="text"  
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder="For Eg. Summer Collection"
                />
                <Button 
                    color="primary"
                    onClick={handleSubmit}
                >
                    Create Category
                </Button>
            </FormGroup>
        </Form>
    )

    return(
        <Base>
            {successMessage()}
            {warningMessage()}
            <Row className="signup-row">
                <Col md={{size  : 6, offset : 3}} className="text-left">
                    <Jumbotron className="jumbotron-custom">
                        {myCategoryForm()}
                        {goBack()}
                    </Jumbotron>
                </Col>
            </Row>
        </Base>
    )

}

export default AddCategory;