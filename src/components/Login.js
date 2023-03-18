import axios from "axios";
import { UserContext } from "../App";
import {useNavigate, Link} from 'react-router-dom';
import {useState, useContext, useEffect} from 'react';

export default function Login(){
    const [user, setUser] = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const navigate = useNavigate()
    const submit = async(e) =>{
        e.preventDefault()
        try{
            const res = await axios.post('/login', {email, password}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setErr('')
            const {accessToken, refreshToken} = res.data
            localStorage.setItem('refreshToken', refreshToken)
            setUser({accessToken})
            return navigate('/')
        }catch(err){
            console.log(err)
            setErr(err.response.data.err)
        }
    }
    return(
        <div className="auth-wrapper">
            <div className="auth Login">
                <form onSubmit={submit}>
                    <h1>Login to Get The Juice</h1>
                    <label htmlFor="email">Email address</label>
                    <input name="email" placeholder="Email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                        setErr('')
                    }}/>
                    <label htmlFor="password">Password</label>
                    <input type={'password'} name="password" placeholder="password" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                        setErr('')
                    }}/>
                    <h3>{err}</h3>
                    <button type="submit">Login</button>
                    <Link className="link" to={'/register'}>Register</Link>
                </form>
            </div>
        </div>
    )
}