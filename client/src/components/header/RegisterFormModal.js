import React from 'react';
import { Modal, Box } from '@mui/material';
import RegisterForm from '../auth/RegisterForm'; // Import the RegisterForm component

const RegisterFormModal = ({ open, handleClose }) => {
  return (
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
        transform: 'translate(-50%, -50%)',
        width: 400,
      }}>
        <RegisterForm /> {/* Render the RegisterForm component */}
      </Box>
    </Modal>
  );
};

export default RegisterFormModal;
