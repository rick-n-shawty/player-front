import {useRef, useState, useContext, useEffect} from 'react';
import axios from 'axios';
export default function Song({id, name, httpUrl, UserContext, deleteSong}){
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [current, setCurrentTime] = useState(0)
    const [user, setUser] = useContext(UserContext)
    const play = () =>{
        console.log(user)
        if(!isPlaying){
            audioRef.current.play()
            audioRef.current.currentTime = current 
            setIsPlaying(true)
        }else{
            audioRef.current.pause()
            setIsPlaying(false)
            setCurrentTime(audioRef.current.currentTime )
        }
    }
    return (
        <div className="song-container">
            <div className='playBtn'>
                {isPlaying ? 
            <span onClick={play} className='material-symbols-outlined'>pause</span>:
            <span onClick={play} className='material-symbols-outlined'>play_arrow</span>}
            </div>
            <div className='info'>
                <h3 style={{color: isPlaying ? '#1DB954' : 'white'}}>{name}</h3>
                <audio playsInline webkit-playsinline='true' preload='none' ref={audioRef} className='song'>
                    <source src={httpUrl}></source>
                </audio>
            </div>
            <div className='deleteBtn'>
                <span onClick={() => deleteSong(id)} className='material-symbols-outlined'>
                    delete
                </span>
            </div>
        </div>
    )
}