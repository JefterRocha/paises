import React from "react";
import {Navbar, Nav, Button, Container} from "react-bootstrap";
import DataFirebase from "../../Data";
import {Link} from "react-router-dom";

const NavMenu = () => {

    return <>
        <Navbar className="navbar navbar-expand-lg" expand="lg" bg="primary" variant="dark">

                <Container className="justify-content-start adjustementNav">
            <Navbar.Brand href="/">Conheça Mais Países</Navbar.Brand>
            <Navbar.Toggle className="px-2" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100">
                        <Nav.Link as={Link} to='/' href='/' className="mx-4" active>Início</Nav.Link>
                        <Nav.Link as={Link} to='/graph' href='/graph' className="mx-4" active>Gáfico</Nav.Link>
                        <Nav.Link className="mx-4" href='https://querocriarsite.com/' active>Contato</Nav.Link>
                    </Nav>
                <Nav>
                    <Nav.Link href="#deets">
                        <Button variant="dark"
                                onClick={() => DataFirebase.auth().signOut()}>
                            Sair
                        </Button>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
                </Container>

        </Navbar>
    </>;
};

export default NavMenu;