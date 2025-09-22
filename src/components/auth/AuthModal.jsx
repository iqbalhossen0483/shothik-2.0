"use client";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowLoginModal,
  setShowRegisterModal,
} from "../../redux/slice/auth";

const AuthModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='auth-modal-title'
      aria-describedby='auth-modal-description'
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "90%", sm: "450px" },
          maxHeight: "90vh",
          overflow: "auto",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#212B36" : "#fff",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
        >
          <Close
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#000",
            }}
          />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};

export const LoginModal = ({ children }) => {
  const dispatch = useDispatch();
  const { showLoginModal } = useSelector((state) => state.auth);

  const handleClose = () => {
    dispatch(setShowLoginModal(false));
  };

  return (
    <AuthModal isOpen={showLoginModal} onClose={handleClose}>
      {children}
    </AuthModal>
  );
};

export const RegisterModal = ({ children }) => {
  const dispatch = useDispatch();
  const { showRegisterModal } = useSelector((state) => state.auth);

  const handleClose = () => {
    dispatch(setShowRegisterModal(false));
  };

  return (
    <AuthModal isOpen={showRegisterModal} onClose={handleClose}>
      {children}
    </AuthModal>
  );
};
