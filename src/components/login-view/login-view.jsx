import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import propTypes from 'prop-types';

import '../login-view/login-view.scss';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be at least two characters long.');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be at least six characters long.');
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            /* Send a request to the server for authentication*/
               return axios.post('https://flicking-through-flicks.herokuapp.com/login',
                {
                    Username: username,
                    Password: password
                })
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch(error => {
                    console.log(error, 'Login Error');
                });
        }
    };

    return (
        <>
            <Container>
                <Row className="m-5 mx-auto w-75">
                    <Col>
                        <CardGroup>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Login below:</Card.Title>

                                    <Form>
                                        <Form.Group controlId="formUsername">
                                            <Form.Label>Username:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your username"
                                                value={username}
                                                onChange={e => setUsername(e.target.value)}
                                                required />
                                            {usernameErr && <p>{usernameErr}</p>}

                                        </Form.Group>
                                        <Form.Group controlId="formPassword">
                                            <Form.Label>Password:</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                            />
                                            {passwordErr && <p>{passwordErr}</p>}
                                        </Form.Group>
                                        <div className='text-center'>
                                            <Button className="login-submit-button mt-1" type="button" onClick={handleSubmit}>Log In</Button>
                                        </div>
                                        <Card.Text className="mt-5">Already have an account?</Card.Text>
                                        <Card.Text><Link to="/register">
                                            <Button variant="secondary">Go to the Registration page</Button>
                                        </Link></Card.Text>
                                    </Form>

                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </>

    );
}

LoginView.propTypes = {
    user: propTypes.shape({
        username: propTypes.string.isRequired,
        password: propTypes.string.isRequired
    }),
    onLoggedIn: propTypes.func.isRequired,
}