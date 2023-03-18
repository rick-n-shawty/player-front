import axios from "axios";
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
export default function Register(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const navigate = useNavigate()
    const submit = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post('/register', {email, password}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res.data)
            return navigate('/login')
        }catch(err){
            console.log(err.response.data.err)
            setErr(err.response.data.err)
        }
    }
    return (
        <div className="auth-wrapper">
            <div className="auth Register"> 
                <form onSubmit={submit}>
                    <h1>Register to Get The Juice</h1>
                    <label htmlFor="email">Email address</label>
                    <input 
                    name="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setErr('')}
                    }/>
                    <label htmlFor="password">Password</label>
                    <input 
                    type='password' 
                    name="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setErr('')}
                    }/>
                    <h3>{err}</h3>
                    <button type="submit">Sign up</button>
                    <Link className="link" to={'/login'}>Login</Link>
                </form>
            </div>
        </div>
    )
}