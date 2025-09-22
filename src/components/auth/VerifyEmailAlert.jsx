import { Alert, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSnackbar from "../../hooks/useSnackbar";
import { useSendVerifyEmailMutation } from "../../redux/api/auth/authApi";

const VerifyEmailAlert = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [sent, setSent] = useState(false);

  const showVerifyModal = !user?.is_verified;

  const resendEmail = router.pathname === "/auth/resend-email";
  const email = resendEmail ? router.query?.email : user?.email;
  const message = sent
    ? `A verification email has been sent to ${email}. Please check your inbox.`
    : "Your account is not verified yet. Verify your mail to write with confidence.";
  const action = sent ? "Resend" : "Verify";

  const [sendVerificationEmail, { isLoading }] = useSendVerifyEmailMutation();
  const enqueueSnackbar = useSnackbar();

  const handleVerify = async () => {
    try {
      const result = await sendVerificationEmail({ email: user?.email });
      if (result.data.success) {
        setSent(true);
        enqueueSnackbar("Sent a verification email to " + user.email + ".");
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Sorry, something went wrong. Please try again.");
    }
  };

  return email && showVerifyModal ? (
    <Box sx={{ position: "relative", px: { xs: 2, sm: 0 }, mb: 2 }}>
      <Alert
        severity='warning'
        action={
          <Button
            color='warning'
            variant='contained'
            size='small'
            disabled={isLoading}
            onClick={handleVerify}
            sx={{ zIndex: 1000 }}
          >
            {action}
          </Button>
        }
        sx={{ "& .MuiAlert-message": { whiteSpace: "wrap" } }}
      >
        {message}
      </Alert>
    </Box>
  ) : null;
};

export default VerifyEmailAlert;
