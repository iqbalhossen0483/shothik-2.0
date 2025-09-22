import { PATH_TOOLS } from "./route";

// API
// ----------------------------------------------------------------------
export const GOOGLE_API = {
  CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  REDIRECT_URI: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
};

export const AUTH0_API = {
  clientId: process.env.AUTH0_CLIENT_ID,
  domain: process.env.AUTH0_DOMAIN,
};

export const MAP_API = process.env.MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_TOOLS.paraphrase; // as '/dashboard/app'

// SUPPORT
export const SUPPORT = {
  email: process.env.SUPPORT_EMAIL,
  hotline: process.env.SUPPORT_PHONE,
};

// LAYOUT
// ----------------------------------------------------------------------
export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 64,
  H_DASHBOARD_DESKTOP_OFFSET: 64 - 4,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 100,
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 32,
  NAV_ITEM_HORIZONTAL: 32,
  NAV_ITEM_MINI: 28,
};
