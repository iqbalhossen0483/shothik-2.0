import { Container } from "@mui/material";
import { Suspense } from "react";
import { aidetectorFaq } from "../../../_mock/tools/aidetectorFaq";
import ErrorBoundary from "../../../components/common/ErrorBoundary";
import HomeAdvertisement from "../../../components/common/HomeAdvertisement";
import AiDetector from "../../../components/tools/aidetector/AiDetector";
import ToolsCTA from "../../../components/tools/common/ToolsCTA";
import ToolsSepecigFaq from "../../../components/tools/common/ToolsSepecigFaq";

export async function generateMetadata() {
  return {
    title: "AI Detector || Shothik AI",
    description: "AI Detector description",
  };
}

const Aidetector = () => {
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", gap: { md: 7, xs: 5 } }}
    >
      <ErrorBoundary>
        <Suspense fallback={null}>
          <AiDetector />
        </Suspense>
      </ErrorBoundary>
      <ToolsSepecigFaq
        tag='All you need to know about AI Detector feature'
        data={aidetectorFaq}
      />
      <ToolsCTA toolType='aidetector' />
      <HomeAdvertisement />
    </Container>
  );
};

export default Aidetector;
