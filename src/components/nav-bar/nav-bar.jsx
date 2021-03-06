import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../nav-bar/nav-bar.scss';

export function Menubar({ user }) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    }

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token');
        }
        else {
            return false;
        }
    }

    
    return (
        <Navbar className=' fluid main-nav navbar-bg m-3'>
            <Container>
                <Navbar.Brand className='navbar-logo navbar-text' href="/">
                    Flicking Through Flicks
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className="ml-auto">
                        {
                            isAuth() && <Nav.Link className="navbar-text mr-4" as={Link} to={`/users/${user}`}>Profile</Nav.Link>
                        }
                        {
                            isAuth() && <Button variant="link" className="link" onClick={() => { onLoggedOut() }}>Log Out</Button>
                        }
                        {
                            !isAuth() && <Nav.Link className="navbar-text" href="/login">Sign In</Nav.Link>
                        }
                        {
                            !isAuth() && <Nav.Link className="navbar-text" href="/register">Register</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
