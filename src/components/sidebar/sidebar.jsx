import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';
import logo from "../../assets/logo.png";
import company from "../../assets/company.png";
import close from "../../assets/close.png";
import open from "../../assets/open.png";

import { MdDashboard, MdShoppingBag, MdReceipt, MdPeople, MdBarChart, MdSettings, MdHelp } from "react-icons/md";

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const [productOpen, setProductOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>

      {/* Logo + Toggle Button */}
      <div className="logo">
        {isOpen && <img src={logo} alt="company" />}
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <img src={close} alt="open"  /> : "☰" }
        </button>
      </div>

      {/* Company */}
      {isOpen && (
        <div className="kany">
          <img src={company} alt="company" />
        </div>
      )}

      {/* General */}
      {isOpen && <p className="menu-label">GENERAL</p>}
      <div className="menu">

        <Link to="dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
          <MdDashboard className="menu-icon" />
          {isOpen && <span>Dashboard</span>}
        </Link>

        <div className="dropdown-toggle" onClick={() => setProductOpen(!productOpen)}>
          <MdShoppingBag className="menu-icon" />
          {isOpen && <span>Product (119)</span>}
          {isOpen && <span>{productOpen ? "▲" : "▼"}</span>}
        </div>

        {productOpen && isOpen && (
          <div className="dropdown-items">
            <Link to="/product/sneakers">Sneakers</Link>
            <Link to="/product/jacket">Jacket</Link>
            <Link to="/product/tshirt">T-Shirt</Link>
            <Link to="/product/bag">Bag</Link>
          </div>
        )}

        <Link to="/transaction" className={location.pathname === "/transaction" ? "active" : ""}>
          <MdReceipt className="menu-icon" />
          {isOpen && <span>Transaction (441)</span>}
        </Link>

        <Link to="/customers" className={location.pathname === "/customers" ? "active" : ""}>
          <MdPeople className="menu-icon" />
          {isOpen && <span>Customers</span>}
        </Link>

        <Link to="/sales" className={location.pathname === "/sales" ? "active" : ""}>
          <MdBarChart className="menu-icon" />
          {isOpen && <span>Sales Report</span>}
        </Link>

      </div>

      {/* Tools */}
      {isOpen && <p className="menu-label">TOOLS</p>}
      <div className="tools">
        <Link to="/settings">
          <MdSettings className="menu-icon" />
          {isOpen && <span>Account & Settings</span>}
        </Link>
        <Link to="/help">
          <MdHelp className="menu-icon" />
          {isOpen && <span>Help</span>}
        </Link>

        {isOpen && (
          <div className="dark-mode-toggle">
            <span>Dark Mode</span>
            <div
              className={`toggle-switch ${darkMode ? "on" : ""}`}
              onClick={() => setDarkMode(!darkMode)}
            />
          </div>
        )}
      </div>

{/* User */}
{isOpen && (
  <div className="user">
    <div className="user-img">👤</div>
 
    <Link to="/" >
      Logout
    </Link>
  </div>
)}

    </div>
  );
}

export default Sidebar;