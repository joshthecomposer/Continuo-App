import { useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Data from './pages/Data'

function App() {
  return (
    <>
        <div className="flex gap-3 py-2 px-3 text-xl bg-slate-800 text-slate-50">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/data">Data</Link>
        </div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/data" element={<Data />} />
        </Routes>
    </>
  )
}

export default App
