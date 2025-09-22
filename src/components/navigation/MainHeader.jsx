import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { HEADER, NAV } from "../../config/config/nav";
import useResponsive from "../../hooks/useResponsive";
import { useGetUserQuery } from "../../redux/api/auth/authApi";
import { setOpen } from "../../redux/slice/settings";
import DotFlashing from "../../resource/DotFlashing";
import SvgColor from "../../resource/SvgColor";
import Logo from "../../resource/assets/Logo";
import { bgBlur } from "../../resource/cssStyles";
import AccountPopover from "./components/AccountProper";

export default function MainHeader() {
  const { accessToken, user } = useSelector((state) => state.auth);
  const { themeLayout } = useSelector((state) => state.settings);
  const isNavHorizontal = themeLayout === "horizontal";
  const isNavMini = themeLayout === "mini";
  const isDesktop = useResponsive("up", "sm");
  const isMd = useResponsive("up", "sm");
  const isMobile = useResponsive("down", "sm");
  const { isLoading } = useGetUserQuery();
  const pathname = usePathname();
  const theme = useTheme();
  const dispatch = useDispatch();

  const title = () => {
    const routeTitles = {
      "/paraphrase": "Paraphrase",
      "/humanize-gpt": "Humanize GPT",
      "/ai-detector": "AI Detector",
      "/grammar-check": "Grammar Checker",
      "/summarize": "Summarize",
      "/translator": "Translate",
      "/pricing": "Shothik.ai Premium",
      "/research": "Research",
      "/agent": "Shothik AI Agent",
    };

    return routeTitles[pathname] || "";
  };

  const renderContent = (
    <>
      {!isDesktop && (
        <>
          <IconButton
            onClick={() => dispatch(setOpen(true))}
            sx={{
              mr: 1,
              ml: { xs: 0, sm: 1 },
              color: "primary.main",
            }}
          >
            <SvgColor src='/navbar/ic_menu_item.svg' />
          </IconButton>
          <Logo sx={{ mr: 2.5 }} />
        </>
      )}

      <Stack
        flexGrow={1}
        direction='row'
        alignItems='center'
        justifyContent='flex-end'
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        {isNavMini && isMd && <Logo sx={{ mr: 2.5 }} />}

        {isMd && (
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Typography
              variant='h5'
              sx={{
                color: theme.palette.mode === "dark" ? "#FFFFFF" : "#212B36",
              }}
            >
              {title()}
            </Typography>
          </Box>
        )}

        {isLoading ? (
          <DotFlashing />
        ) : (
          user?.package !== "unlimited" && (
            <Link href={"/pricing?redirect=" + pathname}>
              <Button
                color='primary'
                size={isMd ? "medium" : "small"}
                variant='contained'
                rel='noopener'
                startIcon={
                  <SvgColor
                    src='/navbar/diamond.svg'
                    sx={{
                      width: { xs: 20, md: 24 },
                      height: { xs: 20, md: 24 },
                    }}
                  />
                }
              >
                {user?.email
                  ? isMobile
                    ? "Upgrade"
                    : "Upgrade Plan"
                  : isMobile
                  ? "Premium"
                  : "Upgrade To Premium"}
              </Button>
            </Link>
          )
        )}

        {!isLoading && (
          <>
            <AccountPopover accessToken={accessToken} user={user} />
          </>
        )}
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        display: "block",
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.paper,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: "background.default",
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
