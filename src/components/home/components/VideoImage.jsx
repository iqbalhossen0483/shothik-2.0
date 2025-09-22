"use client";
import { Box } from "@mui/material";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const VideoImage = ({ lightImage, darkImage, width, height }) => {
  const { themeMode } = useSelector((state) => state.settings);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      sx={{
        borderRadius: "70px",
        height: { sm: "380px", lg: "480px" },
        width: { sm: "300px", lg: "400px" },
        overflow: "hidden",
        position: "relative",
        zIndex: 0,
      }}
    >
      <Image
        src={themeMode === "dark" ? darkImage : lightImage}
        style={{
          maxWidth: "100%",
          height: "100%",
          objectFit: "cover",
          backgroundColor: "transparent",
          borderRadius: "70px",
        }}
        alt='Hero video'
        unoptimized
        width={width}
        height={height}
      />
    </Box>
  );
};

export default VideoImage;
