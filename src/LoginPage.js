import {useState} from 'react';
import './css/LoginPage.css';
export default function LoginPage({setAuthenticated}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const attemptLogin = () => {
        console.log("Attempting login...")
        setAuthenticated(true);
    };

    return (
        <div className="login-page">
            <input id="username" type="text" onChange={e => setUsername(e.target.value)} value={username}></input>
            <input id="password" type="password" onChange={e => setPassword(e.target.value)} value={password}></input>
            <button onClick={() => attemptLogin(username, password)}>Log In</button>
        </div>
    );
}