import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LiaBarsSolid } from "react-icons/lia";
import "./Navbar.css";

const Navbar = () => {
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 

  const toggleNavbarMenu = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`navbar-main-container ${navbarExpanded ? "navbar-expanded" : ""}`}
    >
      <div className="navbar-container">
        {isMobile && (
          <>
            <button className="navbar-toggle-button" onClick={toggleNavbarMenu}>
              <LiaBarsSolid className="navbar-bars-button" />
            </button>
            <Link className="navbar-logo" to="/">
              CAETANO PORTAL
            </Link>
            <Link className="navbar-cart-button-mobile" to="/cart">
            (0)
            </Link>
          </>
        )}
        {!isMobile && (
          <>
            <Link className="navbar-logo" to="/">
              CAETANO PORTAL
            </Link>
          </>
        )}
        <div className={`navbar-options ${navbarExpanded ? "active" : ""}`}>
          <Link className="navbar-link" to="/shop">
            Shop
          </Link>
          <Link className="navbar-link" to="/collection">
            Collections
          </Link>
          <Link className="navbar-link" to="/collabs">
            Virtual Art
          </Link>
          <Link className="navbar-link" to="/about">
            About
          </Link>
        </div>
        {!isMobile && (
          <div className="navbar-end-options">
            <Link className="navbar-link" to="/login">
              SEARCH
            </Link>
            <Link className="navbar-cart-button-mobile" to="/cart">
             (0) 
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
