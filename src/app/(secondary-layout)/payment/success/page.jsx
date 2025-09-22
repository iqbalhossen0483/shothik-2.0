import { CheckCircleRounded } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import NextLink from "next/link";
import PaymentSuccessAndUpdateUser from "../../../../components/payment/PaymentSuccess";

export async function generateMetadata() {
  return {
    title: "Payment Success | Shothik AI",
    description: "This is Bkash payment page",
  };
}

export default function PaymentSuccess() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 2,
        textAlign: "center",
      }}
    >
      <CheckCircleRounded
        sx={{
          color: "green",
          height: 60,
          width: 60,
        }}
      />
      <Typography variant='h4'>Payment Successful</Typography>
      <Typography sx={{ mt: 1, mb: 2 }} variant='body1'>
        Thank you for your payment.
      </Typography>
      <Button
        component={NextLink}
        href='/?utm_source=internal'
        size='large'
        variant='contained'
      >
        Go to Home
      </Button>

      <PaymentSuccessAndUpdateUser />
    </div>
  );
}
