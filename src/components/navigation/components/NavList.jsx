"use client";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  alpha,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICON } from "../../../config/config/nav";

// ----------------------------------------------------------------------

export default function NavList({ data, layout, onCloseNav }) {
  const pathname = usePathname();
  const isActive = pathname === data.path;
  const { title, path, icon, iconColor } = data;

  return (
    <ListItemButton
      component={Link}
      href={path}
      id={data?.id}
      onClick={() => {
        if (onCloseNav) onCloseNav();
        else return;
      }}
      sx={(theme) => {
        const isLight = theme.palette.mode === "light";
        const activeStyle = {
          color: !isLight ? "primary.light" : "primary.main",
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        };

        return {
          position: "relative",
          textTransform: "capitalize",
          px: layout === "mini" ? 0.5 : 2,
          mb: 0.5,
          color: "text.secondary",
          width: layout === "mini" ? 72 : "100%",
          minWidth: layout === "mini" ? 72 : "100%",
          borderRadius: 1,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          ...(isActive && {
            ...activeStyle,
            "&:hover": activeStyle,
          }),
        };
      }}
    >
      {icon && (
        <ListItemIcon
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: ICON.NAV_ITEM,
            height: ICON.NAV_ITEM,
            color: iconColor,
            marginRight: layout === "mini" ? 0 : "16px",
          }}
        >
          {icon}
        </ListItemIcon>
      )}

      <ListItemText>
        <Typography
          sx={{
            fontSize: layout === "mini" ? 12 : 16,
            textAlign: layout === "mini" ? "center" : "start",
            flexGrow: 1,
          }}
          variant={isActive ? "subtitle2" : "body2"}
        >
          {title}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
}
