import { Box, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

const Auth = ({ title, tag, children }) => {
  return (
    <>
      <Stack
        alignItems='center'
        gap={2}
        sx={{
          mb: 2,
          position: "relative",
        }}
      >
        <Box sx={{ position: "relative", width: "90px", height: "90px" }}>
          <Link component={NextLink} href='/'>
            <Image src='/moscot.png' fill alt='logo' />
          </Link>
        </Box>
        <Stack alignItems='center' spacing={1.5} sx={{ mt: "0 !important" }}>
          <Typography
            sx={{
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
              fontWeight: 600,
              letterSpacing: 0.5,
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.875rem", md: "1rem" },
              lineHeight: "1.5rem",
              fontWeight: 400,
              color: "text.disabled",
              textAlign: "center",
            }}
          >
            {tag}
          </Typography>
        </Stack>
      </Stack>

      {children}
    </>
  );
};

export default Auth;
