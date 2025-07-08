import React from 'react'
import SearchBar from './Searchbar'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <>
            <nav className="navbar">
                <div className="logo" onClick={() => navigate('/dashboard')}>
                    🌿 EcoCart
                </div>
                <div className="search-bar">
                    <SearchBar />
                </div>
                <div className="user-menu">
                    <span className="user-greeting">Hello, Eco Warrior!</span>
                    <button className="logout-button" onClick={() => navigate('/auth')} >🚪 Login</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar
