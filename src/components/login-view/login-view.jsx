import React, { useState } from 'react';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication  (to be added later)*/
        props.onLoggedIn(username);
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
        <button>Register</button>
        </p>
    </>

);}

