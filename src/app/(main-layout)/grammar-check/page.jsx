import { Container } from "@mui/material";
import { grammarfaq } from "../../../_mock/tools/grammarfaq";
import ErrorBoundary from "../../../components/common/ErrorBoundary";
import HomeAdvertisement from "../../../components/common/HomeAdvertisement";
import ToolsCTA from "../../../components/tools/common/ToolsCTA";
import ToolsSepecigFaq from "../../../components/tools/common/ToolsSepecigFaq";
import GrammarContend from "../../../components/tools/grammar/GrammarContend";

export async function generateMetadata() {
  return {
    title: "Grammar || Shothik AI",
    description: "Grammar description",
  };
}

const Grammar = () => {
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", gap: { md: 7, xs: 5 } }}
    >
      <ErrorBoundary>
        <GrammarContend />
      </ErrorBoundary>
      <ToolsSepecigFaq
        tag='All you need to know about Grammar Checker feature'
        data={grammarfaq}
      />
      <ToolsCTA toolType='grammar' />
      <HomeAdvertisement />
    </Container>
  );
};

export default Grammar;
