import logo from './logo.svg';
import './App.css';
import axios from 'axios'; 
import {useEffect, useState, createContext} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
export const UserContext = createContext([])
function App() {
  const [user, setUser] = useState({})
  axios.defaults.baseURL = 'https://mypostsapi.onrender.com/api/v1'
  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, setUser]}>
        <div className='App'>
          <Routes>
            <Route path='/' index element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
