import React, {useState} from 'react';
import axios from 'axios';

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
        <label>
            Email:
            <input type="text" value={email} 
            onChange={ e => setEmail(e.target.value)}/>
        </label>
        {/* <label>
            Birthday:
            <input type="birthday" value={birthday} 
            onChange={ e => setBirthday(e.target.value)}/>
        </label> */}
        <button type="submit" onClick={handleSubmit}>Register</button>
    </form>

);}
