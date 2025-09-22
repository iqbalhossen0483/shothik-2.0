import { KeyboardDoubleArrowRightRounded } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Image from "next/image";
import { PATH_PAGE, PATH_TOOLS } from "../../config/config/route";

export default function HomeAdvertisement() {
  return (
    <Stack
      alignItems='center'
      direction={{ xs: "column", md: "row" }}
      sx={{
        background: "linear-gradient(135deg,#00AB55,#007B55)",
        borderRadius: 2,
        py: { xs: 5, md: 8 },
        mb: 5,
      }}
    >
      <Content />
      <Description />
    </Stack>
  );
}

function Description() {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: 1 / 2 },
        textAlign: {
          xs: "center",
          md: "left",
        },
      }}
    >
      <Typography
        component={motion.p}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        variant='h2'
        sx={{ color: "common.white", mb: 5 }}
      >
        Get started with 
        <br />
        Shothik.ai today
      </Typography>

      <motion.div
        initial={{ x: 30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        style={{ display:"flex", justifyContent:"center" }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={{ xs: "center", md: "center" }}
          flexWrap='wrap'
          gap={2}
          
        >
          <Button
            color='inherit'
            size='large'
            variant='contained'
            rel='noopener'
            href={PATH_PAGE.pricing}
            sx={{
              color: "grey.800",
              bgcolor: "common.white",
              width: { xs: 200, md: "auto" },
              margin:"0 auto"
            }}
          >
            Upgrade to pro
          </Button>
          <Button
            color='inherit'
            size='large'
            variant='outlined'
            target='_blank'
            rel='noopener'
            href={PATH_TOOLS.discord}
            endIcon={
              <KeyboardDoubleArrowRightRounded
                fontSize='small'
                sx={{ mr: 0.5 }}
              />
            }
            sx={{
              color: "common.white",
              // width: { xs: 100, md: "auto" },
              "&:hover": { borderColor: "currentColor" },
            }}
          >
            Join us on Discord
          </Button>
        </Stack>
      </motion.div>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Content() {
  return (
    <Stack
      component={motion.div}
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      sx={{ width: 1 / 2 }}
      alignItems='center'
    >
      <motion.div
        animate={{ y: [-20, 0, -20] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Image
          height={400}
          width={400}
          style={{ width: "100%", height: "auto" }} 
          alt='rocket'
          src='/moscot.png'
          sx={{ maxWidth: 460 }}
        />
      </motion.div>
    </Stack>
  );
}
