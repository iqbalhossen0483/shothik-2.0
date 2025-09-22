import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import NextLink from "next/link";
import { _socials } from "../_mock/socials";
import VideoImage from "../components/home/components/VideoImage";

export default function ComingSoon() {
  return (
    <Container
      sx={{
        height: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          variant='h2'
          sx={{
            background: "linear-gradient(135deg, #00A76F 0%, #0B4D42 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Coming Soon
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          We are currently working hard on this page!
        </Typography>
      </Box>

      <VideoImage
        lightImage='/home/hero/hero-light.webp'
        darkImage='/home/hero/hero-dark.webp'
        height={400}
        width={400}
      />

      <Stack
        spacing={1}
        alignItems='center'
        justifyContent='center'
        direction='row'
      >
        {_socials.map((social) => (
          <IconButton
            key={social.value}
            component={NextLink}
            href={social.path}
            sx={{
              color: social.color,
              "&:hover": {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <social.icon />
          </IconButton>
        ))}
      </Stack>
    </Container>
  );
}
