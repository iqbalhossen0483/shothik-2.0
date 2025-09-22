import { Button, Stack, Typography } from "@mui/material";
import PageNotFoundIllustration from "../resource/assets/notFound";

export const metadata = {
  title: "404 Page Not Found | Shothik AI",
  description:
    "Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?",
};

export default function NotFound() {
  return (
    <Stack sx={{ height: "100vh" }} alignItems='center' justifyContent='center'>
      <Typography variant='h3' sx={{ animation: "fadeIn 1s ease-in-out" }}>
        Sorry, page not found!
      </Typography>

      <Typography
        sx={{ color: "text.secondary", animation: "fadeIn 1.2s ease-in-out" }}
      >
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
        mistyped the URL? Be sure to check your spelling.
      </Typography>

      <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />

      <Button component='a' href='/' size='large' variant='contained'>
        Go to Home
      </Button>
    </Stack>
  );
}
