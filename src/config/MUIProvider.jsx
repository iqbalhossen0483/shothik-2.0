"use client";

import { CacheProvider } from "@emotion/react";
import * as React from "react";
import { useEffect, useState } from "react";
import createEmotionCache from "./createEmotionCache";
import ThemeProvider from "./mui";

export default function MUIProvider({ children }) {
  const [clientSideEmotionCache] = React.useState(() => createEmotionCache());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider>{children}</ThemeProvider>
    </CacheProvider>
  );
}
