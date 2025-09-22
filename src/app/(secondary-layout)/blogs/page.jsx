import { Container } from "@mui/material";
import BlogContainer from "../../../components/blog/BlogContainer";

export async function generateMetadata() {
  return {
    title: "Blogs | Shothik AI",
    description: "This is Blogs page",
  };
}

export default function Blogs() {
  return (
    <Container
      sx={{
        py: 4,
        mb: 4,
      }}
    >
      <BlogContainer />
    </Container>
  );
}
