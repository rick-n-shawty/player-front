import axios from "axios";
import {useState, useContext, useEffect} from 'react';
import { UserContext } from "../App";
import {useNavigate} from 'react-router-dom';
import Song from "./Song";
import jwt_decode from 'jwt-decode';
export default function Home(){
    const [user, setUser] = useContext(UserContext)
    const [songs, setSongs] = useState([])
    const [file, setFile] = useState()
    const [status, setStatus] = useState('Choose file')
    const navigate = useNavigate()
    async function getNewToken(){
        try{
            const token = localStorage.getItem('refreshToken')
            const res = await axios.post('/newtoken', {refreshToken: token}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const {accessToken, refreshToken} = res.data 
            setUser({accessToken})
            localStorage.setItem('refreshToken', refreshToken)
            return accessToken
        }catch(err){
            logOut()
        }
    }
    const fetchSongs = async(token) =>{
        try{
            const res = await axios.get('/audios', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ? token : user.accessToken}`
                }
            })
            console.log(res)
            const {audios} = res.data 
            const newArr = audios.map(item =>{
                return <Song 
                id={item.AWS_ID} 
                key={item.httpUrl} 
                httpUrl={item.httpUrl} 
                name={item.songName}
                UserContext = {UserContext}
                deleteSong={deleteSong}
                />
            })
            setSongs(newArr)
        }catch(err){
            console.log(err)
        }
    }
    const logOut = () =>{
        setUser({})
        localStorage.setItem('refreshToken', '')
        return navigate('/login')
    } 
    const deleteSong = async(id) =>{
        try{
            const res = await axios.delete(`/audios/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.accessToken}`
                }
            })
            fetchSongs()
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() =>{
        const fetch = async() =>{
            const token = await getNewToken()
            await fetchSongs(token)
            if(!token) return navigate('/login')
            console.log('ehllo')
        }
        fetch()
    }, [])


    useEffect(() =>{
        const timer = setInterval(() => {
            fetchSongs()
            getNewToken()
        }, 5400000) // fetches new urls and tokens after 1.5 hour
        return () => clearInterval(timer)
    }, [])

    const uploadFile = async(e) =>{
        e.preventDefault()
        try{
        const formData = new FormData()
        formData.append('audio', file)
        setFile()
        setStatus('Uploading...')
        const res = await axios.post('/audios', formData, {headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${user.accessToken}`  
        }})
        fetchSongs()
        setStatus('Choose file')
        console.log(res)
        }catch(err){
        console.log(err)
        }
    }
    return(
        <div className="home">
            <header className="header">
                <div className="left">
                    <h2>Spotidie</h2>
                </div>
                <button className="right" onClick={logOut}>Log out</button>
            </header>
                <form onSubmit={uploadFile} className="form">
                    <label className="inputTag">
                        {file ? 'Upload file' : status}
                       <input onChange={(e) => setFile(e.target.files[0])} type={'file'} accept='audio/mp3, audio/wav, audio/*'/>
                    </label>
                    <button type="submit" className="material-symbols-outlined">cloud_upload</button>
                </form>
            <div className="songs">
                {songs}
            </div>
        </div>
    )
}