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
                <div >{children}</div>
            </Container>
            <footer className="text-center text-white p-4"> &copy; 2021 Prometheus. All Rights Reserved.</footer>
        </div>
    );
}

export default Base;