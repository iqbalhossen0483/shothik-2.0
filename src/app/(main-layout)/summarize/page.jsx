import { Container } from "@mui/material";
import { summarizeFaq } from "../../../_mock/tools/summarizefaq";
import ErrorBoundary from "../../../components/common/ErrorBoundary";
import HomeAdvertisement from "../../../components/common/HomeAdvertisement";
import ToolsCTA from "../../../components/tools/common/ToolsCTA";
import ToolsSepecigFaq from "../../../components/tools/common/ToolsSepecigFaq";
import SummarizeContend from "../../../components/tools/summarize/Summarize";

export async function generateMetadata() {
  return {
    title: "Summarize | Shothik AI",
    description: "This is Summarize page",
  };
}

const Summarize = () => {
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", gap: { md: 7, xs: 5 } }}
    >
      <ErrorBoundary>
        <SummarizeContend />
      </ErrorBoundary>
      <ToolsSepecigFaq
        tag='All you need to know about Summarize feature'
        data={summarizeFaq}
      />
      <ToolsCTA toolType='summarize' />
      <HomeAdvertisement />
    </Container>
  );
};

export default Summarize;
