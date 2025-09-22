import { Container, Typography } from "@mui/material";
import HomeAdvertisement from "../../../components/common/HomeAdvertisement";
import PricingLayout from "../../../components/pricing/PricingLayout";

export async function generateMetadata() {
  return {
    title: "Pricing | Shothik AI",
    description: "This is the Pricing page",
  };
}

export default function PricingPage() {
  return (
    <PricingLayout
      TitleContend={
        <>
          <Typography
            variant='h3'
            align='center'
            sx={{ color: "error.contrastText" }}
          >
            Our pricing plan made simple.
          </Typography>

          <Typography
            align='center'
            sx={{ color: "error.contrastText", maxWidth: "sm" }}
          >
            Discover the right plan for your needs and take advantage of
            Shothik.ai's powerful tools. Whether you're just getting started or
            need advanced features for your business, we've got you covered.
          </Typography>
        </>
      }
    >
      <Container sx={{ my: { xs: 5, md: 7 } }}>
        <HomeAdvertisement />
      </Container>
    </PricingLayout>
  );
}
