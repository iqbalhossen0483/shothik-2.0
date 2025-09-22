import { Container, Divider } from "@mui/material";
import AboutHero from "../../../components/about/AboutHero";
import AboutTeam from "../../../components/about/AboutTeam";
import AboutVision from "../../../components/about/AboutVision";
import AboutWhat from "../../../components/about/AboutWhat";

export async function generateMetadata() {
  return {
    title: "About us | Shothik AI",
    description: "This is About us page",
  };
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Container>
        <AboutWhat />
        <AboutVision />
        <Divider
          orientation='horizontal'
          sx={{ mt: 3, mb: 0.5, mx: "auto", width: 100, height: 2 }}
        />
        <Divider
          orientation='horizontal'
          sx={{ mb: 3, mx: "auto", width: 100, height: 2 }}
        />
        <AboutTeam />
      </Container>
    </>
  );
}
