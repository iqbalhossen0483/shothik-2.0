import { Container, Stack } from "@mui/material";
import { clientImages } from "../../../_mock/b2b/clientImages";
import { features } from "../../../_mock/b2b/features";
import { BookACall } from "../../../components/b2b/BookACall";
import { ClientsSection } from "../../../components/b2b/ClientsSection";
import { FeaturesSection } from "../../../components/b2b/FeaturesSection";
import { HeroSection } from "../../../components/b2b/HeroSection";
import { StatsSection } from "../../../components/b2b/StatsSection";
import { TestimonialsSection } from "../../../components/b2b/TestimonialsSection";
import { WhyChooseUsSection } from "../../../components/b2b/WhyChooseUsSection";

export async function generateMetadata() {
  return {
    title: "B2B | Shothik AI",
    description: "This is B2B page",
  };
}

const B2B = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={7}>
        <HeroSection />
        <StatsSection />
        <WhyChooseUsSection />
        <FeaturesSection
          features={features}
          title='The Features '
          subtitle='of Our Exceptional Service Offerings in Shothik AI'
        />

        <ClientsSection
          images={clientImages}
          subtitle='Fostering Trust, Strengthening Partnerships: '
          title='Our Valuable Clients'
        />
        <TestimonialsSection />
        <BookACall />
      </Stack>
    </Container>
  );
};

export default B2B;
