import React, { useState } from 'react';
import axios from 'axios';
import '../login-view/login-view.scss';
import {Form, Button, Container, Row, Col , CardGroup, Card} from 'react-bootstrap';


export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        /* Send a request to the server for authentication  (to be added later)*/
        //props.onLoggedIn(username);
        const response = await axios.post('https://flicking-through-flicks.herokuapp.com/login', 
        {
            Username: username,
            Password: password
        })
        if (response.status === 200 && response.data.token) {
            const {user, token} = response.data
            if (token) {
                props.onLoggedIn(token, user);
            }
        }
    }
    
return (
    <>
    <Container>  
    <Row className="m-5 mx-auto w-50">
    <Col>
    <CardGroup>
        <Card>
            <Card.Body>
            <Card.Title>Login below:</Card.Title>
  
    <Form>
        <Form.Group controlID="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control 
            type="text"
            value={username}
            onChange={ e => setUsername(e.target.value)}
            required
            />
        </Form.Group>
        <Form.Group controlID="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control 
            type="password" 
            value={password}
            onChange={ e => setPassword(e.target.value)}
            required
            />
        </Form.Group>
        <Button className="login-submit-button" type="submit" onClick={handleSubmit}>Submit</Button>
        <Button variant="secondary" onClick={props.handleRegister}>Register</Button>
    </Form>
    
    


        </Card.Body>
</Card>
</CardGroup>
</Col>
</Row> 
</Container>
    </>

);}

