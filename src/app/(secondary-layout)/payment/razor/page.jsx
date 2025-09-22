import { Box, Container, Typography } from "@mui/material";
import RazorPayPayment from "../../../../components/payment/RazorPayPayment";

export async function generateMetadata() {
  return {
    title: "Payment With Razor Pay | Shothik AI",
    description: "This is Razor payment page",
  };
}

const RazorPyamentPage = () => {
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
        <RazorPayPayment />
      </Box>
    </Container>
  );
};

export default RazorPyamentPage;
