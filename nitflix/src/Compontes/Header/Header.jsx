// Header.jsx
import React from "react";
import "../Header/header.css";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          <h1 className="header__logo">Netflix</h1>
          <nav className="header__nav">
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