import React from 'react'
import SearchBar from './Searchbar'

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    🌿 EcoCart
                </div>
                <div className="search-bar">
                    <SearchBar />
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
