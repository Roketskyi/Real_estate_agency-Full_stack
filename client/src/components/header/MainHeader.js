import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GET_AVATAR_BY_USER_ID } from '../../apollo/get-base';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@apollo/client';

const MainHeader = ({
  isLoggedIn,
  showMenu,
  showDropdown,
  toggleDropdown,
  handleOpenLoginModal,
  handleOpenRegisterModal,
}) => {
  const { user, logout, isAdmin } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState('');
  const dropdownRef = useRef(null);

  const { data } = useQuery(GET_AVATAR_BY_USER_ID, {
    variables: { id: user ? user.id : null },
    skip: !user,
  });

  useEffect(() => {
    if (data && data.user) {
      setAvatarUrl(data.user.avatar);
    }
  }, [data]);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleOptionClick = () => {
    if (showDropdown) toggleDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (showDropdown) toggleDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown, toggleDropdown]);

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">
        <div className="d-flex align-items-center flex-grow-1">
          <Link to="/" className="d-flex align-items-center mb-2 mb-md-0 text-dark text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </Link>
        </div>

        <ul className={`nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 ${showMenu ? "show" : ""}`}>
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
            <div className="flex-shrink-0 dropdown" ref={dropdownRef}>
              <a
                href="#"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser2"
                onClick={toggleDropdown}
                aria-expanded={showDropdown ? "true" : "false"}
              >
                <img
                  src={avatarUrl}
                  alt="User Avatar"
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
                  {isAdmin() && (
                    <>
                      <li onClick={handleOptionClick}>
                        <Link to="/admin" className="dropdown-item">
                          Панель Адміністратора
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                    </>
                  )}
                  <li onClick={handleOptionClick}>
                    <Link to="/profile" className="dropdown-item">
                        Профіль
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/callback" onClick={handleOptionClick}>
                      Налаштування
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
              <button
                type="button"
                className="btn btn-outline-primary me-2"
                onClick={handleOpenLoginModal}
              >
                Вхід
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOpenRegisterModal}
              >
                Зареєструватись
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
