import { Box, Grid2, LinearProgress, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Image from "next/image";

const keyPoints = [
  {
    label: "Quality",
    value: 100,
  },
  {
    label: "Accuracy",
    value: 100,
  },
  {
    label: "AI Detector",
    value: 100,
  },
  {
    label: "Humanize GPT",
    value: 100,
  },
];

export default function AboutWhat() {
  return (
    <Box
      sx={{
        textAlign: { xs: "center", sm: "left" },
        paddingTop: 20,
        paddingBottom: 10,
      }}
    >
      <Grid2 container spacing={3} justifyContent='center' alignItems='center'>
        <Grid2
          size={{ xs: 12, md: 6, lg: 7 }}
          sx={{ pr: { md: 7 }, display: { xs: "none", md: "block" } }}
        >
          <Grid2 container spacing={3} alignItems='flex-end'>
            <Grid2 size={{ xs: 6 }}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Image
                  alt='our office 1'
                  src='/secondary/what_1.jpg'
                  height={400}
                  width={400}
                  style={{
                    borderRadius: "20px",
                    boxShadow: "-40px 40px 80px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </motion.div>
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Image
                  alt='our office 2'
                  src='/secondary/what_2.jpg'
                  height={300}
                  width={400}
                  style={{ borderRadius: "20px" }}
                />
              </motion.div>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 5 }}>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography variant='h2' sx={{ mb: 3 }}>
              What is Shothik AI?
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              The ultimate writing tool powered by AI. From rephrasing sentences
              to improving grammar and vocabulary, Shothik AI helps you produce
              polished, professional-grade writing every time.
            </Typography>
          </motion.div>

          <Box sx={{ my: 5 }}>
            {keyPoints.map((progress, i) => (
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 * (i + 1) }}
                viewport={{ once: true }}
                key={progress.label}
              >
                <ProgressItem progress={progress} />
              </motion.div>
            ))}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

function ProgressItem({ progress }) {
  const { label, value } = progress;

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ mb: 1.5, display: "flex", alignItems: "center" }}>
        <Typography variant='subtitle2'>{label}&nbsp;-&nbsp;</Typography>
        <Typography variant='body2' sx={{ color: "text.secondary" }}>
          {value}%
        </Typography>
      </Box>

      <LinearProgress
        variant='determinate'
        value={value}
        sx={{
          "& .MuiLinearProgress-bar": { bgcolor: "success.main" },
          "&.MuiLinearProgress-determinate": { bgcolor: "divider" },
        }}
      />
    </Box>
  );
}
