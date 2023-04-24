import { useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Data from './pages/Data'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'

function App() {
  return (
    <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/data" element={<Data />} />
        </Routes>
    </>
  )
}

export default App
