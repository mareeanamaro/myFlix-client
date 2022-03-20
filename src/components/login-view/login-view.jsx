import React, { useState } from 'react';
import axios from 'axios';

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
                props.onLoggedIn(token);
            }
        }
    }
    
return (
    <>
    <form>
        <label>
            Username: 
            <input type="text" value={username} 
            onChange={ e => setUsername(e.target.value)}/>
        </label>
        <label>
            Password: 
            <input type="password" value={password} 
            onChange={ e => setPassword(e.target.value)}/>
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
    <p>
        <button onClick={props.handleRegister}>Register</button>
        </p>
    </>

);}

