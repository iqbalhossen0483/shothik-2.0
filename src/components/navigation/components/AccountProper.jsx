"use client";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LoginIcon from "@mui/icons-material/Login";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineSharpIcon from "@mui/icons-material/PersonOutlineSharp";
import {
  Box,
  MenuItem,
  Popover,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PATH_ACCOUNT } from "../../../config/config/route";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import useSnackbar from "../../../hooks/useSnackbar";
import {
  logout,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/slice/auth";
import { toggleThemeMode } from "../../../redux/slice/settings";
import Discord from "../../../resource/assets/Discord";

// ----------------------------------------------------------------------

export default function AccountPopover({ accessToken, user }) {
  const { themeMode } = useSelector((state) => state.settings);
  const [openPopover, setOpenPopover] = useState(null);
  const enqueueSnackbar = useSnackbar();
  const dispatch = useDispatch();
  const { push } = useRouter();

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const handleClickItem = (path) => {
    handleClosePopover();
    push(path);
  };

  const popoverRef = useOutsideClick(() => handleClosePopover());

  return (
    <>
      <Box
        ref={popoverRef}
        onClick={handleOpenPopover}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {user && user?.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            style={{ width: 40, height: 40, borderRadius: "50%" }}
            width={40}
            height={40}
          />
        ) : user && accessToken ? (
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {user?.name
              ? `${String(user?.name ?? "").split(" ")[0][0] || ""}${
                  user.name?.split(" ")[1]?.[0] || ""
                }`
              : ""}
          </Box>
        ) : (
          <PersonOutlineSharpIcon
            sx={{
              fontSize: 30,
              color: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.text.secondary
                  : theme.palette.text.secondary,
            }}
          />
        )}
      </Box>

      <Popover
        open={Boolean(openPopover)}
        anchorEl={openPopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClosePopover}
        slotProps={{
          paper: {
            sx: {
              p: 1,
              width: "auto",
              overflow: "inherit",
              "& .MuiMenuItem-root": {
                px: 1,
                typography: "body2",
                borderRadius: 0.75,
                "& svg": { mr: 2, width: 20, height: 20, flexShrink: 0 },
              },
              width: 220,
              p: 0,
              my: 2,
            },
          },
        }}
      >
        {user?.email && (
          <Box
            onClick={() => handleClickItem(PATH_ACCOUNT.settings.root)}
            sx={{
              cursor: "pointer",
              my: 1.5,
              px: 2,
              "&:hover": { bgcolor: "rgba(145, 158, 171, 0.08)" },
            }}
          >
            <Stack direction='row' alignItems='center' spacing={2}>
              <PersonOutlineSharpIcon />
              <Box>
                <Typography variant='subtitle2' noWrap>
                  My Profile
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  {user?.email?.length > 15 &&
                    `${user?.email?.slice(0, 15)}...`}
                </Typography>
              </Box>
            </Stack>
          </Box>
        )}

        {!user?.email && (
          <MenuItem
            onClick={() => {
              handleClosePopover();
              dispatch(setShowRegisterModal(false));
              dispatch(setShowLoginModal(true));
            }}
            direction='row'
            sx={{ "&:hover": { bgcolor: "rgba(145, 158, 171, 0.08)" } }}
          >
            <Stack direction='row' pl={1.5}>
              <LoginIcon />
              <Typography variant='body2'>Login / Sign up</Typography>
            </Stack>
          </MenuItem>
        )}

        <Stack
          onChange={() => dispatch(toggleThemeMode())}
          sx={{
            cursor: "pointer",
            pl: 2.5,
            "&:hover": { bgcolor: "rgba(145, 158, 171, 0.08)" },
          }}
        >
          <Stack direction='row' alignItems='center' spacing={1}>
            <Brightness4OutlinedIcon sx={{ width: 20, height: 20 }} />
            <Typography variant='body2' sx={{ pl: 1 }}>
              Dark mode
            </Typography>
            <Switch checked={themeMode === "dark"} size='medium' />
          </Stack>
        </Stack>

        <MenuItem sx={{ "&:hover": { bgcolor: "rgba(145, 158, 171, 0.08)" } }}>
          <Link
            href='mailto:support@shothik.ai'
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", pl: 1.5 }}>
              <HelpOutlineIcon fontSize='small' />
              <Typography variant='body2'>Help Center</Typography>
            </Box>
          </Link>
        </MenuItem>

        <MenuItem sx={{ "&:hover": { bgcolor: "rgba(145, 158, 171, 0.08)" } }}>
          <Link
            href='/contact-us'
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", pl: 1.5 }}>
              <MailOutlineIcon fontSize='small' />
              <Typography variant='body2'>Contact us</Typography>
            </Box>
          </Link>
        </MenuItem>

        <MenuItem sx={{ "&:hover": { bgcolor: "rgba(145, 158, 171, 0.08)" } }}>
          <Link
            href='https://discord.gg/pq2wTqXEpj'
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", pl: 1.5 }}>
              <Discord />
              <Typography variant='body2'>Join Us on Discord</Typography>
            </Box>
          </Link>
        </MenuItem>

        {user?.email && (
          <MenuItem
            onClick={handleLogout}
            sx={{ "&:hover": { bgcolor: "rgba(145, 158, 171, 0.08)" } }}
          >
            <Box sx={{ pl: 1.5, pb: 2, display: "flex", alignItems: "center" }}>
              <LoginIcon />
              <Typography variant='body2'>Log out</Typography>
            </Box>
          </MenuItem>
        )}
      </Popover>
    </>
  );
}
