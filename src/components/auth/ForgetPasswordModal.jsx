import { ChevronLeft, Close } from "@mui/icons-material";
import { Box, IconButton, Link, Modal, Stack, Typography } from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setShowForgotPasswordModal } from "../../redux/slice/auth";
import PasswordIcon from "../../resource/assets/PasswordIcon";
import AuthResetPasswordForm from "./AuthResetPasswordForm";

// ----------------------------------------------------------------------

export default function ForgetPasswordModal() {
  const dispatch = useDispatch();
  const { showForgotPasswordModal } = useSelector((state) => state.auth);

  const handleClose = () => {
    dispatch(setShowForgotPasswordModal(false));
  };

  return (
    <>
      <Head>
        <title>Reset Password | Shothik AI</title>
      </Head>

      <Modal
        open={showForgotPasswordModal}
        onClose={handleClose}
        aria-labelledby='forgot-password-title'
        sx={{ zIndex: 9999 }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <Close />
          </IconButton>

          {/* Modal Content */}
          <Stack alignItems='center' spacing={2}>
            <PasswordIcon sx={{ mb: 2, height: 96 }} />

            <Typography id='forgot-password-title' variant='h4' paragraph>
              Forgot your password?
            </Typography>

            <Typography sx={{ color: "text.secondary", textAlign: "center" }}>
              Please enter the email address associated with your account, and
              we will email you a link to reset your password.
            </Typography>

            <AuthResetPasswordForm />

            <Link
              component={NextLink}
              href='#'
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
              color='inherit'
              variant='subtitle2'
              sx={{
                mt: 3,
                mx: "auto",
                alignItems: "center",
                display: "inline-flex",
                cursor: "pointer",
              }}
            >
              <ChevronLeft fontSize='small' />
              Return to sign in
            </Link>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
