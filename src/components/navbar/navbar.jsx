import React from "react";
import "./navbar.css";
    import bellIcon from "../../assets/bell.png";
import mailIcon from "../../assets/mail.png";
export default function Header() {
  return (
    <div className="header">

      {/* Search */}
      <div className="search-box">
        <input type="text" placeholder="Search product" />
        <span></span>
      </div>

      {/* Right */}


{/* Right */}
<div className="header-right">
  <div className="icon">
    <img src={mailIcon} alt="mail" style={{width:"32px"}} />
    <span className="badge">2</span>
  </div>
  <div className="icon">
    <img src={bellIcon} alt="bell" style={{width:"32px"}} />
    <span className="badge">3</span>
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