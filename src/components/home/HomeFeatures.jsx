import { Box, Grid2, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import BgContainer from "./components/hero/BgContainer";
import UserActionButton from "./components/hero/UserActionButton";
import VideoImage from "./components/VideoImage";

export default function HomeFeatures() {
  return (
    <BgContainer
      sx={{ py: 8, px: { xs: 2, sm: 4, md: 6 } }}
      image='url(/home/bg.png)'
    >
      <Box
        component={motion.div}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        fontSize={{ xs: "1.8rem", sm: "2rem", md: "3rem", lg: "3rem" }}
        fontWeight='bold'
        textAlign='center'
        marginBottom={{ xs: 8, sm: 6 }}
        sx={{
          lineHeight: 1.2,
          "& > span": {
            display: "block",
          },
        }}
      >
        Powerful Features That Set{" "}
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
            style={{ color: "#00A76F" }}
            sx={{
              background: "linear-gradient(135deg, #00A76F 40%, #3A7A69 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Shothik AI
          </Typography>
          <Typography component='span' variant='inherit' color='text.primary'>
            Apart
          </Typography>
        </Box>
      </Box>

      {/* Bypass GPT Section */}
      <Grid2 container justifyContent='space-between' alignItems='center'>
        <Grid2
          component={motion.div}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          size={{ xs: 12, sm: 6, md: 6 }}
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
                }}
              >
                Unleash AI Potential with <br />
                <Typography
                  component='span'
                  variant='inherit'
                  fontWeight='bold'
                  color='#00A76F'
                >
                  Humanize GPT
                </Typography>
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ marginY: 2 }}
            >
              Working closely in partnership with the AI detector, you can
              verify and authenticate, distinguishing between human-written and
              AI-generated content with precision and confidence.
            </Typography>
          </Box>

          <UserActionButton />
        </Grid2>

        <Grid2
          size={{ xs: 12, sm: 6, md: 6 }}
          component={motion.div}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          sx={{ pl: { md: 10 } }}
        >
          <VideoImage
            lightImage='/home/bypass-light.webp'
            darkImage='/home/bypass-dark.webp'
            width={450}
            height={450}
            object='fill'
          />
        </Grid2>
      </Grid2>

      {/* AI Detector Section */}
      <Grid2 container justifyContent='space-between' alignItems='center'>
        {/* Video Grid */}
        <Grid2
          size={{ xs: 12, sm: 6, md: 6 }}
          sx={{
            order: { xs: 2, sm: 1 },
          }}
          component={motion.div}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <VideoImage
            lightImage='/home/ai-detector-light.webp'
            darkImage='/home/ai-detector-dark.webp'
            width={400}
            height={400}
          />
        </Grid2>

        {/* Text Content Grid */}
        <Grid2
          size={{ xs: 12, sm: 6, md: 6 }}
          sx={{
            order: { xs: 1, sm: 2 },
          }}
          component={motion.div}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.12 }}
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
                gap: 0.3,
              }}
            >
              <Typography
                variant='h3'
                fontWeight='bold'
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.3rem", md: "2rem" },
                  lineHeight: 1.2,
                }}
              >
                Harness the Power of <br /> Advanced{" "}
                <Typography
                  component='span'
                  variant='inherit'
                  fontWeight='bold'
                  color='#00A76F'
                >
                  AI Detector
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ marginY: 2 }}
            >
              Direct communications with AI-driven queries. The Humanize GPT
              feature ensures you receive unrestrained, detailed, and
              comprehensive responses, enabling a seamless experience for
              complex tasks.
            </Typography>
          </Box>

          <UserActionButton />
        </Grid2>
      </Grid2>

      {/* Translator Section */}
      <Grid2
        container
        justifyContent='space-between'
        spacing={4}
        alignItems='center'
      >
        <Grid2
          component={motion.div}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          viewport={{ once: true }}
          size={{ xs: 12, sm: 6, md: 6 }}
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
                gap: 0.3,
              }}
            >
              <Typography
                variant='h3'
                fontWeight='bold'
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.3rem", md: "2rem" },
                  lineHeight: 1.2,
                }}
              >
                Break Language Barriers <br /> with{" "}
                <Typography
                  component='span'
                  variant='inherit'
                  fontWeight='bold'
                  color='#00A76F'
                >
                  {" "}
                  Translator
                </Typography>
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ marginY: 2 }}
            >
              Working closely in partnership with the AI detector, you can
              verify and authenticate, distinguishing between human-written and
              AI-generated content with precision and confidence.
            </Typography>
          </Box>
          <UserActionButton />
        </Grid2>
        <Grid2
          component={motion.div}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.19 }}
          viewport={{ once: true }}
          size={{ xs: 12, sm: 6, md: 6 }}
          sx={{ pl: { md: 10 } }}
        >
          <VideoImage
            lightImage='/home/translator-light.webp'
            darkImage='/home/translator-dark.webp'
            width={400}
            height={400}
          />
        </Grid2>
      </Grid2>
    </BgContainer>
  );
}
