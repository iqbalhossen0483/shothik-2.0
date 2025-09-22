import { Box, Button, Grid2, Typography } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginModal } from "../../redux/slice/auth";

const BottomCard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Grid2 container spacing={4} sx={{ mt: 6 }}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant='h5' gutterBottom>
            Shothik AI for Writing Solutions
          </Typography>
          <Typography variant='body2'>
            Unleash the power of advanced AI tools — streamline your content
            creation, perfect grammar, and generate high-quality summaries with
            ease, all while scaling your projects effortlessly.
          </Typography>
          <Link href='/paraphrase'>
            <Button
              variant='outlined'
              sx={{
                color: "white",
                borderColor: "white",
                textTransform: "none",
                mt: 1,
              }}
            >
              View all tools
            </Button>
          </Link>
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            bgcolor: "#E8F6FF",
            color: "black",
            p: 3.5,
            borderRadius: 2,
          }}
        >
          <Typography variant='h5' gutterBottom>
            {user?.email ? "Explore the features" : "Get started for free"}
          </Typography>
          <Typography variant='body2'>
            {user?.email
              ? "Welcome back! Explore the full range of Shothik AI's advanced tools to elevate your writing even further. Take your content creation to the next level with AI-powered paraphrasing, grammar refinement, and more!"
              : "Sign up and explore all the advanced tools of Shothik AI to enhance your writing."}
          </Typography>
          <Button
            onClick={() => {
              if (user?.email) {
                router.push("/paraphrase");
              } else {
                dispatch(setShowLoginModal(true));
              }
            }}
            variant='contained'
            color='primary'
            sx={{ textTransform: "none", mt: 1 }}
          >
            {user?.email ? "Explore" : "Get started"}
          </Button>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default BottomCard;
