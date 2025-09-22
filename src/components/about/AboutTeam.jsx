"use client";
import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useRef, useState } from "react";
import Carousel from "react-slick";
import { _socials } from "../../_mock/socials";
import { team } from "../../_mock/team";
import CarouselArrows from "../../resource/carousel/CarouselArrows";

export default function AboutTeam() {
  const [_, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const carouselSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ pb: 10, textAlign: "center" }}>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Typography
          component='p'
          variant='overline'
          sx={{ color: "text.disabled" }}
        >
          DREAM TEAM
        </Typography>
      </motion.div>

      <motion.div
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Typography variant='h2' sx={{ my: 2 }}>
          Great team is the key
        </Typography>
      </motion.div>

      <motion.div
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <Typography
          sx={{
            mx: "auto",
            maxWidth: 640,
            color: "text.secondary",
          }}
        >
          Shothik will provide you support if you have any problems, our support
          team will reply within a day and we also have detailed documentation.
        </Typography>
      </motion.div>

      <Box sx={{ position: "relative", mt: 0 }}>
        <CarouselArrows
          filled
          shape='rounded'
          onNext={handleNext}
          onPrevious={handlePrev}
          sx={{ zIndex: -1 }}
          leftButtonProps={{
            sx: {
              left: 24,
              zIndex: 1,
            },
          }}
          rightButtonProps={{
            sx: {
              right: 24,
              zIndex: 1,
            },
          }}
        >
          <Carousel ref={carouselRef} {...carouselSettings}>
            {team.map((member, index) => (
              <Box key={index} component={motion.div} sx={{ px: 1, py: 10 }}>
                <MemberCard member={member} isFirst={index === 0} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>
    </Box>
  );
}

function MemberCard({ member, isFirst }) {
  const { name, designation, image } = member;

  return (
    <Card
      sx={{
        width: 280,
        height: 430,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
        position: "relative",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: 5,
          transform: "translateY(-5px)",
        },
      }}
    >
      <Image
        alt={name}
        src={image}
        style={{
          borderRadius: "10px",
          width: "100%",
          height: "260px",
          objectFit: "cover",
        }}
        height={400}
        width={250}
      />

      <Typography variant='subtitle1' sx={{ mt: 4, mb: 0.5 }}>
        {name}
      </Typography>

      <Typography variant='body2' sx={{ color: "text.secondary" }}>
        {designation}
      </Typography>

      {isFirst && (
        <Box
          sx={{
            "&:hover": {
              backgroundColor: "#00A76F",
            },
          }}
        >
          <a
            href='https://calendar.google.com/calendar/appointments/schedules/AcZssZ1-0YrraZrcWyTUUrowfsWSDMKPOj57Lt8u9X-NcjC2Oz522EPBGzsD4SjjpkUzwHJOMePNPnbw?gv=true'
            target='_blank'
            rel='noopener noreferrer'
            style={{
              width: "200px",
              padding: "8px 16px",
              backgroundColor: "#00A76F",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              textDecoration: "none",
              position: "absolute",
              top: "63%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: 600,
            }}
          >
            Book an appointment
          </a>
        </Box>
      )}

      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        sx={{
          position: "absolute",
          bottom: 5,
          left: 0,
          right: 0,
          p: 1,
        }}
      >
        {member.social.map((link, index) => {
          const Icon = _socials[index];
          return (
            <IconButton
              key={index}
              href={link}
              target='_blank'
              rel='noopener noreferrer'
            >
              {Icon ? <Icon.icon sx={{ color: Icon.color }} /> : null}
            </IconButton>
          );
        })}
      </Stack>
    </Card>
  );
}
