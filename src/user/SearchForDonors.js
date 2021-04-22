import React, {useState, useEffect} from 'react';
import Base from "../core/Base";
import {Button, Form, FormGroup, Label, Input, Row, Col, Jumbotron, Table } from 'reactstrap';
import { getCategories, searchDonor} from "./helper/userApiCalls";
import { isAuthenticated } from '../auth/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
// import PlacesAutocomplete, {
//     geocodeByAddress,
//     getLatLng
//   } from "react-places-autocomplete";

const SearchForDonors = () => {

    const [values, setValues] = useState({
        categories : [],
        bloodType : "",
        location : "",
        loading : false,
        error : "",
        getRedirect : false,
        formData : ""
    });

    const [donors, setDonors] = useState([]);

    const { token} = isAuthenticated();

    // const [address, setAddress] = React.useState("");
    // const [coordinates, setCoordinates] = React.useState({
    //     lat: null,
    //     lng: null
    // });

    // const handleSelect = async value => {
    //     const results = await geocodeByAddress(value);
    //     const latLng = await getLatLng(results[0]);
    //     setAddress(value);
    //     setCoordinates(latLng);
    //   };

    const {bloodType, categories, location,  formData} = values;


    useEffect(() => {
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
                    // console.log("CATE",categories);
                }
            })
        }
        preload();
    }, [])


    const handleChange = (name) => (event) => {
        const value = event.target.value;
        formData.set(name, value);
        setValues({...values, [name] : value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error : false});
        searchDonor(token, bloodType, location)
        .then(donor => {
            if(donor.error) {
                console.log(donor.error);
            }else{
                setDonors(donor);
            }
        })
    }

    console.log(donors);

    const searchForm = () => {
        return (
        <Row>
            
            <Col md={{size  : 6}} className="text-left">
                <Jumbotron className="jumbotron-custom">
                    <h1 className="display-5 text-center pb-2">Search for donors!</h1>
                    <hr className="my-2" />
                    <Form>
                        <FormGroup>
                            <Label for="location">Location</Label>
                            {/* <PlacesAutocomplete
                                value={address}
                                onChange={setAddress}
                                onSelect={handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <p>Latitude: {coordinates.lat}</p>
                                    <p>Longitude: {coordinates.lng}</p>

                                    <input {...getInputProps({ placeholder: "Type address" })} />

                                    <div>
                                    {loading ? <div>...loading</div> : null}

                                    {suggestions.map(suggestion => {
                                        const style = {
                                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                        };

                                        return (
                                        <div {...getSuggestionItemProps(suggestion, { style })}>
                                            {suggestion.description}
                                        </div>
                                        );
                                    })}
                                    </div>
                                </div>
                                )}
                            </PlacesAutocomplete> */}
                            <Input type="text" name="location" id="location" onChange={handleChange("location")} value={location} placeholder="Eg. Chennai"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Blood type</Label>
                            <Input type="select" name="bloodType" id="bloodType" onChange={handleChange("bloodType")}>
                                <option value="Select">Select</option>
                                {categories && categories.map((category, index) => {
                                    return (
                                    <option key={index} value={category.name}>{category.name}</option>
                                    );
                                })
                                }
                            </Input>
                        </FormGroup>
                        <Button color="primary"  onClick={handleSubmit}>Search</Button>
                    </Form>
                </Jumbotron>
            </Col>
            <Col md="6">
                <Jumbotron className="jumbotron-custom" >
                        <h1 className="display-5 text-center pb-2">Manage Donors</h1>
                        <hr className="my-2" />
                        <Row>
                            <Col>
                                <h2 className="text-center text-white my-3">Total {donors.length} donors</h2>
                                <Row>
                                    <Col md="4"  className="text-center">
                                        <h3>Name</h3>
                                    </Col>
                                    <Col md="4"  className="text-center">
                                        <h3>Location</h3>
                                    </Col>
                                    <Col md="4"  className="text-center">
                                        
                                    </Col>
                                </Row>
                                <hr className="my-2" />
                                    <Table className="text-white text-center">
                                        <thead className="thead-dark">
                                            <tr>
                                            <th scope="col" className="th-sm">Donor Name</th>
                                            <th scope="col" className="th-sm">Location</th>
                                            <th scope="col" className="th-sm">Contact</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {donors.map((donor, index) => {
                                                return(
                                                    <tr key={index}>
                                                        <th scope="row">{donor.firstName} {donor.lastName}</th>
                                                        <td>{donor.location}</td>
                                                        <td><a  className="btn btn-success button-primary"  href={"tel:"+donor.phone} ><FontAwesomeIcon icon={faPhoneAlt} /> Call</a></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                            </Col>
                        </Row>
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

