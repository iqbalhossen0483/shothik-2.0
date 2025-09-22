"use client";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Avatar,
  Box,
  IconButton,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import * as motion from "motion/react-client";
import { useState } from "react";
import { testimonials } from "../../_mock/testimonials";

const StyledDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  width: 10,
  height: 10,
  borderRadius: "50%",
  backgroundColor: active ? "#00D67D" : "#E0E0E0",
  margin: "0 4px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
}));

const NavigationButton = styled(IconButton)({
  width: 40,
  height: 40,
  color: "#00A76F",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#00A76F",
    color: "white",
  },
});

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevious = () => {
    setActiveSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ marginBottom: 6 }}>
      <Typography
        component={motion.h2}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        textAlign='center'
        sx={{
          mb: { xs: 6, md: 8 },
          fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem", lg: "3rem" },
          fontWeight: 700,
          lineHeight: 1.2,
          "& .highlight": {
            color: "#00A76F",
            fontWeight: "inherit",
          },
        }}
      >
        Elevating Client Experiences to
        <br />
        New Heights with{" "}
        <span
          className='highlight'
          style={{
            background: "linear-gradient(135deg, #00A76F 40%, #3A7A69 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Shothik AI
        </span>
      </Typography>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          gap: 6,
          mb: 4,
        }}
      >
        {/* Previous slide (semi-visible) */}
        <Box
          sx={{
            width: 400,
            opacity: 0.5,
            display: { xs: "none", md: "block" },
            transform: "scale(0.9)",
            bgcolor: "white",
            borderRadius: 3,
            p: 4,
            height: 400,
            transition: "all 0.5s ease-in-out",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              transition: "all 0.5s ease-in-out",
            }}
          >
            <Avatar
              src={
                testimonials[
                  (activeSlide - 1 + testimonials.length) % testimonials.length
                ].image
              }
              sx={{
                width: 48,
                height: 48,
                mr: 2,
                transition: "all 0.5s ease-in-out",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                position: "relative",
              }}
            >
              <Box>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{ fontWeight: 500, transition: "all 0.5s ease-in-out" }}
                >
                  {
                    testimonials[
                      (activeSlide - 1 + testimonials.length) %
                        testimonials.length
                    ].name
                  }
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{ transition: "all 0.5s ease-in-out" }}
                >
                  {
                    testimonials[
                      (activeSlide - 1 + testimonials.length) %
                        testimonials.length
                    ].title
                  }
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ mb: 2, fontWeight: 500, transition: "all 0.5s ease-in-out" }}
          >
            {
              testimonials[
                (activeSlide - 1 + testimonials.length) % testimonials.length
              ].headline
            }
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ transition: "all 0.5s ease-in-out" }}
          >
            {
              testimonials[
                (activeSlide - 1 + testimonials.length) % testimonials.length
              ].content
            }
          </Typography>
        </Box>

        {/* Active slide */}
        <Box
          sx={{
            width: { xs: "100%", md: 500 },
            bgcolor: { md: "background.paper" },
            borderRadius: 3,
            py: 4,
            px: { xs: 2, sm: 4 },
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.09)",
            zIndex: 1,
            height: { xs: 400, sm: 300, md: 400, lg: 400, xl: 400 },
            overflow: "hidden",
            transition: "all 0.5s ease-in-out",
            border: "1px solid #ddd",
            "&:hover": {
              boxShadow: 1,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              transition: "all 0.5s ease-in-out",
            }}
          >
            <Avatar
              src={testimonials[activeSlide].image}
              sx={{ width: 48, height: 48, mr: 2 }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                position: "relative",
              }}
            >
              <Box>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  sx={{ fontWeight: 500, transition: "all 0.5s ease-in-out" }}
                >
                  {testimonials[activeSlide].name}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ transition: "all 0.5s ease-in-out" }}
                >
                  {testimonials[activeSlide].title}
                </Typography>
              </Box>
              <Rating
                value={testimonials[activeSlide].rating}
                readOnly
                size='small'
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  "& .MuiRating-iconFilled": {
                    color: "#00A76F",
                  },
                  transition: "all 0.5s ease-in-out",
                }}
              />
            </Box>
          </Box>

          <Typography
            color='text.secondary'
            sx={{
              mb: 2,
              fontSize: { xs: 18, sm: 24, md: 24 },
              fontWeight: 500,
              transition: "all 0.5s ease-in-out",
            }}
          >
            {testimonials[activeSlide].headline}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              fontSize: { xs: 18, sm: 16, md: 16 },
              color: "text.secondary",
              transition: "all 0.5s ease-in-out",
            }}
          >
            {testimonials[activeSlide].content}
          </Typography>
        </Box>

        {/* Next slide (semi-visible) */}
        <Box
          sx={{
            width: 400,
            opacity: 0.5,
            display: { xs: "none", md: "block" },
            transform: "scale(0.9)",
            bgcolor: "white",
            borderRadius: 3,
            p: 4,
            height: 400, // Fixed height for card
            transition: "all 0.5s ease-in-out",
            overflow: "hidden", // Prevent overflow
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              transition: "all 0.5s ease-in-out",
            }}
          >
            <Avatar
              src={testimonials[(activeSlide + 1) % testimonials.length].image}
              sx={{
                width: 48,
                height: 48,
                mr: 2,
                transition: "all 0.5s ease-in-out",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                position: "relative",
              }}
            >
              <Box>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{ fontWeight: 500, transition: "all 0.5s ease-in-out" }}
                >
                  {testimonials[(activeSlide + 1) % testimonials.length].name}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ transition: "all 0.5s ease-in-out" }}
                >
                  {testimonials[(activeSlide + 1) % testimonials.length].title}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ mb: 2, fontWeight: 500, transition: "all 0.5s ease-in-out" }}
          >
            {testimonials[(activeSlide + 1) % testimonials.length].headline}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ transition: "all 0.5s ease-in-out" }}
          >
            {testimonials[(activeSlide + 1) % testimonials.length].content}
          </Typography>
        </Box>
      </Box>

      <Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <NavigationButton onClick={handlePrevious}>
            <ArrowBackIosNewIcon />
          </NavigationButton>

          {testimonials.map((_, index) => (
            <StyledDot
              key={index}
              active={index === activeSlide}
              onClick={() => setActiveSlide(index)}
            />
          ))}

          <NavigationButton onClick={handleNext}>
            <ArrowForwardIosIcon />
          </NavigationButton>
        </Box>
      </Stack>
    </Box>
  );
}
