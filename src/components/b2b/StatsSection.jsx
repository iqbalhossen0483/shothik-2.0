import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "157", label: "Satisfied Clients" },
  { value: "54", label: "Countries" },
];

export const StatsSection = () => {
  return (
    <Grid2 container>
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{
          borderRight: { md: 1 },
          borderColor: { md: "divider" },
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "2rem",
          paddingRight: { md: 2 },
        }}
      >
        <Stack direction='column' justifyContent='center' gap={1}>
          <Typography
            component={motion.p}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            variant='h3'
          >
            Powering Smarter, Safer & More Efficient Business Operations
          </Typography>
          <Typography
            component={motion.p}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            variant='body1'
          >
            At Shothik.ai, we don't just offer solutions—we transform businesses
            with AI-driven efficiency, security, and innovation. Whether it's
            travel, fashion, trade, or healthcare, we ensure seamless
            automation, data-driven decision-making, and operational excellence.
          </Typography>
          <Box
            component={motion.p}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href='#services'>
              <Button
                variant='contained'
                sx={{ backgroundColor: "primary.darker" }}
                endIcon={<ArrowForward />}
                size='large'
              >
                Services
              </Button>
            </Link>
          </Box>
        </Stack>
        <Grid2 container>
          {stats.map((stat, index) => (
            <Grid2
              component={motion.div}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
              viewport={{ once: true }}
              size={{ xs: 4 }}
              key={stat.value}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRight: index !== stats.length - 1 ? 1 : 0,
                borderColor: "divider",
                py: { xs: 2, md: 0 },
              }}
            >
              <Typography variant='h3' align='center'>
                {stat.value}
              </Typography>
              <Typography variant='body2' align='center'>
                {stat.label}
              </Typography>
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
      <Grid2
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        size={{ xs: 12, md: 6 }}
      >
        <Stack
          component={motion.div}
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          sx={{
            width: { xs: "100%", sm: "80%" },
            height: { xs: "100%", sm: "80%" },
            borderRadius: { xs: 2, sm: 5 },
            overflow: "hidden",
            mt: { xs: 2, md: 0 },
          }}
        >
          <Image
            src='/b2b/image1.png'
            alt='Business solutions'
            width={450}
            height={450}
            objectFit='cover'
            style={{ width: "100%", height: "100%" }}
          />
        </Stack>
      </Grid2>
    </Grid2>
  );
};
