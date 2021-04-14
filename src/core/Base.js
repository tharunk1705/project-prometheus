import React from 'react';
import Menu from "./Menu";
import {
    Container
} from 'reactstrap';



const Base = ({
    className="base-component h-100",
    children
}) => {
    return (
        <div className={className}>
            <Menu></Menu>
            <Container fluid>
                {children}
            </Container>
            <footer className="text-center text-white"> &copy; 2021 Lyfline. All Rights Reserved.</footer>
        </div>
    );
}

export default Base;