import React, { useState, useEffect, createContext } from 'react'
import { Container, Row, Col, Carousel, ListGroup, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useAuth } from './Authcontext';
import 'bootstrap/dist/css/bootstrap.min.css';


function Header() {


    const auth = useAuth();
    const user = JSON.parse(localStorage.getItem('user'));
    


    return (


        <Navbar expand="lg" className="bg-body-tertiary" style={{ backgroundColor: 'black' }}>
            <Container>
                <Navbar.Brand href="/">Shop Phone</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href='/'>Home</Nav.Link>
                        {user != null && user.role.match("admin")&&(
                            <Nav.Link href='/admin/products'>Product Manage</Nav.Link>                           
                        )}
                        <Nav.Link href="/products">Product List</Nav.Link>
                        <Nav.Link href='#'>About</Nav.Link>
                        

                    </Nav>
                    <Nav>
                        {user == null &&(
                            <>
                            <Nav.Link href="/auth/sign-up">Sign Up</Nav.Link>
                            <Nav.Link href="/auth/sign-in">Sign In</Nav.Link>
                            </>
                        )}
                        
                        {user != null &&(
                            <Nav.Link onClick={(e) => auth.logout()}>Log out</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header