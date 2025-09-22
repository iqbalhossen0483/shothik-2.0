import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Link from "next/link";
import React from "react";

export const BookACall = () => {
  return (
    <Box
      sx={{
        padding: { xs: "1rem", md: "4rem" },
        backgroundColor: "primary.darker",
        color: "common.white",
      }}
    >
      <Grid2 container justifyContent='space-between'>
        <Grid2
          component={motion.div}
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mb: { xs: 2, md: 0 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 600,
              lineHeight: { xs: "2rem", md: "2.9375rem" },
              width: { xs: "100%", md: "60%" },
            }}
          >
            Book a call with our Excellent Team
          </Typography>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              height: 2,
              bgcolor: "common.white",
            }}
          />
        </Grid2>
        <Grid2
          component={motion.div}
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1.5625rem",
            alignContent: "center",
            height: "100%",
          }}
        >
          <Typography variant='body1'>
            Book a 15-minute call with our team to discuss your business goals
          </Typography>
          <Link href='/contact-us' style={{ textDecoration: "none" }}>
            <Button
              variant='contained'
              color='primary'
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: "primary.lighter",
                color: "primary.darker",
                height: 40,
              }}
            >
              Book a Discovery Call
            </Button>
          </Link>
        </Grid2>
      </Grid2>
    </Box>
  );
};
