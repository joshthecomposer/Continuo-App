import { useState, createContext, useContext } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import InstrumentForm from './pages/InstrumentForm'
import PracticeSession from './pages/PracticeSession'
import Logout from './components/Logout'
import { ApiUrlContext } from './components/ApiUrlContext'

function App() {
//  const apiUrl = "http://myapp2-dev.eba-4wmnp32y.us-east-1.elasticbeanstalk.com/api/";
    const apiUrl = "http://localhost:5000/api/";
    const [currentTime, setCurrentTime] = useState(0);
    return (
        <ApiUrlContext.Provider value={apiUrl}>
            <Routes>
                <Route path="/logout" element={<Logout/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/instrument/create" element={<InstrumentForm />} />
                <Route path="/instrument/practice" element={<PracticeSession currentTime = {currentTime} setCurrentTime = {setCurrentTime} />} />
            </Routes>
        </ApiUrlContext.Provider>
  )
}

export default App
