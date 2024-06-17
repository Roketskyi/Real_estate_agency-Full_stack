import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClock, faPhone, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Header.css";
import logo from "../images/logo.jpg";

const Header = ({ isLoggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleContacts = () => {
    setShowContacts(!showContacts);
  };

  return (
    <div>
      {/* Navbar for medium and larger screens */}
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

      {/* Navbar for mobile */}
      <div className="container d-md-none">
        <div className="d-flex justify-content-between align-items-center p-2">
          <div className="d-flex align-items-center flex-grow-1">
            <button
              className="btn btn-outline-secondary me-2"
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
            <button
              className="btn btn-outline-secondary me-2"
              onClick={toggleContacts}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
          </div>
        </div>
      </div>

      {/* Contacts section for mobile */}
      <div className={`rd-navbar-fixed rd-navbar-collapse ${showContacts ? 'active' : ''} d-md-none`}>
        <div className="container">
          <div className="rd-navbar-aside-right">
            <ul className="rd-navbar-corporate-contacts list-navbar-contacts">
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
              className="button button-md button-default-outline-2 button-ujarak ms-3"
              href="/callback"
            >
              Зворотний дзвінок
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">
          <div className="d-flex align-items-center flex-grow-1">
            <Link
              to="/"
              className="d-flex align-items-center mb-2 mb-md-0 text-dark text-decoration-none"
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
          </div>

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
              <Link to="/news" className="nav-link px-2 link-dark">
                Новини
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link px-2 link-dark">
                Про нас
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center flex-grow-1 justify-content-end">
            {isLoggedIn ? (
              <div className="flex-shrink-0 dropdown">
                <a
                  href="#"
                  className="d-block link-dark text-decoration-none dropdown-toggle show"
                  id="dropdownUser2"
                  onClick={toggleDropdown}
                  aria-expanded={showDropdown ? "true" : "false"}
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                </a>
                {showDropdown && (
                  <ul
                    className="dropdown-menu text-small shadow show"
                    aria-labelledby="dropdownUser2"
                    data-popper-placement="bottom-end"
                    style={{
                      position: "absolute",
                      inset: "0px auto auto 0px",
                      margin: "0px",
                      transform: "translate3d(-110px, 34px, 0px)",
                    }}
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Панель Адміністратора
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Налаштування
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Профіль
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={handleLogout}>
                        Вийти
                      </a>
                    </li>
                  </ul>
                )}
              </div>
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
    </div>
  );
};

export default Header;
