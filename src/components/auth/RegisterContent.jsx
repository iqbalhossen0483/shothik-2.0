"use client";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useGeolocation from "../../hooks/useGeolocation";
import {
  setShowLoginModal,
  setShowRegisterModal,
} from "../../redux/slice/auth";
import AuthRegisterForm from "./AuthRegisterForm";
import AuthWithSocial from "./AuthWithSocial";

// ----------------------------------------------------------------------

export default function RegisterContent() {
  const [loading, setLoading] = useState(false);
  const { location } = useGeolocation();
  const dispatch = useDispatch();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          marginBottom: 1,
          paddingBottom: { xs: 2 },
          padding: { sm: "2rem 2.5rem" },
        }}
      >
        <AuthRegisterForm country={location} loading={loading} />
        <AuthWithSocial title='up' loading={loading} setLoading={setLoading} />
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
          Already have an account?
        </Typography>

        <Typography
          onClick={() => {
            dispatch(setShowRegisterModal(false));
            dispatch(setShowLoginModal(true));
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
          Sign In
        </Typography>
      </Stack>
    </>
  );
}
