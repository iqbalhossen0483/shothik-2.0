import { Box, Container } from "@mui/material";
import Image from "next/image";
import ContactHero from "../../../components/contact-us/ContacHero";
import ContactForm from "../../../components/contact-us/ContactForm";

export async function generateMetadata() {
  return {
    title: "Contact Us | Shothik AI",
    description: "This is Contact Us page",
  };
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <Container sx={{ py: 10 }}>
        <Box
          gap={10}
          display='grid'
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
        >
          <ContactForm />

          <Image
            src='/location.png'
            height={400}
            width={400}
            alt='Location'
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Container>
    </>
  );
}
