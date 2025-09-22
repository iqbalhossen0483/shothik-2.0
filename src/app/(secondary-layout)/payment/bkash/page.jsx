import { Box, Container, Typography } from "@mui/material";
import React from "react";
import BkashPyament from "../../../../components/payment/BkashPayment";

export async function generateMetadata() {
  return {
    title: "Payment With Bkash | Shothik AI",
    description: "This is Bkash payment page",
  };
}

const BkashPyamentPage = () => {
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
        <BkashPyament />
      </Box>
    </Container>
  );
};

export default BkashPyamentPage;
