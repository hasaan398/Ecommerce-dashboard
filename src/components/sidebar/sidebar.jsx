import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';
import logo from "../../assets/logo.png";
import company from "../../assets/company.png";

{/* Logo */ }

function Sidebar() {
  const location = useLocation();
  const [productOpen, setProductOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="sidebar">


      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="company" />
      </div>

      <div className="kany">
        <img src={company} alt="company" />
      </div>



      {/* General */}
      <p className="menu-label">GENERAL</p>
      <div className="menu">

        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Dashboard
        </Link>

        {/* Product Dropdown */}
        <div
          className="dropdown-toggle"
          onClick={() => setProductOpen(!productOpen)}
        >
          <span> Product (119)</span>
          <span>{productOpen ? "▲" : "▼"}</span>
        </div>

        {productOpen && (
          <div className="dropdown-items">
            <Link to="/product/sneakers">Sneakers</Link>
            <Link to="/product/jacket">Jacket</Link>
            <Link to="/product/tshirt">T-Shirt</Link>
            <Link to="/product/bag">Bag</Link>
          </div>
        )}

        <Link to="/transaction" className={location.pathname === "/transaction" ? "active" : ""}>
          Transaction (441)
        </Link>

        <Link to="/customers" className={location.pathname === "/customers" ? "active" : ""}>
          Customers
        </Link>

        <Link to="/sales" className={location.pathname === "/sales" ? "active" : ""}>
          Sales Report
        </Link>

      </div>

      {/* Tools */}
      <p className="menu-label">TOOLS</p>
      <div className="tools">
        <Link to="/settings"> Account & Settings</Link>
        <Link to="/help"> Help</Link>

        <div className="dark-mode-toggle">
          <span> Dark Mode</span>
          <div
            className={`toggle-switch ${darkMode ? "on" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
          />
        </div>
      </div>

      {/* User */}
      <div className="user">
        <div className="user-img">👤</div>
        <div>
          <p>Guy Hawkins</p>
          <small>Admin</small>
        </div>
        <span style={{ marginLeft: "auto" }}>▼</span>
      </div>

    </div>
  );
}

export default Sidebar;