import React, {useState, useEffect} from 'react';
import Base from "../core/Base";
import {
    Container,
    Col,
    Row,
    Jumbotron,
    Table
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { isAuthenticated } from '../auth/helper';
import {getMyResources, deleteResource} from "../user/helper/userApiCalls";


const MyResources = () => {
    const [resources, setResources] = useState([]);

    const {user} = isAuthenticated();

    let providerId = user._id;

    const preload = () => {
        getMyResources(providerId)
        .then((data) => {
            if(data.error) {
                console.log(data.error);
            }else {
                setResources(data);
            }
        });
    }

    useEffect(() => {
        preload();
    }, [])

    const handleDeleteResource = resourceId => {
        deleteResource(resourceId, user._id,)
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
            <Container fluid>
                <Row className="mt-4">
                    <Col md="12" sm="6">
                        <Jumbotron className="jumbotron-custom text-center" >
                            <h1 className="display-5 text-center pb-2">Available Resources</h1>
                            <hr className="my-2" />
                            {resources.length === 0 ? <h4>You have not created any Resources</h4> : <div className="table-responsive-sm">
                                <Table className="text-white text-center">
                                    <thead className="thead-dark">
                                        <tr>
                                        <th scope="col" className="th-sm">Resource</th>
                                        <th scope="col" className="th-sm">Resource Provider</th>
                                        <th scope="col" className="th-sm">City</th>
                                        <th scope="col" className="th-sm">Address</th>
                                        <th scope="col" className="th-sm">Available Units</th>
                                        <th scope="col" className="th-sm">Modify</th>
                                        <th scope="col" className="th-sm">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resources.map((resource, index) => {
                                            return(
                                                <tr key={index}>
                                                    <th scope="row">{resource.resourceName}</th>
                                                    <td>{resource.resourceProvider}</td>
                                                    <td>{resource.city}</td>
                                                    <td>{resource.location}</td>
                                                    <td>{resource.units}</td>
                                                    <td><a  className="btn btn-warning button-primary"  href={"tel:"+resource.contactNumber} ><FontAwesomeIcon icon={faPencilAlt} /> Modify</a></td>
                                                    <td><a  className="btn btn-danger button-primary"><FontAwesomeIcon icon={faTrashAlt} onClick={() => {
                                                        handleDeleteResource(resource._id)
                                                    }}/> Delete</a></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>}
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default MyResources;