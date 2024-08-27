import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/logo.png";

const MobileNavbar = ({ toggleMenu, toggleContacts }) => (
  <div className="container d-md-none">
    <div className="d-flex justify-content-between align-items-center p-2">
      <div className="d-flex align-items-center flex-grow-1">
        <button className="btn btn-outline-secondary me-2" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="rd-navbar-brand">
          <Link to="/" className="brand">
            <img
              className="main-logo"
              loading="eager"
              decoding="async"
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-secondary me-2"
          onClick={toggleContacts}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </div>
    </div>
  </div>
);

export default MobileNavbar;
