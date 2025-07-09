import React, { useEffect, useState } from 'react';
import SearchBar from './Searchbar';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/auth');
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')}>
          🌿 EcoCart
        </div>

        <div className="search-bar">
          <SearchBar />
        </div>

        <div className="user-menu">
          <span className="user-greeting">Hello, Eco Warrior!</span>
          {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogout}>
              🚪 Logout
            </button>
          ) : (
            <button className="logout-button" onClick={() => navigate('/auth')}>
              🚪 Login
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;