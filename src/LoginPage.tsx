import {useState} from 'react';
import './css/LoginPage.css';

interface LoginPageProps {
    setAuthenticated: (a: boolean) => any;
}
export default function LoginPage({ setAuthenticated } : LoginPageProps) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const attemptLogin = (username: string, password: string) => {
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