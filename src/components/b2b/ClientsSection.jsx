import { Box, Grid2, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Link from "next/link";

export const ClientsSection = ({ title, images, subtitle }) => {
  return (
    <Box>
      <Typography
        component={motion.p}
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        sx={{
          textAlign: "center",
          fontSize: { xs: "2rem", md: "3rem" },
          fontWeight: 600,
          lineHeight: { xs: "2.5rem", md: "3.9rem" },
          width: { xs: "100%", md: "60.625rem" },
          margin: "0 auto",
          mb: { xs: "2rem", md: "3rem" },
        }}
      >
        {subtitle}
        <Typography
          variant='h2'
          fontWeight={600}
          component='span'
          color='primary.darker'
        >
          {title}
        </Typography>
      </Typography>
      <Grid2 container spacing={2}>
        {images.map((item, index) => (
          <Grid2
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
            viewport={{ once: true }}
            size={{ xs: 12, sm: 6, md: 4 }}
            key={index}
          >
            <Link href={item.href ?? "/"}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  backgroundImage: item.img,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 1,
                  width: "100%",
                  height: 300,
                }}
              />
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};
