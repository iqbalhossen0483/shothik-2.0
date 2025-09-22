import { Box, Stack, Typography } from "@mui/material";
import AuthForgotPasswordForm from "../../../../components/auth/AuthForgotPasswordForm";
import ReturnToHome from "../../../../components/auth/components/ReturnToHome";
import Logo from "../../../../resource/assets/Logo";
import PasswordIcon from "../../../../resource/assets/PasswordIcon";

// ----------------------------------------------------------------------
export async function generateMetadata() {
  return {
    title: "Reset Password || Shothik AI",
    description: "Reset Password page",
  };
}

export default function ResetPasswordPage() {
  return (
    <Stack sx={{ backgroundColor: "background.neutral" }}>
      <Box
        component='header'
        sx={{
          height: { xs: 50, sm: 80 },
          padding: { sm: 3, xs: 1 },
          backgroundColor: "background.paper",
        }}
      >
        <Logo />
      </Box>
      <Stack
        sx={{ height: { xs: "calc(100vh - 50px)", sm: "calc(100vh - 80px)" } }}
        alignItems='center'
        justifyContent='center'
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "500px" },
            padding: 2,
            backgroundColor: "background.paper",
            borderRadius: 3,
            boxShadow: 4,
            textAlign: "center",
          }}
        >
          <PasswordIcon sx={{ mb: 5, height: 96 }} />
          <Typography variant='h3'>Reset your password</Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Please enter the password
          </Typography>

          <AuthForgotPasswordForm />

          <ReturnToHome />
        </Box>
      </Stack>
    </Stack>
  );
}
