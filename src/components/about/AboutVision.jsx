import { Box, Stack, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Image from "next/image";
const brands = ["IBM", "lya", "spotify", "netflix", "hbo", "amazon"];

export default function AboutVision() {
  return (
    <Box sx={{ mt: 10, mb: 5 }}>
      <Box
        sx={{
          mb: 10,
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Image
            alt='about-vision'
            src='/secondary/vision_banner.jpg'
            height={500}
            width={500}
            style={{
              width: "100%",
              borderRadius: "20px",
            }}
          />
        </motion.div>

        <Stack
          direction='row'
          flexWrap='wrap'
          alignItems='center'
          justifyContent='center'
          spacing={3}
          sx={{
            bottom: { xs: 24, md: 40 },
            width: 1,
            opacity: 0.48,
            position: "absolute",
          }}
        >
          {brands.map((logo, i) => (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 * (i + 1) }}
              viewport={{ once: true }}
              key={logo}
            >
              <Image
                alt={logo}
                height={50}
                width={50}
                src={`/brands/ic_brand_${logo.toLowerCase()}.svg`}
              />
            </motion.div>
          ))}
        </Stack>
      </Box>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Typography
          variant='h3'
          sx={{ textAlign: "center", maxWidth: 800, mx: "auto" }}
        >
          Our vision is to revolutionize writing with powerful AI-driven
          assistance, Shothik AI.
        </Typography>
      </motion.div>
    </Box>
  );
}
