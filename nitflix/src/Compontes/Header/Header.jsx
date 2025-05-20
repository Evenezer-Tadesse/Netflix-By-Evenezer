// Header.jsx
import React, { useState } from "react";
import "../Header/header.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          <h1 className="header__logo">Netflix</h1>
          {/* Hamburger menu for mobile */}
          <button className="header__mobile-menu" onClick={toggleMenu}>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <nav
            className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}
          >
            <ul className="header__nav-list">
              <li className="header__nav-item">Home</li>
              <li className="header__nav-item">TV Shows</li>
              <li className="header__nav-item">Movies</li>
              <li className="header__nav-item">Latest</li>
              <li className="header__nav-item">My List</li>
            </ul>
          </nav>
        </div>
        <div className="header__right">
          <ul className="header__icon-list">
            <li className="header__icon-item">
              <SearchIcon className="header__icon" />
            </li>
            <li className="header__icon-item">
              <NotificationsIcon className="header__icon" />
            </li>
            <li className="header__icon-item">
              <AccountCircleIcon className="header__icon header__icon--profile" />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
