import './App.css'
import React from 'react'
import Dashboard from './pages/dashboard'
import Auth from './pages/Auth'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
