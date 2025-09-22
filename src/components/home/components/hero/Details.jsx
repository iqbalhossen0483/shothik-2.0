import { Box, Grid2, Rating, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import React from "react";
import UserActionButton from "./UserActionButton";

const Details = () => {
  return (
    <Grid2 size={{ xs: 12, md: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Typography
          variant='h2'
          sx={{
            fontWeight: 700,
            letterSpacing: "-2%",
            color: "#00A76F",
            background: "linear-gradient(135deg, #00A76F 40%, #3A7A69 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Human Quality{" "}
        </Typography>
        <Typography
          variant='h2'
          sx={{
            fontWeight: 700,
            letterSpacing: "-2%",
            color: "#00A76F",
            background: "linear-gradient(135deg, #00A76F 40%, #3A7A69 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Writing Agent
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Typography variant='body1' color='text.secondary' sx={{ my: 2 }}>
          Paraphrasing, grammar correction, humanized AI writing, translation,
          summarization, or deep research across the web, academic sources, and
          YouTube—Shothik AI ensures natural, accurate, and impactful writing in
          every task.
        </Typography>
      </motion.div>

      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        sx={{
          display: "flex",
          alignItems: "start",
          gap: 1,
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          },
          marginBottom: "16px",
        }}
      >
        <Rating value={5} readOnly color='#00A76F' />
        <Typography sx={{ color: "text.secondary" }}>
          Rated&nbsp;4.9/5&nbsp;| Based on&nbsp;{" "}
          <span style={{ color: "#00A76F", fontWeight: 600 }}>400,000+</span>{" "}
          &nbsp;happy clients
        </Typography>
      </Box>
      <UserActionButton />
    </Grid2>
  );
};

export default Details;
