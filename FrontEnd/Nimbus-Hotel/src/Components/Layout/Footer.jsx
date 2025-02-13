import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    let today = new Date();  
    return (
        <footer className="bg-dark text-light py-2 footer-overlay mt-lg-5">
            <Container>
                <Row>
                    <Col xs={12} md={12} className="text-center">
                    <p>&copy; {today.getFullYear()}  Nimbus Hotel </p>
                    </Col>
                </Row>            
            </Container>
        </footer>
    )    
}

export default Footer