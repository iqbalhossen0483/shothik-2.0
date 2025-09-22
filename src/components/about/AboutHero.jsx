import { Container, Stack, Typography } from "@mui/material";
import * as motion from "motion/react-client";

export default function AboutHero() {
  return (
    <Stack
      sx={{
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: "url(/overlay_1.svg), url(/secondary/who.jpg)",
        paddingX: { xs: 4, sm: 6, md: 10 },
        paddingY: 10,
        height: 560,
      }}
      justifyContent='end'
    >
      <Container>
        <Stack direction='row' alignItems='center' spacing={0.2}>
          {["W", "h", "o"].map((w, i) => (
            <Typography
              key={w}
              component={motion.p}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 * (i + 1) }}
              variant='h1'
              color='primary.main'
            >
              {w}
            </Typography>
          ))}
        </Stack>
        <Stack
          spacing={2}
          display='inline-flex'
          direction='row'
          sx={{ color: "common.white" }}
        >
          {["we", "are?"].map((w, i) => (
            <Typography
              key={w}
              component={motion.p}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 * (i + 1) }}
              variant='h1'
            >
              {w}
            </Typography>
          ))}
        </Stack>
        <Typography
          component={motion.p}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          sx={{ color: "common.white" }}
          variant='h4'
        >
          Let's work together and <br /> make awesome writing easily
        </Typography>
      </Container>
    </Stack>
  );
}
