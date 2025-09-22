import { Home, MonetizationOn } from "@mui/icons-material";
import {
  AppBar,
  Container,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HEADER } from "../../config/config/nav";
import { PATH_PAGE } from "../../config/config/route";
import useResponsive from "../../hooks/useResponsive";
import Logo from "../../resource/assets/Logo";
import { bgBlur } from "../../resource/cssStyles";
import AccountPopover from "./components/AccountProper";
import SecondaryNavForMobile from "./SecondaryNavForMobile";

const navConfig = [
  {
    title: "Home",
    icon: Home,
    path: "/?utm_source=internal",
  },
  {
    title: "Pricing",
    icon: MonetizationOn,
    path: PATH_PAGE.pricing,
  },
];

export default function SecondaryHeader() {
  const { accessToken, user } = useSelector((state) => state.auth);
  const [showShadow, setShowShadow] = useState(false);
  const isDesktop = useResponsive("up", "md");
  const router = usePathname();
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      sx={{
        display: "block",
        position: "sticky",
        height: {
          xs: HEADER.H_MOBILE,
          md: HEADER.H_MAIN_DESKTOP,
        },
        transition: theme.transitions.create(["height", "background-color"], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        }),
        ...bgBlur({ color: theme.palette.background.default }),
        height: {
          md: HEADER.H_MAIN_DESKTOP - 16,
        },
        boxShadow: showShadow ? 4 : 0,
      }}
    >
      <Toolbar sx={{ height: 1 }}>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo />

          <Stack component='nav' direction='row' spacing={1}>
            {isDesktop ? (
              <>
                {navConfig?.map((link) => (
                  <ListItemButton
                    key={link.path}
                    component={Link}
                    href={link.path}
                    sx={(theme) => {
                      const isLight = theme.palette.mode === "light";
                      const activeStyle = {
                        color: !isLight ? "primary.light" : "primary.main",
                      };
                      const isActive = router === link.path;

                      return {
                        position: "relative",
                        textTransform: "capitalize",
                        marginLeft: 0,
                        marginRight: 0,
                        px: 1,
                        color: "text.secondary",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                        ...(isActive && {
                          ...activeStyle,
                        }),
                      };
                    }}
                  >
                    <ListItemText>
                      <Typography
                        sx={{
                          fontSize: 14,
                          textAlign: "center",
                        }}
                        variant='subtitle2'
                      >
                        {link.title}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                ))}
              </>
            ) : (
              <SecondaryNavForMobile data={navConfig} />
            )}
            <AccountPopover accessToken={accessToken} user={user} />
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
