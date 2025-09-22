import { Box, Container, Divider } from "@mui/material";
import FaqForm from "../../../components/faqPage/FaqForm";
import FaqsHero from "../../../components/faqPage/FaqHero";
import FAQ from "../../../components/home/FAG";

export async function generateMetadata() {
  return {
    title: "Faqs | Shothik AI",
    description: "This is FAQ page",
  };
}

export default function FaqsPage() {
  return (
    <>
      <FaqsHero />

      <Container sx={{ pt: 15, pb: 10, position: "relative" }}>
        <Box sx={{ mb: 10, mt: 0 }}>
          <FAQ />

          <Divider />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", sm: "60%" },
            mx: "auto",
          }}
        >
          <FaqForm />
        </Box>
      </Container>
    </>
  );
}
