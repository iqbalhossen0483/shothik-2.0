import { Grid2, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Image from "next/image";
import { whyChooseUs } from "../../_mock/b2b/whychooseusdata";

export const WhyChooseUsSection = () => (
  <Grid2
    container
    sx={{
      bgcolor: "primary.darker",
      color: "common.white",
      height: { xs: "auto", md: "40rem" },
      pt: { xs: 4, md: 0 },
    }}
  >
    <Grid2
      size={{ xs: 12, md: 4 }}
      sx={{
        p: { xs: 4, md: 10 },
        borderRight: { md: 1 },
        borderColor: { md: "divider" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderBottom: { xs: 1, md: 0 },
      }}
    >
      <Typography
        component={motion.p}
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        variant='h1'
        sx={{
          color: "common.white",
          fontSize: { xs: "3rem", md: "6rem" },
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "normal",
          textAlign: "center",
        }}
      >
        Why{" "}
        <Image
          src='/b2b/icon-1.svg'
          alt='icon'
          width={24}
          height={24}
          style={{
            display: "inline-block",
            width: "3.5rem",
            height: "3.5rem",
            flexShrink: 0,
            strokeWidth: "2.5px",
            stroke: "#FFF",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />{" "}
        choose us?
      </Typography>
    </Grid2>
    <Grid2 size={{ xs: 12, md: 8 }} sx={{ width: "100%", height: "100%" }}>
      <Grid2 container sx={{ width: "100%", height: "100%" }}>
        {whyChooseUs.map((item, index) => (
          <Grid2
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
            viewport={{ once: true }}
            size={{ xs: 12, md: 6 }}
            key={index}
            sx={{
              p: 4,
              borderBottom: 1,
              borderRight: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image src={item.icon} alt={item.title} width={60} height={45} />
            <Typography
              variant='h4'
              sx={{
                mt: "2rem",
                mb: "1rem",
                textAlign: "center",
                color: "#FFF",
                fontFamily: "Public Sans",
                fontSize: { xs: "1.5rem", md: "1.75rem" },
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "normal",
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant='body2'
              textAlign={"center"}
              sx={{
                color: "#D3D3D3",
                textAlign: "center",
                fontFamily: "Public Sans",
                fontSize: { xs: "0.875rem", md: "0.9375rem" },
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                width: { xs: "auto", md: "22.75rem" },
                height: { xs: "auto", md: "3.8125rem" },
                flexShrink: 0,
              }}
            >
              {item.content}
            </Typography>
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  </Grid2>
);
