import React from 'react'
import '../styles/Navbar.css'

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    🌿 EcoCart
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search products or brands..." />
                    <button className="search-button">🔍</button>
                </div>
                <div className="user-menu">
                    <span className="user-greeting">Hello, Eco Warrior!</span>
                    <button className="logout-button">🚪 Login</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar
