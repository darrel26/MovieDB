import React from "react";
import { useState } from "react";
import logo from "/logo.svg";
import {
  faClose,
  faBars,
  faSearch,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBar() {
  const [isNavClicked, setIsNavClicked] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const handleMobileNavClick = () => {
    setIsNavClicked(!isNavClicked);
  };

  const handleSearchClick = () => {
    setIsSearchClicked(true);
  };

  return (
    <nav>
      <img src={logo} className="nav-logo" />
      <a href="#">
        {isNavClicked ? (
          <FontAwesomeIcon
            icon={faClose}
            className="nav-mobile"
            onClick={handleMobileNavClick}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            className="nav-mobile"
            onClick={handleMobileNavClick}
          />
        )}
      </a>
      <ul className={isNavClicked ? "nav-option active" : "nav-option"}>
        <li>
          <a href="/movies">Movies</a>
        </li>
        <li>
          <a href="/tv-shows">TV Shows</a>
        </li>
        <li onClick={handleSearchClick}>
          <a href="#" style={{ display: !isSearchClicked ? "flex" : "none" }}>
            Search
          </a>
        </li>
        <li
          className="search-box"
          style={{ display: isSearchClicked ? "flex" : "none" }}
        >
          <div className="search-bar">
            <FontAwesomeIcon
              icon={faSearch}
              className="search-icon"
            ></FontAwesomeIcon>
            <input type="search" placeholder="Search..."></input>
          </div>
        </li>
        <li>
          <a href="#">Profile</a>
        </li>
      </ul>
    </nav>
  );
}
