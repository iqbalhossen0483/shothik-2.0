import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "../../../redux/api/auth/authApi";
import {
  logout,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/slice/auth";
import DotFlashing from "../../../resource/DotFlashing";
import CustomAvatar from "./Avater";
// ----------------------------------------------------------------------

export default function UserInfo() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useGetUserQuery();
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleLogout = async () => {
    try {
      dispatch(logout());
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <Stack
        sx={{
          px: { xs: 2, sm: 2 },
          py: { xs: 5, sm: 5 },
          textAlign: "center",
          minHeight: "200px",
          justifyContent: "center",
        }}
      >
        <DotFlashing />
      </Stack>
    );
  }

  return (
    <Stack
      sx={{ px: { xs: 2, sm: 2 }, py: { xs: 5, sm: 5 }, textAlign: "center" }}
    >
      <Stack alignItems='center'>
        {user?.email ? (
          <>
            <Box sx={{ position: "relative" }}>
              <CustomAvatar
                src={user?.image}
                alt={user?.name}
                name={user?.name}
                sx={{ width: 48, height: 48 }}
              />
            </Box>

            <Stack spacing={0.5} sx={{ mt: 1.5, mb: 3 }}>
              <Typography
                variant='subtitle2'
                sx={{ overflowWrap: "break-word", wordBreak: "break-all" }}
              >
                {user?.name}
              </Typography>

              <Typography
                sx={{
                  backgroundColor: "#8E33FF",
                  color: "#fff",
                  padding: "2px 5px",
                  borderRadius: "5px",
                  fontSize: "14px",
                  "&:first-letter": {
                    textTransform: "uppercase",
                  },
                }}
              >
                {user.package?.replace("_", " ")}
              </Typography>
            </Stack>

            {user.package !== "unlimited" && (
              <Button
                style={{ marginTop: -10 }}
                variant='contained'
                component={Link}
                href='/pricing'
              >
                Upgrade plan
              </Button>
            )}
            <Box
              onClick={handleLogout}
              sx={{
                width: "100%",
                cursor: "pointer",
                background: isDark ? "#454F5B" : "#eceff8",
                height: 40,
                lineHeight: "40px",
                color: "text.primary",
                fontWeight: 500,
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                marginTop: 2,
              }}
            >
              Logout
              <LogoutIcon fontSize='24px' />
            </Box>
          </>
        ) : (
          <Stack
            spacing={2}
            alignItems='left'
            sx={{ width: "100%", textAlign: "left" }}
          >
            <Stack spacing={0.5}>
              <Typography variant='subtitle2' sx={{ color: "text.primary" }}>
                Log In or Sign Up
              </Typography>
              <Typography variant='caption' sx={{ color: "text.primary" }}>
                Unlock hidden features. Write with confidence.{" "}
              </Typography>
            </Stack>
            <Stack spacing={1.5}>
              <Button
                onClick={() => {
                  dispatch(setShowRegisterModal(false));
                  dispatch(setShowLoginModal(true));
                }}
                variant='contained'
                size='medium'
                sx={{ width: "100%" }}
              >
                Sign In
              </Button>

              <Button
                onClick={() => {
                  dispatch(setShowLoginModal(false));
                  dispatch(setShowRegisterModal(true));
                }}
                variant='outlined'
                size='medium'
                sx={{
                  width: "100%",
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(145, 158, 171, 0.32)"
                      : "inherit",
                  "&:hover": {
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(145, 158, 171, 0.48)"
                        : "inherit",
                  },
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
