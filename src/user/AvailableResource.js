import React, {useState, useEffect} from 'react';
import Base from "../core/Base";
import { getAllResources} from "../user/helper/userApiCalls";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Jumbotron , Table} from 'reactstrap';

const AvailableResources = () => {
    const [resources, setResources] = useState([]);

    const preload = () => {
        getAllResources()
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

    return(
        <Base>
             <Row>
                 <Col md="12" sm="6">
                    <Jumbotron className="jumbotron-custom " >
                        <h1 className="display-5 text-center pb-2">Available Resources</h1>
                        <div className="table-responsive-sm">
                            <Table className="text-white text-center">
                                <thead className="thead-dark">
                                    <tr>
                                    <th scope="col" className="th-sm">Resource</th>
                                    <th scope="col" className="th-sm">Resource Provider</th>
                                    <th scope="col" className="th-sm">City</th>
                                    <th scope="col" className="th-sm">Address</th>
                                    <th scope="col" className="th-sm">Contact</th>
                                    <th scope="col" className="th-sm">Available Units</th>
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
                                                <td><a  className="btn btn-success button-primary"  href={"tel:"+resource.contactNumber} ><FontAwesomeIcon icon={faPhoneAlt} /> Call</a></td>
                                                <td>{resource.units}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Jumbotron>
                </Col>
             </Row>
        </Base>
     );
}
export default AvailableResources;