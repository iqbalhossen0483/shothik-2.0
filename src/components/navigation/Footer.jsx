import {
  Box,
  Container,
  Divider,
  Grid2,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { Fragment } from "react";
import { LINKS } from "../../_mock/footer";
import { _socials } from "../../_mock/socials";
import Logo from "../../resource/assets/Logo";

export default function Footer() {
  const simpleFooter = (
    <Box
      component='footer'
      sx={{
        py: 5,
        bgcolor: "background.default",
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
        justifyContent: "space-around",
      }}
    >
      <Box
        component='footer'
        sx={{
          bgcolor: "background.default",
          display: { xs: "flex", sm: "flex", md: "block" },
          justifyContent: { xs: "center", sm: "center" },
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            alignItems: "flex-start",
            gap: { xs: 1, sm: 1, md: 4 },
          }}
        >
          <Logo />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography>© 2025 All rights reserved.</Typography>
            <Stack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={1}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Link href='/terms' color='inherit'>
                Terms of Service
              </Link>
              <Link href='/privacy' color='inherit'>
                Privacy Policy
              </Link>
              <Link href='/copyright' color='inherit'>
                Copyright, Community Guidelines
              </Link>
            </Stack>
            <Typography>
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply
            </Typography>
          </Box>
        </Container>
      </Box>
      <Typography
        variant='caption'
        component='div'
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        Developed by  <Link href='/?utm_source=internal'>Shothik AI</Link>
      </Typography>
    </Box>
  );

  const mainFooter = (
    <Box
      component='footer'
      sx={{
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Divider />

      <Container sx={{ py: 10 }}>
        <Grid2 container>
          <Grid2 container spacing={4}>
            {LINKS.map((list) => (
              <Grid2 key={list.headline} size={{ xs: 6, sm: 6, md: 3 }}>
                <Stack
                  spacing={{ xs: 1, md: 2 }}
                  alignItems={{
                    xs: "flex-start",
                    sm: "flex-start",
                    md: "flex-start",
                  }}
                  sx={{ width: "100%" }}
                >
                  <Typography
                    component='div'
                    variant='overline'
                    sx={{ fontSize: 14 }}
                  >
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={NextLink}
                      href={link.href}
                      color='inherit'
                    >
                      {link.name.split("\n").map((line, index) => (
                        <Fragment key={index}>
                          {line}
                          {index !== link.name.split("\n").length - 1 && <br />}
                        </Fragment>
                      ))}
                    </Link>
                  ))}
                </Stack>
              </Grid2>
            ))}

            {/* Social Section */}
            <Grid2
              sx={{
                mt: 4,
                ml: 4,
              }}
            >
              <Stack
                spacing={4}
                direction={{ xs: "column", sm: "column", md: "row" }}
                justifyContent={{
                  xs: "center",
                  sm: "center",
                  md: "space-between",
                }}
                alignItems='center'
              >
                <Box>
                  <Typography
                    variant='overline'
                    fontSize={14}
                    textAlign={{ xs: "center", sm: "center", md: "left" }}
                  >
                    Get to Know Us
                  </Typography>
                  <Stack
                    direction='row'
                    justifyContent={{
                      xs: "center",
                      sm: "center",
                      md: "flex-start",
                    }}
                    sx={{ mb: { xs: 5, md: 0 }, ml: { xs: -1, md: -1 } }}
                  >
                    {_socials.map((Social) => (
                      <IconButton
                        key={Social.name}
                        component={NextLink}
                        target='_blank'
                        href={Social.path}
                      >
                        <Social.icon sx={{ color: Social.color }} />
                      </IconButton>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );

  return (
    <>
      {mainFooter}
      {simpleFooter}
    </>
  );
}
