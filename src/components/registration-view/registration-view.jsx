import React, {useState} from 'react';
import axios from 'axios';
import {Form, Button, Container, Row, Col , CardGroup, Card} from 'react-bootstrap';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    const [email, setEmail ] = useState('');
    //const [birthday, setBirthday] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        //console.log(username, password, email, birthday);
        /* Send a request to the server for authentication  (to be added later)*/
        const response = await axios.post('https://flicking-through-flicks.herokuapp.com/users/', {
            Username: username,
            Password: password, 
            Email: email
        })
        if (response.status === 201) {
            props.onRegistration(username);
        }
        switch(response.status) {
            case 201: {} break;
            case 400: {} break;
            case 422: {} break;
        }
    }
    

return (
<Container>  
    <Row className= "m-5 mx-auto w-50">
    <Col>
    <CardGroup>
        <Card>
            <Card.Body>
            <Card.Title>Register below:</Card.Title>
  
<Form>
    
    <Form.Group controlID="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control 
        type="text"
        value={username}
        onChange={ e => setUsername(e.target.value)}
        required
        placeholder='Enter your desired username'
        />
    </Form.Group>
    <Form.Group controlID="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control 
        type="password" 
        value={password}
        onChange={ e => setPassword(e.target.value)}
        required
        minLength={8}
        placeholder='Your password must be 8 or more characters long'
        />
    </Form.Group>
    <Form.Group controlID="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control 
        type="text" 
        value={email} 
        onChange={ e => setEmail(e.target.value)}
        required
        placeholder='Enter your email address'/>
        </Form.Group>
    <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
    <Button variant="secondary" /*onClick={props.handleLogin}*/>Go to Login Page</Button>
</Form>
</Card.Body>
</Card>
</CardGroup>
</Col>
</Row> 
</Container>
);}
