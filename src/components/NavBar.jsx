import React from "react";
import { useState } from "react";
import logo from "/logo.svg";
import { faClose, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBar() {
  const [isNavClicked, setIsNavClicked] = useState(false);

  const handleMobileNavClick = () => {
    setIsNavClicked(!isNavClicked);
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
          <a href="#">Movies</a>
        </li>
        <li>
          <a href="#">TV Shows</a>
        </li>
        <li>
          <a href="#">Search</a>
        </li>
        <li>
          <a href="#">Profile</a>
        </li>
      </ul>
    </nav>
  );
}
