import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "../main.js";

const Header = () => {
  const [visibleDropdown, setVisibleDropdown] = useState(false);

  const toggleDropdown = () => setVisibleDropdown((prev) => !prev);

  const renderDropdownItems = (items) => {
    return items.map((item, index) => (
      <div key={index}>
        <Link to={item.link} className="dropdown-item">
          <h6 className="fw-normal mb-0">{item.text}</h6>
          <small>{item.time}</small>
        </Link>
        {index < items.length - 1 && <hr className="dropdown-divider" />}
      </div>
    ));
  };

  const notifications = [
    { text: "Profile updated", time: "15 minutes ago", link: "#" },
    { text: "New user added", time: "15 minutes ago", link: "#" },
    { text: "Password changed", time: "15 minutes ago", link: "#" },
  ];

  return (
    <header>
      <Link to="/fullcalendar">
        <h1 className="text-primary">NOSLEEP</h1>
      </Link>
      <div className="header-icons">
        <div className="options">
          <Link to="/" className="dropdown-item">
            Log Out
          </Link>

          {/* Notifications */}
          <div className="nav-item dropdown">
            <button
              id="NotificationBtn"
              className="nav-link dropdown-toggle"
              onClick={toggleDropdown}
            >
              <i className="fa fa-bell me-lg-2"></i>
              <span className="d-none d-lg-inline-flex">Notifications</span>
            </button>
            {visibleDropdown && (
              <div className="dropdown-menu dropdown-menu-end bg-light">
                {renderDropdownItems(notifications)}
                <Link to="#" className="dropdown-item text-center">
                  See all notifications
                </Link>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <img
                className="rounded-circle me-lg-2"
                src="img/user.jpg"
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <span className="d-none d-lg-inline-flex">John Doe</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end bg-light">
              <Link to="#" className="dropdown-item">
                My Profile
              </Link>
              <Link to="#" className="dropdown-item">
                Settings
              </Link>
              <Link to="/login" className="dropdown-item">
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </div>
      
    </header>
    
  );
};

export default Header;
