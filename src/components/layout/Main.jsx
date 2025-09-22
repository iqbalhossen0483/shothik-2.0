"use client";
import { Box, Container } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HEADER, NAV } from "../../config/config/nav";
import useResponsive from "../../hooks/useResponsive";
import { loadSettingsFromLocalStorage } from "../../redux/slice/settings";
import FooterServerComponent from "../navigation/components/FooterServerComponent";
import MobileNavigation from "../navigation/MobileNavigation";
// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children }) {
  const { themeLayout } = useSelector((state) => state.settings);
  const isNavMini = themeLayout === "mini";
  const isDesktop = useResponsive("up", "sm");
  const dispatch = useDispatch();
  const pathName = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(loadSettingsFromLocalStorage());
    }
  }, []);

  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        pt: `${HEADER.H_MOBILE + SPACING}px`,
        ...(isDesktop && {
          px: 2,
          pt: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
            ml: { sm: "95px" },
          }),
        }),
      }}
    >
      <Container
        maxWidth='xl'
        overflow='hidden'
        disableGutters
        sx={{ minHeight: "calc(100vh - 90px)" }}
      >
        {pathName.startsWith("/account") || /\/agent/.test(pathName) ? null : (
          <MobileNavigation />
        )}
        {children}
      </Container>
      {!/\/agent/.test(pathName) ? <FooterServerComponent /> : null}
    </Box>
  );
}
