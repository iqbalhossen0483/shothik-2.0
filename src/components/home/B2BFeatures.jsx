import { Box, Grid2, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import ViewMoreButton from "./components/b2b/ViewMoreButton";
import BgContainer from "./components/hero/BgContainer";

export default function B2bFeatures() {
  return (
    <BgContainer
      sx={{ py: 8, px: { xs: 2, sm: 4, md: 6 } }}
      image='url(/home/b2b-background.png)'
    >
      <Box
        component={motion.div}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        fontSize={{ xs: "1.8rem", sm: "2rem", md: "3rem", lg: "3rem" }}
        textAlign='center'
        fontWeight='bold'
        marginBottom={{ xs: 8, sm: 6 }}
        sx={{
          lineHeight: 1.2,
          color: "#fff",
          "& > span": {
            display: "block",
          },
        }}
      >
        Shothik AI Solutions for Businesses
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography
            component='span'
            variant='inherit'
            sx={{
              background: "linear-gradient(135deg, #00A76F 0%, #00A76F 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tailored for B2B Innovation
          </Typography>
        </Box>
      </Box>

      <Grid2 container alignItems='center'>
        <Grid2
          size={{ xs: 12, sm: 6, md: 6 }}
          component={motion.div}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography
                variant='h3'
                fontWeight='bold'
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.3rem", md: "2rem" },
                  lineHeight: 1.2,
                  color: "#fff",
                }}
              >
                Transform Your Business with <br />
                <Typography
                  component='span'
                  variant='inherit'
                  fontWeight='bold'
                  color='#00A76F'
                >
                  AI-Powered Solutions
                </Typography>
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant='body1' color='#fff' sx={{ marginTop: 2 }}>
              Leverage cutting-edge AI solutions to optimize your business
              processes, enhance productivity, and drive innovation across your
              organization.
            </Typography>
          </Box>
          <Box style={{ marginTop: 30 }}>
            <ViewMoreButton />
          </Box>
        </Grid2>
      </Grid2>
    </BgContainer>
  );
}
