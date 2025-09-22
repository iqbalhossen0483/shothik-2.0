import { Box } from "@mui/material";
import React from "react";

const DotFlashing = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "8px",
          height: "8px",
          borderRadius: "4px",
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.main,
          animation: "dotFlashing 1s infinite linear alternate",
          animationDelay: "0.5s",

          "&::before, &::after": {
            content: '""',
            display: "inline-block",
            position: "absolute",
            top: 0,
          },

          "&::before": {
            left: "-12px",
            width: "8px",
            height: "8px",
            borderRadius: "4px",
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.main,
            animation: "dotFlashing 1s infinite alternate",
            animationDelay: "0s",
          },

          "&::after": {
            left: "12px",
            width: "8px",
            height: "8px",
            borderRadius: "4px",
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.main,
            animation: "dotFlashing 1s infinite alternate",
            animationDelay: "1s",
          },

          "@keyframes dotFlashing": {
            "0%": {
              backgroundColor: (theme) => theme.palette.primary.main,
            },
            "50%, 100%": {
              backgroundColor: (theme) => theme.palette.primary.light,
            },
          },
        }}
      />
    </Box>
  );
};

export default DotFlashing;
