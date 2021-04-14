import React, { useState } from 'react';
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
                    <img src={leftLogo} width="30" height="30"
                    />
                    <span>Lyfline</span>
                    <img src={rightLogo} width="30" height="30"
                    />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} className="mb-1"/>
                <Collapse isOpen={isOpen} navbar>
                    <NavbarText>Every drop matters!</NavbarText>
                    {/* <motion.div
                        animate={isOpen ? "open" : "closed"}
                        variants={variants}
                    > */}
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/">Home</NavLink>
                            </NavItem>
                            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                                <>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/user/search">Search for Donors</NavLink>
                                    </NavItem>
                                    {isAuthenticated() && isAuthenticated().user.isDonor === false && (
                                            <NavItem>
                                                <NavLink tag={RRNavLink} to={`/user/${isAuthenticated().user._id}/signup-as-donor`}>Signup as a Donor</NavLink>
                                            </NavItem>
                                        )
                                    }
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to={`/user/${isAuthenticated().user._id}/dashboard`}>DashBoard</NavLink>
                                    </NavItem>
                                </>
                            )}
                            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/admin/dashboard">Admin DashBoard</NavLink>
                                </NavItem>
                            )}
                            {!isAuthenticated() && (
                                <>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/signup">Signup</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/signin">SignIn</NavLink>
                                    </NavItem>
                                </>
                            )}
                            {isAuthenticated() && (
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/" onClick={() => {
                                        signout(() => {
                                            <Redirect to="/"></Redirect>
                                        })
                                    }}>Signout</NavLink>
                                </NavItem>
                            )}       
                        </Nav>
                    {/* </motion.div> */}
                </Collapse>
            </Navbar>
        </div>
    );
}

  export default Menu;