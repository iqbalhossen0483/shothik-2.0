"use client";
import { Box, Grid2, Link, Typography, useTheme } from "@mui/material";
import * as motion from "motion/react-client";
import React from "react";
import { headerInformation } from "../../../_mock/b2b/headerInformantion";
import { informations } from "../../../_mock/b2b/informations";

export const HeroSection = ({ slug }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const information = informations[slug];
  const headerInfo = headerInformation[slug];

  return (
    <Box>
      <Typography
        component={motion.p}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        textAlign='center'
        variant='h2'
        mb={1}
        sx={{ color: isDarkMode ? "common.white" : "#005249" }}
      >
        {headerInfo?.title}
      </Typography>

      {/* Image Section */}
      {headerInfo?.img && (
        <Box
          component={motion.p}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{
            width: "100%",
            display: "block",
            height: {
              xs: "12rem",
              sm: "25rem",
              md: "35rem",
            },
            alignSelf: "stretch",
            overflow: "hidden",
          }}
        >
          <img
            src={headerInfo?.img}
            alt='Workspace'
            style={{
              width: "100%",
              display: "block",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box>
      )}

      {/* Info Section */}
      <Box sx={{ paddingX: 3, paddingY: 2 }}>
        <Grid2 container>
          {information?.map((item, index) => (
            <Grid2
              component={motion.div}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
              viewport={{ once: true }}
              size={{ xs: 12, sm: 6, md: 3 }}
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRight: information.length - 1 !== index ? 2 : 0,
                borderRightColor: "primary.main",
              }}
            >
              {item.description && (
                <Typography
                  variant='h5'
                  fontSize={24}
                  sx={{ color: "primary.main" }}
                >
                  {item.description}
                </Typography>
              )}
              {item.isLink ? (
                <Link href='#'>{item.title}</Link>
              ) : (
                <Typography
                  variant='h5'
                  fontSize={24}
                  sx={{ color: "primary.main" }}
                >
                  {item.title}
                </Typography>
              )}
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};
