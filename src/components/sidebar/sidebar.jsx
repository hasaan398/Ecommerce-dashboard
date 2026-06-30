import React, { useState, useEffect, useRef } from 'react';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const productRef = useRef(null);

  // Dark mode body class control
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth <= 700;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (productRef.current && !productRef.current.contains(e.target)) {
        setProductOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) setIsOpen(false);
  };

  return (
    <>
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>
      )}

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>

        <div className="logo">
          {isOpen && <img src={logo} alt="company" />}
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <img src={close} alt="open" /> : <img src={open} alt="open" />}
          </button>
        </div>

        {isOpen && (
          <div className="kany">
            <img src={company} alt="company" />
          </div>
        )}

        {isOpen && <p className="menu-label">GENERAL</p>}
        <div className="menu">

          <Link to="/dashboard" onClick={handleLinkClick} className={location.pathname === "/dashboard" ? "active" : ""}>
            <MdDashboard className="menu-icon" />
            {isOpen && <span>Dashboard</span>}
          </Link>

          <div className="product-item" ref={productRef}>
            <div
              className="dropdown-toggle"
              onClick={() => setProductOpen(!productOpen)}
            >
              <MdShoppingBag className="menu-icon" />
              {isOpen && <span>Product (119)</span>}
              {isOpen && <span>{productOpen ? "▲" : "▼"}</span>}
            </div>

{productOpen && isOpen && (
  <div className="dropdown-items">
    <Link to="/product/beauty" onClick={handleLinkClick}>Beauty</Link>
    <Link to="/product/fragrances" onClick={handleLinkClick}>Fragrances</Link>
    <Link to="/product/furniture" onClick={handleLinkClick}>Furniture</Link>
    <Link to="/product/groceries" onClick={handleLinkClick}>Groceries</Link>
  </div>
)}

    {productOpen && !isOpen && !isMobile && (
  <div className="dropdown-flyout">
    <span className="flyout-title">Products</span>

    <Link to="/product/beauty" onClick={() => setProductOpen(false)}>
      Beauty
    </Link>

    <Link to="/product/fragrances" onClick={() => setProductOpen(false)}>
      Fragrances
    </Link>

    <Link to="/product/furniture" onClick={() => setProductOpen(false)}>
      Furniture
    </Link>

    <Link to="/product/groceries" onClick={() => setProductOpen(false)}>
      Groceries
    </Link>
        <Link to="/product/furniture" onClick={() => setProductOpen(false)}>
      Furniture
    </Link>

    <Link to="/product/groceries" onClick={() => setProductOpen(false)}>
      Groceries
    </Link>
  </div>
)}
          </div>

          <Link to="/transaction" onClick={handleLinkClick} className={location.pathname === "/transaction" ? "active" : ""}>
            <MdReceipt className="menu-icon" />
            {isOpen && <span>Transaction (441)</span>}
          </Link>

          <Link to="/customers" onClick={handleLinkClick} className={location.pathname === "/customers" ? "active" : ""}>
            <MdPeople className="menu-icon" />
            {isOpen && <span>Customers</span>}
          </Link>

          <Link to="/sales" onClick={handleLinkClick} className={location.pathname === "/sales" ? "active" : ""}>
            <MdBarChart className="menu-icon" />
            {isOpen && <span>Sales Report</span>}
          </Link>

        </div>

        {isOpen && <p className="menu-label">TOOLS</p>}
        <div className="tools">
          <Link to="/setting" onClick={handleLinkClick}>
            <MdSettings className="menu-icon" />
            {isOpen && <span>Account & Settings</span>}
          </Link>
          <Link to="/help" onClick={handleLinkClick}>
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

        {isOpen && (
          <div className="user">
            <div className="user-img">👤</div>
            <Link to="/" onClick={handleLinkClick}>Logout</Link>
          </div>
        )}

      </div>
    </>
  );
}

export default Sidebar;