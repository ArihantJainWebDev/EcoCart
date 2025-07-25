import './App.css'
import React from 'react'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Products from './pages/Products'
import Redeem from './pages/Redeem'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/products" element={<Products />} />
          <Route path="/redeem" element={<Redeem />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
