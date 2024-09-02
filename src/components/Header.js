// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link dari react-router-dom
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Gunakan Link untuk membuat logo menjadi tautan ke halaman Home */}
        <Link to="/" className="logo">
          Anime Katsumi
        </Link>
        <nav className="navigation">
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/top-anime">Top Anime</Link></li>
            <li><Link to="/trending-now">Trending Now</Link></li>
          </ul>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search anime..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </nav>
      </div>
    </header>
  );
};

export default Header;
