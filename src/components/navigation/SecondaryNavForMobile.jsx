import { Menu } from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "../../config/config/nav";
import Logo from "../../resource/assets/Logo";

// ----------------------------------------------------------------------

export default function SecondaryNavForMobile({ data }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      handleClose();
    }
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Menu />
      </IconButton>

      <Drawer
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              pb: 5,
              width: NAV.W_BASE,
            },
          },
        }}
      >
        <Box>
          <Box sx={{ mx: 2.5, my: 3 }}>
            <Logo />
          </Box>

          <List component='nav' disablePadding>
            {data.map((link) => (
              <ListItemButton
                key={link.path}
                component={Link}
                href={link.path}
                sx={(theme) => {
                  const isLight = theme.palette.mode === "light";
                  const activeStyle = {
                    color: !isLight ? "primary.light" : "primary.main",
                  };
                  const isActive = pathname === link.path;

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
                  <Box
                    sx={{
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      pl: 1,
                    }}
                  >
                    <link.icon />
                    <Typography variant='subtitle2'>{link.title}</Typography>
                  </Box>
                </ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
