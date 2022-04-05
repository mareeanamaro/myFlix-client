import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    
    const validate = () => {
        let isReq = true;
        if(!username){
            setUsernameErr('Username Required');
            isReq = false;
        } else if(username.length < 2 ){
            setUsernameErr('Username must be at least two characters long');
            isReq = false;
        }
        if(!password){
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.lenth < 8){
            setPasswordErr('Password must be at least eight characters long');
            isReq = false;}
        return isReq;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        /* Send a request to the server for authentication  (to be added later)*/
        const isReq = validate();
        if(isReq) {       
        const response = await axios.post('https://flicking-through-flicks.herokuapp.com/users/', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
        .then(response => {
            const data = response.data;
            alert('Registration successful, please login!');
            window.open('/', '_self');
        })
        .catch(response => {
            console.error(response);
            alert('Unable to register');
        });
}
};

    return (
        <Container>
            <Row className="m-5 mx-auto w-50">
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Register below:</Card.Title>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            required
                                            placeholder='Enter your desired username'
                                        />
                                        {usernameErr && <p>{usernameErr}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                            minLength={8}
                                            placeholder='Your password must be 8 or more characters long'
                                        />
                                        {passwordErr && <p>{passwordErr}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            placeholder='Enter your email address' />
                                    </Form.Group>
                                    <Form.Group controlId="updateBirthday">
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="birthday"
                                            value={birthday}
                                            onChange={e => setBirthday(e.target.value)}
                                            required
                                            />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
                                    <Link to="/login">
                                        <Button variant="secondary">Go to Login Page</Button>
                                    </Link>

                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}
