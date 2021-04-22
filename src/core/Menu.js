import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faListAlt, faUserShield, faSignOutAlt, faUserPlus, faSignInAlt, faColumns, faSearch, faHandHoldingMedical} from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink as RRNavLink, Redirect} from "react-router-dom";
import { signout, isAuthenticated } from '../auth/helper';
import leftLogo from "./left.png";
import rightLogo from "./right.png";



const Menu = ({history}) => {
    const [isOpen, setIsOpen] = useState(false);


    const toggle = () => setIsOpen(!isOpen);

    
    return (
        <div>
            <Navbar className="menu" dark expand="md">
                <NavbarBrand tag={Link} to="/">
                    <img src={leftLogo} width="30" height="30" alt="logo-left"/>
                    <span>Lyfline</span>
                    <img src={rightLogo} width="30" height="30" alt="logo-left" />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} className="mb-1"/>
                <Collapse isOpen={isOpen} navbar>
                    <NavbarText>Every drop matters!</NavbarText>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/"><FontAwesomeIcon icon={faHome} /> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/resource"><FontAwesomeIcon icon={faListAlt} /> Resources</NavLink>
                            </NavItem>
                            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                                <>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/user/search"><FontAwesomeIcon icon={faSearch} /> Search for Donors</NavLink>
                                    </NavItem>
                                    {isAuthenticated() && isAuthenticated().user.isDonor === false && (
                                            <NavItem>
                                                <NavLink tag={RRNavLink} to={`/user/${isAuthenticated().user._id}/signup-as-donor`}><FontAwesomeIcon icon={faHandHoldingMedical} /> Signup as a Donor</NavLink>
                                            </NavItem>
                                        )
                                    }
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to={`/user/${isAuthenticated().user._id}/dashboard`}><FontAwesomeIcon icon={faColumns} /> DashBoard</NavLink>
                                    </NavItem>
                                </>
                            )}
                            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/admin/dashboard"><FontAwesomeIcon icon={faUserShield} /> Admin DashBoard</NavLink>
                                </NavItem>
                            )}
                            {!isAuthenticated() && (
                                <>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/signup"><FontAwesomeIcon icon={faUserPlus} /> Signup</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/signin"><FontAwesomeIcon icon={faSignInAlt} /> SignIn</NavLink>
                                    </NavItem>
                                </>
                            )}
                            {isAuthenticated() && (
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/" onClick={() => {
                                        signout(() => {
                                            <Redirect to="/"></Redirect>
                                        })
                                    }}><FontAwesomeIcon icon={faSignOutAlt} /> Signout</NavLink>
                                </NavItem>
                            )}       
                        </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

  export default Menu;