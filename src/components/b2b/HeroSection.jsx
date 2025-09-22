"use client";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import Carousel from "react-slick";
import { carousels } from "../../_mock/b2b/carousels";
import useResponsive from "../../hooks/useResponsive";

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useResponsive("down", "sm");

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    beforeChange: (_, newIndex) => setCurrentSlide(newIndex),
    appendDots: (dots) => (
      <Box
        sx={{
          position: "absolute",
          backgroundColor: "transparent",
          borderRadius: "16px",
          padding: { xs: "5px 10px", sm: "10px 20px" },
          width: { xs: "100%", sm: "20%", md: "12%" },
          position: "absolute",
          top: "95%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ul
          style={{
            margin: 0,
            padding: 0,
            display: "flex",
            gap: ".3125rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {dots}
        </ul>
      </Box>
    ),
    customPaging: (i) => (
      <Box
        sx={{
          width: { xs: 8, sm: 12 },
          height: { xs: 8, sm: 12 },
          backgroundColor: i === currentSlide ? "common.white" : "gray",
          borderRadius: "50%",
          display: "inline-block",
          transition: "background-color 0.3s ease",
          position: "relative",
        }}
      />
    ),
  };

  return (
    <Carousel {...sliderSettings}>
      {carousels.map((item, index) => (
        <Box
          key={index}
          sx={{
            height: 500,
            py: { xs: 2, sm: 3, md: 0 },
            position: "relative",
            display: "flex",
            alignItems: "center",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            flexShrink: 0,
          }}
        >
          <Stack
            direction='column'
            justifyContent='center'
            gap={2}
            sx={{
              px: { xs: 2, sm: 4 },
              py: { xs: 2, sm: 5 },
              width: "100%",
              height: "100%",
            }}
          >
            <Typography
              sx={{
                color: "common.white",
                fontFamily: "Public Sans",
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3.875rem" },
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: { xs: "1.2", md: "normal" },
              }}
            >
              {item?.title}
            </Typography>
            <Typography
              sx={{
                color: "common.white",
                fontFamily: "Public Sans",
                fontSize: { xs: "0.875rem", sm: "0.9375rem", md: "1rem" },
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: { xs: "1.5", md: "normal" },
                paddingRight: { xs: 0, sm: "8rem", md: "16rem" },
              }}
            >
              {item.description}
            </Typography>
            <Stack direction='row' alignItems='center' flexWrap='wrap' gap={2}>
              {item.buttons.map((button, buttonIndex) => (
                <Link
                  key={buttonIndex}
                  href={button.href}
                  style={{
                    textDecoration: "none",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  <Button
                    key={buttonIndex}
                    variant={button.variant}
                    sx={{
                      ...(button.primary && {
                        backgroundColor: "primary.darker",
                        color: "common.white",
                      }),
                      ...(!button.primary && {
                        color: "common.white",
                        borderColor: "common.white",
                        "&:hover": { borderColor: "primary.darker" },
                      }),
                      width: { xs: "8.375rem", sm: "12.625rem" },
                      padding: { xs: "0.625rem", sm: "1rem" },
                      color: "common.white",
                    }}
                    endIcon={button.primary ? <ArrowForwardIcon /> : null}
                  >
                    {button.label}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Stack>
        </Box>
      ))}
    </Carousel>
  );
};
