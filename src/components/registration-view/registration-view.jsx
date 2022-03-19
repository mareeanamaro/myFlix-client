import React from 'react';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    const [email, setEmail ] = useState('');
    const [birthday, setBirthday] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.log(username, password, email, birthday);
        /* Send a request to the server for authentication  (to be added later)*/
        props.onRegistration(username);
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
        <label>
            Birthday:
            <input type="birthday" value={birthday} 
            onChange={ e => setBirthday(e.target.value)}/>
        </label>
        <button type="submit" onClick={handleSubmit}>Register</button>
    </form>

);}
