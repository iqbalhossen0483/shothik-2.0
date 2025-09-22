import { Grid2, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Image from "next/image";
import BgContainer from "./components/hero/BgContainer";

export default function WhyShothik() {
  return (
    <BgContainer
      sx={{ py: 8, px: { xs: 2, sm: 4, md: 6 } }}
      image='url(/home/bg.png)'
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Typography
          fontSize={{ xs: "1.8rem", sm: "2rem", md: "3rem", lg: "3rem" }}
          align='center'
          gutterBottom
          fontWeight='bold'
          marginBottom={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }}
          marginTop={{ xs: 2, sm: 6, md: 8, lg: 8, xl: 10 }}
        >
          Why Choose{" "}
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
            Shothik AI ?
          </Typography>
        </Typography>
      </motion.div>

      {/* Boost productivity */}
      <Grid2
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        alignItems='center'
        justifyContent='center'
        mb={{ xs: 4, sm: 5, md: 6 }}
      >
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography
              variant='body1'
              color='text.secondary'
              fontWeight={700}
              marginLeft={0.2}
              fontSize={{ xs: 20, sm: 24, md: 28 }}
              my={2}
            >
              01
            </Typography>
            <Typography
              variant='h3'
              fontWeight='bold'
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.3rem", md: "2rem" },
                lineHeight: 1.2,
              }}
            >
              Boost Productivity
            </Typography>
          </motion.div>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ marginTop: 2 }}
            >
              Streamline your workflow with AI-powered tools that handle complex
              tasks, letting you focus on what matters most.
            </Typography>
          </motion.div>
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 6 }}
          sx={{
            position: "relative",
            marginBottom: { xs: 4, sm: 0 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src='/home/why-1.png'
              alt='AI Detector Illustration'
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                margin: "auto",
              }}
              width={400}
              height={400}
            />
          </motion.div>
        </Grid2>
      </Grid2>

      {/* Perfect Your Language */}
      <Grid2
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        alignItems='center'
        justifyContent='center'
        mb={{ xs: 4, sm: 5, md: 6 }}
      >
        <Grid2
          size={{ xs: 12, sm: 6 }}
          order={{ xs: 2, sm: 1 }}
          sx={{
            marginBottom: { xs: 4, sm: 0 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              width={400}
              height={400}
              src='/home/why-2.png'
              alt='Bypass GPT'
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                margin: "auto",
              }}
            />
          </motion.div>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }} order={{ xs: 1, sm: 2 }}>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Typography
              variant='body1'
              color='text.secondary'
              fontWeight={700}
              marginLeft={0.2}
              fontSize={{ xs: 20, sm: 24, md: 28 }}
              my={2}
            >
              02
            </Typography>
            <Typography
              variant='h3'
              fontWeight='bold'
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.3rem", md: "2rem" },
                lineHeight: 1.2,
              }}
            >
              Perfect Your Language
            </Typography>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ marginTop: 2 }}
            >
              From grammar fixes to flawless translations, Shothik.ai ensures
              every word you write is polished and impactful.
            </Typography>
          </motion.div>
        </Grid2>
      </Grid2>

      {/* Tailored to Your Needs */}
      <Grid2
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        alignItems='center'
        justifyContent='center'
        mb={{ xs: 4, sm: 5, md: 6 }}
      >
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography
              variant='body1'
              color='text.secondary'
              fontWeight={700}
              marginLeft={0.2}
              fontSize={{ xs: 20, sm: 22, md: 24 }}
              my={2}
            >
              03
            </Typography>
            <Typography
              variant='h3'
              fontWeight='bold'
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.3rem", md: "2rem" },
                lineHeight: 1.2,
              }}
            >
              Tailored to Your Needs
            </Typography>
          </motion.div>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ marginTop: 2 }}
            >
              No matter your industry or goal, our features adapt to your unique
              requirements, making Shothik.ai your versatile language partner.
            </Typography>
          </motion.div>
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 6 }}
          sx={{
            position: "relative",
            marginBottom: { xs: 4, sm: 0 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              width={400}
              height={400}
              src='/home/why-3.png'
              alt='AI Detector Illustration'
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                margin: "auto",
              }}
            />
          </motion.div>
        </Grid2>
      </Grid2>
    </BgContainer>
  );
}
