import { Box, Container, Typography } from "@mui/material";
import React from "react";
import StripePayment from "../../../../components/payment/StripePayment";

export async function generateMetadata() {
  return {
    title: "Payment With Stripe | Shothik AI",
    description: "This is Stripe payment for international payment system",
  };
}

const StripePyamentPage = () => {
  return (
    <Container
      sx={{
        pt: 10,
        pb: 10,
        minHeight: 1,
      }}
    >
      <Typography variant='h3' align='center'>
        {`Let's finish powering you up!`}
      </Typography>

      <Typography align='center' sx={{ color: "text.secondary", mb: 5 }}>
        Professional plan is right for you.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StripePayment />
      </Box>
    </Container>
  );
};

export default StripePyamentPage;
