"use client";
import { useTheme } from "@mui/material";
import Image from "next/legacy/image";
import React from "react";

const CTAImage = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Image
        src={
          theme.palette.mode === "dark"
            ? "/home/cta-dark.png"
            : "/home/cta-light.png"
        }
        alt='Sample illustration'
        layout='fill'
        objectFit='contain'
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
};

export default CTAImage;
