"use client";

import { alpha, Box, useTheme } from "@mui/material";
import { motion } from "motion/react";
import Image from "next/image";

const CTAImages = ({ lightImage, darkImage, title }) => {
  const theme = useTheme();
  return (
    <Box
      component={motion.div}
      initial={{ x: 30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      sx={{
        position: "relative",
        p: { xs: 2, md: 4 },
      }}
    >
      <Image
        src={theme.palette.mode === "light" ? lightImage : darkImage}
        alt={title}
        width={500}
        height={400}
        objectFit='cover'
        style={{ width:"100%", height:"auto" }}
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: 2,
          boxShadow: `40px -20px 80px ${
            theme.palette.mode === "light"
              ? alpha(theme.palette.grey[500], 0.4)
              : theme.palette.common.black
          }`,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
          },
          [theme.breakpoints.down("md")]: {
            boxShadow: "none",
          },
        }}
      />
    </Box>
  );
};

export default CTAImages;
