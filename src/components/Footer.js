// src/components/Footer.js
import React, { useState } from 'react';
import './Footer.css'; // Styling khusus untuk footer

const Footer = () => {
  // State untuk mengelola tema
  const [theme, setTheme] = useState('default');

  // Fungsi untuk mengubah tema
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme); // Setel state tema
    document.body.setAttribute('data-theme', newTheme); // Setel atribut tema pada elemen body
  };

  return (
    <footer className="footer">
      <div className="footer-section">
        <h3 className="footer-title">Site Theme</h3>
        <div className="theme-options">
          <button className="theme-button" onClick={() => handleThemeChange('default')}>A</button>
          <button className="theme-button dark" onClick={() => handleThemeChange('dark')}>A</button>
          <button className="theme-button light" onClick={() => handleThemeChange('light')}>A</button>
          <button className="theme-button custom" onClick={() => handleThemeChange('custom')}>A</button>
        </div>
      </div>

      <div className="footer-links">
        <ul>
          <li><a href="#">Donate</a></li>
          <li><a href="#">AniList.co</a></li>
          <li><a href="#">AniChart.net</a></li>
        </ul>
        <ul>
          <li><a href="#">Apps</a></li>
          <li><a href="#">Site Stats</a></li>
          <li><a href="#">Recommendations</a></li>
          <li><a href="#">API</a></li>
        </ul>
        <ul>
          <li><a href="#">Discord</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">GitHub</a></li>
        </ul>
        <ul>
          <li><a href="#">Add Data</a></li>
          <li><a href="#">Moderators</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Terms & Privacy</a></li>
          <li><a href="#">Site Map</a></li>
        </ul>
      </div>

      <p className="footer-copyright">© 2024 Anime Katsumi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
