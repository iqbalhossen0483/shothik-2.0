import { Container, Stack, Typography } from "@mui/material";
import * as motion from "motion/react-client";

export default function FaqsHero() {
  return (
    <Stack
      sx={{
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: "url(/overlay_1.svg), url(/secondary/hero.jpg)",
        paddingX: { xs: 4, sm: 6, md: 10 },
        paddingY: 10,
        height: 560,
      }}
      justifyContent='end'
    >
      <Container>
        <Stack direction='row' alignItems='center' spacing={0.2}>
          {["H", "o", "w"].map((w, i) => (
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
          {["can", "we", "help", "you?"].map((w, i) => (
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
      </Container>
    </Stack>
  );
}
