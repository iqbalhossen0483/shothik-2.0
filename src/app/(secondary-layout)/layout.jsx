"use client";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import FooterServerComponent from "../../components/navigation/components/FooterServerComponent";
import SecondaryHeader from "../../components/navigation/SecondaryHeader";
import {
  useGetUserLimitQuery,
  useGetUserQuery,
} from "../../redux/api/auth/authApi";
import LoadingScreen from "../../resource/LoadingScreen";

export default function SecondaryLayout({ children }) {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  useGetUserQuery();
  useGetUserLimitQuery();

  useEffect(() => {
    setIsLoadingPage(false);
  }, []);

  if (isLoadingPage) return <LoadingScreen />;

  return (
    <ProgressProvider
      height='3px'
      color='#00AB55'
      options={{ showSpinner: false }}
      shallowRouting
    >
      <SecondaryHeader />

      <Box component='main' sx={{ minHeight: "calc(100vh - 100px)" }}>
        {children}
      </Box>

      <FooterServerComponent />
    </ProgressProvider>
  );
}
