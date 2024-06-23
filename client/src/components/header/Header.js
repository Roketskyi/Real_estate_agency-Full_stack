import React, { useState } from "react";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import MobileContacts from "./MobileContacts";
import MainHeader from "./MainHeader";
import LoginFormModal from "./LoginFormModal";  // Import the modal component
import RegisterFormModal from './RegisterFormModal'

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Header.css";

const Header = ({ isLoggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false); // State to control login modal visibility
  const [openRegisterModal, setOpenRegisterModal] = useState(false); // State to control register modal visibility

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
        handleOpenRegisterModal={handleOpenRegisterModal} // Pass the function to open the register modal
      />
      <LoginFormModal open={openLoginModal} handleClose={handleCloseLoginModal} /> {/* Login Form Modal */}
      <RegisterFormModal open={openRegisterModal} handleClose={handleCloseRegisterModal} /> {/* Register Form Modal */}
    </div>
  );
};


export default Header;