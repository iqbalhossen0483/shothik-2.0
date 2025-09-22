"use client";
import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginModal } from "../../../../redux/slice/auth";

const UserActionButton = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const packageName = user?.package;
  const userMsg = !packageName ? "Sign up for free" : "Explore the Features";

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <Button
        variant='contained'
        size='large'
        sx={{
          maxWidth: "fit-content",
          borderRadius: "0.5rem",
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          py: 1.3,
        }}
        onClick={() => {
          if (user?.email) {
            router.push("/paraphrase");
          } else {
            dispatch(setShowLoginModal(true));
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              lineHeight: "1.5rem",
              letterSpacing: "-2%",
            }}
          >
            {userMsg}
          </Typography>
          <ArrowForward style={{ height: "1.25rem", width: "1.25rem" }} />
        </Box>
      </Button>
    </motion.div>
  );
};

export default UserActionButton;
