import React, { useState, useEffect } from "react";
import "./navbar.css";
import search from "../../assets/search.png";
import mailIcon from "../../assets/mail.png";
import bellIcon from "../../assets/bell.png";

export default function Header({ isOpen, setIsOpen }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 700);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="header header-mobile">
        <div className="profile">
          <img src="https://i.pravatar.cc/32" alt="user" />
          <div>
            <p>Guy Hawkins</p>
            <small>Admin</small>
          </div>
        </div>

        <div className="header-right">
          <button className="icon-btn">
            <img src={search} alt="search" style={{ width: "20px" }} />
          </button>
          <button className="mobile-hamburger" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="header" style={{
      left: isOpen ? "200px" : "60px",
      width: isOpen ? "calc(100% - 200px)" : "calc(100% - 60px)",
      transition: "all 0.3s ease"
    }}>

      {/* Search */}
      <div className="search-box">
        <input type="text" placeholder="Search product" />
        <img src={search} alt="search" />
      </div>

      {/* Right */}
      <div className="header-right">
        <div className="icon mail-icon">
          <img src={mailIcon} alt="mail" style={{ width: "32px" }} />
        </div>
        <div className="icon bell-icon">
          <img src={bellIcon} alt="bell" style={{ width: "32px" }} />
        </div>
        <div className="profile">
          <img src="https://i.pravatar.cc/32" alt="user" />
          <div>
            <p>Guy Hawkins</p>
            <small>Admin</small>
          </div>
        </div>
      </div>

    </div>
  );
}