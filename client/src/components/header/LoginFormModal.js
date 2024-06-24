import React from "react";
import { Modal, Box } from "@mui/material";
import LoginForm from "../auth/LoginForm";

const LoginFormModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
      }}>
        <LoginForm />
      </Box>
    </Modal>
  );
};

export default LoginFormModal;
