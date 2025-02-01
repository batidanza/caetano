import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo">
      <div className="logo-links">
        <Link to="/work" className="logo-link">
          CAMILA-ESPIRAL
        </Link>
      </div>
    </div>
  );
}

export default Logo;
