import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import { officeAddress } from "../../_mock/officeAdress";

export default function ContactHero() {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: "url(/overlay_1.svg), url(/cotact-hero.jpg)",
        paddingX: { xs: 4, sm: 6, md: 10 },
        paddingY: 10,
        height: { xs: "auto", sm: 560 },
      }}
    >
      <Container>
        <Box>
          <Stack direction='row' sx={{ color: "primary.main" }}>
            {["W", "h", "e", "r", "e"].map((w, i) => (
              <Typography
                variant='h1'
                key={i}
                component={motion.span}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 * (i + 1) }}
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
            {["to", "find", "us?"].map((w, i) => (
              <Typography
                component={motion.p}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 * (i + 1) }}
                variant='h1'
                key={i}
              >
                {w}
              </Typography>
            ))}
          </Stack>

          <Grid2 container spacing={5} sx={{ mt: 3, color: "common.white" }}>
            {officeAddress.map((office, i) => (
              <Grid2
                key={office.name}
                size={{ xs: 12, sm: 6 }}
                sx={{ pr: { md: 5 } }}
                component={motion.div}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 * (i + 1) }}
              >
                <Typography variant='h6'>{office.name}</Typography>
                <Typography variant='body2'>{office.address}</Typography>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
}
