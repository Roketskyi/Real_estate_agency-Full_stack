import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClock, faPhone } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import logo from "../images/logo.jpg";

const Header = ({ isLoggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // This will force a reload to update login state
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header>
      <div className="container-fluid bg-light">
        <div className="d-flex justify-content-between align-items-center p-2">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary me-2 d-md-none"
              onClick={toggleMenu}
            >
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

      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <Link
            to="/"
            className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </Link>

          <ul
            className={`nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 ${
              showMenu ? "show" : ""
            }`}
          >
            <li>
              <Link to="/" className="nav-link px-2 link-secondary">
                Головна
              </Link>
            </li>
            <li>
              <Link to="/features" className="nav-link px-2 link-dark">
                Features
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="nav-link px-2 link-dark">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="nav-link px-2 link-dark">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link px-2 link-dark">
                About
              </Link>
            </li>
          </ul>

          <div className="col-md-3 text-end d-md-block d-none">
            {isLoggedIn ? (
              <button
                type="button"
                className="btn btn-outline-danger me-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">
                  Вхід
                </Link>
                <button type="button" className="btn btn-primary">
                  Зареєструватись
                </button>
              </>
            )}
          </div>
        </header>
      </div>
    </header>
  );
};

export default Header;
