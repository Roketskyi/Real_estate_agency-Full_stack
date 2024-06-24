import React, { useState } from "react";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import MobileContacts from "./MobileContacts";
import MainHeader from "./MainHeader";
import LoginFormModal from "./LoginFormModal";
import RegisterFormModal from './RegisterFormModal'

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Header.css";

const Header = ({ isLoggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleContacts = () => {
    setShowContacts(!showContacts);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleOpenRegisterModal = () => {
    setOpenRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setOpenRegisterModal(false);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div>
      <Navbar closeDropdown={closeDropdown} />
      <MobileNavbar
        toggleMenu={toggleMenu}
        toggleContacts={toggleContacts}
      />
      <MobileContacts showContacts={showContacts} />
      <MainHeader
        isLoggedIn={isLoggedIn}
        showMenu={showMenu}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
        handleOpenLoginModal={handleOpenLoginModal}
        handleOpenRegisterModal={handleOpenRegisterModal}
      />
      <LoginFormModal open={openLoginModal} handleClose={handleCloseLoginModal} />
      <RegisterFormModal open={openRegisterModal} handleClose={handleCloseRegisterModal} />
    </div>
  );
};


export default Header;