"use client";

import { Box, Drawer, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { NAV } from "../../config/config/nav";
import navConfig from "../../config/config/navConfig";
import useResponsive from "../../hooks/useResponsive";
import Logo from "../../resource/assets/Logo";
import NavSectionVertical from "./components/NavSectionVertical";
import NavToggleButton from "./components/toggleButton";
import UserInfo from "./components/UserInfo";

// ----------------------------------------------------------------------

export default function NavVertical({ openNav, onCloseNav }) {
  const { user } = useSelector((state) => state.auth);
  const isDesktop = useResponsive("up", "sm");

  

  return (
    <Box
      component='nav'
      sx={{
        bgcolor: "background.paper",
        flexShrink: { sm: 0 },
        width: { sm: NAV.W_DASHBOARD },
      }}
    >
      <NavToggleButton />

      <Drawer
        open={isDesktop ? true : openNav}
        onClose={isDesktop ? undefined : onCloseNav}
        variant={isDesktop ? "permanent" : "temporary"}
        ModalProps={{
          keepMounted: true,
        }}
        slotProps={{
          paper: {
            sx: {
              zIndex: isDesktop ? 500 : 0,
              width: NAV.W_DASHBOARD,
              ...(isDesktop && {
                bgcolor: "transparent",
                borderRightStyle: "dashed",
              }),
            },
          },
        }}
      >
        <Box sx={{ bgcolor: "background.paper", height: 1 }}>
          <Stack
            spacing={3}
            sx={{
              pt: 2,
              pr: 2.5,
              pl: 4,
              flexShrink: 0,
            }}
          >
            <Logo />
          </Stack>

          <NavSectionVertical onCloseNav={onCloseNav} data={navConfig} user={user} />

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ px: 2 }}>
            <UserInfo />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
