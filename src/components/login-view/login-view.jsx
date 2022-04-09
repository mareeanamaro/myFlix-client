import React, { useState } from 'react';
import axios from 'axios';
import '../login-view/login-view.scss';
import {Form, Button, Container, Row, Col , CardGroup, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function LoginView(props) {
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');

    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

    const validate = () => {
        let isReq = true;
        if(!username){
            setUsernameErr('Username Required');
            isReq = false;
        } else if(username.length < 2){
            setUsernameErr('Username must be at least two characters long.');
            isReq = false;
        }
        if(!password){
            setPasswordErr('Password Required');
            isReq = false;
        } else if(password.length < 6){
            setPasswordErr('Password must be at least six characters long.');
            isReq = false;
        }

        return isReq;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const isReq = validate();
        if(isReq){
        /* Send a request to the server for authentication*/
        const response = await axios.post('https://flicking-through-flicks.herokuapp.com/login', 
        {
            Username: username,
            Password: password
        })
        .then(response =>{
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(error => {
            console.log(error, 'no such user');
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
            onChange={ e => setUsername(e.target.value)}
            required/>
            {usernameErr && <p>{usernameErr}</p>}
            
        </Form.Group>
        <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Enter your password"
            value={password}
            onChange={ e => setPassword(e.target.value)}
            required
            />
             {passwordErr && <p>{passwordErr}</p>}
        </Form.Group>
        <Button className="login-submit-button" type="submit" onClick={handleSubmit}>Submit</Button>
        <Link to="/register">
            <Button variant="secondary">Register</Button>
        </Link>
    </Form>

        </Card.Body>
</Card>
</CardGroup>
</Col>
</Row> 
</Container>
    </>

);}

