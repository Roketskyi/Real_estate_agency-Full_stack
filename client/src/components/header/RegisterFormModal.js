import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import RegisterForm from '../auth/RegisterForm';
import LoginFormModal from './LoginFormModal';

const RegisterFormModal = ({ open, handleClose }) => {
  const [loginOpen, setLoginOpen] = useState(false);

  const handleSuccess = () => {
    handleClose();
    setLoginOpen(true);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -37%)',
          width: 400,
        }}>
          <RegisterForm onSuccess={handleSuccess} />
        </Box>
      </Modal>

      <LoginFormModal open={loginOpen} handleClose={() => setLoginOpen(false)} />
    </>
  );
};

export default RegisterFormModal;
