import { ChevronRight } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import { toolsCta } from "../../../_mock/toolsCta";
import CTAImages from "./CTAImages";

export default function ToolsCTA({ toolType }) {
  const toolConfig = toolsCta[toolType];


  if (!toolConfig) {
    return null;
  }

  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        boxShadow: `0px 7px 88px 19px #22C55E36 inset`,
        backgroundColor: "background.neutral",
        paddingY: 5,
        paddingX: 2,
      }}
    >
      <Grid2 container spacing={3} alignItems='center'>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Description config={toolConfig} />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <CTAImages
            title={toolConfig.title}
            lightImage={toolConfig.image.light}
            darkImage={toolConfig.image.dark}
            sx={{
              img: {
                borderRadius: { xs: "8px", md: "0px" },
                width: { xs: "100%", md: "auto" },
                height: { xs: "auto", md: "auto" },
                aspectRatio: { xs: "1 / 1", md: "unset" },
              },
            }}
          />
        </Grid2>
      </Grid2>

      <TriangleShape />
      <TriangleShape anchor='bottom' />
    </Box>
  );
}

function Description({ config }) {
  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        zIndex: 8,
        width: "100%",
        height: "100%",
        textAlign: { xs: "center", md: "left" },
        position: "relative",
        paddingTop: 2,
        padding: 3,
      }}
    >
      <Typography
        component={motion.p}
        initial={{ x: -35, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        variant='overline'
        sx={{
          textAlign: { md: "left", xs: "center" },
          color: "text.disabled",
        }}
      >
        {config.title}
      </Typography>

      <Typography
        component={motion.div}
        initial={{ x: -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        variant='h3'
        sx={{
          my: 3,
        }}
      >
        {config.heading}
      </Typography>

      <Typography
        component={motion.div}
        initial={{ x: -45, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        sx={{
          mb: 5,
          color: "text.secondary",
        }}
      >
        {config.description}
      </Typography>

      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <Button
          color='inherit'
          size='large'
          variant='contained'
          href={config.buttonLink}
          endIcon={<ChevronRight />}
          sx={{
            bgcolor: "primary.main",
            color: "common.white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          {config.buttonText}
        </Button>
      </motion.div>
    </Box>
  );
}

function TriangleShape({ anchor = "top" }) {
  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        width: 1,
        position: "absolute",
        color: "background.svg",
        zIndex: { xs: 0, md: 9 },
        height: { xs: 40, md: 64 },
        ...(anchor === "bottom" && {
          zIndex: 9,
          bottom: 0,
          top: "unset",
          color: "background.svg",
          transform: "scale(-1)",
        }),
      }}
    >
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 1440 64'
        preserveAspectRatio='none'
      >
        <path d='M1440 0H0L1440 64V0Z' fill='currentColor' />
      </svg>
    </Box>
  );
}
