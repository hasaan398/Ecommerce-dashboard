import React from "react";
import "./navbar.css";
import bellIcon from "../../assets/bell.png";
import search from "../../assets/search.png";
import mailIcon from "../../assets/mail.png";


export default function Header({ isOpen }) {
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
        <div className="icon">
          <img src={mailIcon} alt="mail" style={{width:"32px"}} />
        </div>
        <div className="icon">
          <img src={bellIcon} alt="bell" style={{width:"32px"}} />
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