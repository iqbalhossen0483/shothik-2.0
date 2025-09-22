import { WarningRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import NextLink from "next/link";

export async function generateMetadata() {
  return {
    title: "Payment Faild | Shothik AI",
    description: "This is Bkash payment page",
  };
}

export default function PaymentFailed() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 2,
        textAlign: "center",
      }}
    >
      <>
        <WarningRounded
          sx={{
            color: "red",
            width: 60,
            height: 60,
          }}
        />

        <Typography variant='h4'>Failed</Typography>
        <Typography sx={{ my: 2 }} variant='body1'>
          We're sorry, but your payment could not be processed.
        </Typography>

        <Button
          component={NextLink}
          href='/?utm_source=internal'
          size='large'
          variant='contained'
        >
          Go to Home
        </Button>
      </>
    </Box>
  );
}
