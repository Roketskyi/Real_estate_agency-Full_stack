import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPhone } from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/logo.jpg";

const Navbar = () => (
  <div className="container-fluid bg-light d-none d-md-block-my">
    <div className="d-flex justify-content-between align-items-center p-2">
      <div className="d-flex align-items-center flex-grow-1">
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
        <ul className="list-navbar-contacts d-flex mb-0">
          <li className="d-flex align-items-center me-3">
            <FontAwesomeIcon icon={faClock} className="icon me-2" />
            <p className="mb-0">ПН-ПТ: 8:30-17:00</p>
          </li>
          <li className="d-flex align-items-center me-3">
            <FontAwesomeIcon icon={faPhone} className="icon me-2" />
            <a className="link-phone" href="tel:0667111070">
              (066) 711-10-70
            </a>
          </li>
          <li className="d-flex align-items-center me-3">
            <FontAwesomeIcon icon={faPhone} className="icon me-2" />
            <a className="link-phone" href="tel:0987680530">
              (098) 768-05-30
            </a>
          </li>
        </ul>
        <a
          className="d-flex align-items-center button button-md button-default-outline-2 button-ujarak ms-3"
          href="/callback"
        >
          Зворотний дзвінок
        </a>
      </div>
    </div>
  </div>
);

export default Navbar;
