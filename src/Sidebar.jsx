import React from 'react';
import './Sidebar.css'; // Importing the CSS file for styles
import logo from './logo.png'; // Importing the logo image
const Sidebar = ({ links }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <nav className="sidebar-nav">
        {links.map((link, index) => (
          <a key={index} href={link.url} className="nav-item">
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
