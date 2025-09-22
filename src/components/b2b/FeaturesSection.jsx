import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Link from "next/link";

export const FeaturesSection = ({ features, title, subtitle }) => {
  return (
    <Box id='services'>
      <Typography
        component={motion.div}
        initial={{ x: -100, opacity: 0 }}
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
        <Typography
          variant='h2'
          fontWeight={600}
          component='span'
          color='primary.darker'
        >
          {title}
        </Typography>
        {subtitle}
      </Typography>
      <Grid2 container spacing={2}>
        {features?.map((feature, index) => {
          if (feature.image) {
            return (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Link href='/b2b'>
                  <Box
                    sx={{
                      cursor: "pointer",
                      p: 3,
                      height: "100%",
                      minHeight: 200,
                      margin: "0 auto",
                      maxWidth: { xs: "100%", md: "25.98031rem" },
                      width: "100%",
                      bgcolor: "background.paper",
                      backgroundImage: feature?.image,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform 0.3s ease-in-out",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  />
                </Link>
              </Grid2>
            );
          }
          return (
            <Grid2
              component={motion.div}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 * (index + 1) }}
              viewport={{ once: true }}
              size={{ xs: 12, sm: 6, md: 4 }}
              key={index}
              sx={{
                bgcolor: "primary.darker",
                color: "common.white",
                borderRadius: 1,
                "&:hover": {
                  boxShadow: 2,
                  backgroundColor: "primary.dark",
                  "& .titleBox::after": {
                    width: "50%",
                    borderColor: "primary.light",
                  },
                  "& .number": {
                    color: "#FFF",
                  },
                },
                display: "flex",
                padding: "1.0135rem 2rem",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "1.5rem",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Typography
                variant='h3'
                className='number'
                sx={{
                  color: "primary.dark",
                  fontWeight: 700,
                }}
              >
                {index < 9 ? `0${index + 1}` : index + 1}
              </Typography>
              <Box
                className='titleBox'
                sx={{
                  mt: 1,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "10%",
                    left: ".0631rem",
                    borderWidth: ".0625rem",
                    borderStyle: "solid",
                    borderColor: "primary.dark",
                  },
                }}
              >
                <Typography variant='h4'>{feature.title}</Typography>
              </Box>
              <Typography variant='body2'>{feature.content}</Typography>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <Link href={`/b2b/services?slug=${feature.slug}`}>
                  <Button
                    variant='outlined'
                    sx={{
                      backgroundColor: "primary.darker",
                      borderColor: "primary.dark",
                      height: 40,
                      px: 2,
                    }}
                    endIcon={<ArrowForward />}
                    size='large'
                  >
                    Read more
                  </Button>
                </Link>
              </Box>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
};
