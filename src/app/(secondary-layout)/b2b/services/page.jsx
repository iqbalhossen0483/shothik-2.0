import { Container, Stack } from "@mui/material";
import { Suspense } from "react";
import { BookACall } from "../../../../components/b2b/BookACall";
import ServicesContend from "../../../../components/b2b/services/ServicesContend";

export async function generateMetadata() {
  return {
    title: "B2B Services | Shothik AI",
    description: "This is B2B Services page",
  };
}

const Services = () => {
  return (
    <Container>
      <Stack spacing={5}>
        <Suspense fallback={null}>
          <ServicesContend />
        </Suspense>
        <BookACall />
      </Stack>
    </Container>
  );
};

export default Services;
