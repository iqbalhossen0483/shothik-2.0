import { Container } from "@mui/material";
import ErrorBoundary from "../../../components/common/ErrorBoundary";
import ResearchContend from "../../../components/tools/research/ResearchContend";

export async function generateMetadata() {
  return {
    title: "Research || Shothik AI",
    description: "Research description",
  };
}

const Research = () => {
  return (
    <Container>
      <ErrorBoundary>
        <ResearchContend />
      </ErrorBoundary>
    </Container>
  );
};

export default Research;
