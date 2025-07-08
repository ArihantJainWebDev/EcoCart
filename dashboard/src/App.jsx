import './App.css'
import React from 'react'
import Dashboard from './pages/dashboard'
import Auth from './pages/Auth'
import Products from './pages/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
