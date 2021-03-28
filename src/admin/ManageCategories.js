import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from "../core/Base";
import { deleteCategory, getCategories } from './helper/adminApiCalls';
import { Button, Row, Col, Jumbotron } from 'reactstrap';


const ManageCategories = () => {

    const [categories, setCategories] = useState([]);
    const {user, token} = isAuthenticated();

    const preload = () => {
        getCategories()
        .then((data) => {
            if(data.error) {
                console.log(data.error);
            }else {
                setCategories(data);
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    const handleDeleteCategory = categoryId => {
        deleteCategory(categoryId, user._id, token)
            .then(data => {
                if(data.error) {
                    console.log(data.error);
                }else{
                    preload();
                }
            })
    }

    return(
       <Base>
            <Row>
                <Col md={{size  : 6, offset : 3}} className="text-left">
                    <Jumbotron className="jumbotron-custom" >
                        <h1 className="display-5 text-center pb-2">Manage Categories</h1>
                        <hr className="my-2" />
                        <Row>
                            <Col>
                                <h2 className="text-center text-white my-3">Total {categories.length} categories</h2>

                                {categories.map((category, index) =>{
                                    return (
                                        <Row key={index}>
                                            <Col md="4">
                                                <h2 className="text-white text-left">{category.name}</h2>
                                            </Col>
                                            <Col md="4">
                                                <Button tag={Link} className="btn btn-primary" to={`/admin/category/update/${category._id}`} >
                                                    Update
                                                </Button>
                                            </Col>
                                            <Col md="4">
                                                <Button
                                                    onClick={() => {
                                                        handleDeleteCategory(category._id)
                                                    }}
                                                    className="btn btn-danger"
                                                >
                                                    Delete
                                                </Button>
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

export default ManageCategories;