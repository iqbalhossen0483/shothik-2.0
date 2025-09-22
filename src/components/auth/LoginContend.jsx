"use client";
import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowLoginModal,
  setShowRegisterModal,
} from "../../redux/slice/auth";
import AuthLoginForm from "./AuthLoginForm";
import AuthWithSocial from "./AuthWithSocial";
import ForgetPasswordModal from "./ForgetPasswordModal";

const LoginContend = () => {
  const [loading, setLoading] = useState(false);
  const { showForgotPasswordModal } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          padding: { sm: "2rem 2.5rem" },
          borderRadius: 2,
          marginBottom: 1,
        }}
      >
        <AuthLoginForm loading={loading} setLoading={setLoading} />
        <AuthWithSocial loading={loading} setLoading={setLoading} />
      </Box>

      <Stack direction='row' justifyContent='center' spacing={0.5}>
        <Typography
          variant='body2'
          sx={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            color: "text.secondary",
          }}
        >
          Don't have an account?
        </Typography>

        <Typography
          onClick={() => {
            dispatch(setShowLoginModal(false));
            dispatch(setShowRegisterModal(true));
          }}
          variant='body2'
          sx={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            color: "#00AB55",
            fontWeight: "600",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Sign Up
        </Typography>
      </Stack>
      {showForgotPasswordModal && <ForgetPasswordModal />}
    </>
  );
};

export default LoginContend;
