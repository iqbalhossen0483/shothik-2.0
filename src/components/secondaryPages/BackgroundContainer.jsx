"use client";
import { Box, Container, useTheme } from "@mui/material";

const BackgroundContainer = ({ children }) => {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        pt: 6,
        pb: 1,
        bgcolor: dark ? "grey.800" : "grey.200",
      }}
    >
      <Container>{children}</Container>
    </Box>
  );
};

export default BackgroundContainer;
