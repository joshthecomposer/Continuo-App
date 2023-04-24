import { useState, createContext, useContext } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Data from './pages/Data'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import { ApiUrlContext } from './components/ApiUrlContext'

function App() {
    const apiUrl = "http://localhost:5000/api/";
//  const apiUrl = "http://myapp1-dev.eba-jpbu45gu.us-east-1.elasticbeanstalk.com/api/";

  return (
      <ApiUrlContext.Provider value={apiUrl}>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/data" element={<Data />} />
        </Routes>
    </ApiUrlContext.Provider>
  )
}

export default App
