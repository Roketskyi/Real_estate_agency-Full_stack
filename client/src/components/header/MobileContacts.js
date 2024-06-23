import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPhone } from '@fortawesome/free-solid-svg-icons';

const MobileContacts = ({ showContacts }) => (
  <div
    className={`rd-navbar-fixed rd-navbar-collapse ${
      showContacts ? 'active' : ''
    } d-md-none`}
  >
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
);

export default MobileContacts;
