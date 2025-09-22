"use client";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { Box } from "@mui/material";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthSuccessPopup from "../../components/auth/AuthSuccessPopoup";
import VerifyEmailAlert from "../../components/auth/VerifyEmailAlert";
import Main from "../../components/layout/Main";
import MainHeader from "../../components/navigation/MainHeader";
import NavMini from "../../components/navigation/NavMini";
import NavVertical from "../../components/navigation/NavVertical";
import AlertDialog from "../../components/tools/common/AlertDialog";
import useResponsive from "../../hooks/useResponsive";
import {
  useGetUserLimitQuery,
  useGetUserQuery,
  useLoginMutation,
} from "../../redux/api/auth/authApi";
import {
  setShowLoginModal,
  setShowRegisterModal,
} from "../../redux/slice/auth";
import { setOpen } from "../../redux/slice/settings";
import LoadingScreen from "../../resource/LoadingScreen";

export default function MainLayout({ children }) {
  const { open, themeLayout } = useSelector((state) => state.settings);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const isMobile = useResponsive("down", "sm");
  const isNavMini = themeLayout === "mini";
  const dispatch = useDispatch();
  const { isLoading } = useGetUserQuery();
  useGetUserLimitQuery();

  const [login] = useLoginMutation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsLoadingPage(false);
  }, []);

  useGoogleOneTapLogin({
    onSuccess: async (res) => {
      try {
        const { email, name } = jwtDecode(res.credential);

        const response = await login({
          auth_type: "google",
          googleToken: res.credential,
          oneTapLogin: true,
          oneTapUser: {
            email,
            name,
          },
        });

        // console.log(response);
        if (response?.data) {
          dispatch(setShowRegisterModal(false));
          dispatch(setShowLoginModal(false));
        }
      } catch (error) {
        console.error(error);
      }
    },
    flow: "auth-code",
    onError: (err) => {
      console.error(err);
    },
    scope: "email profile",
    disabled: isLoading || user?.email,
  });

  if (isLoadingPage) return <LoadingScreen />;

  return (
    <ProgressProvider
      height='3px'
      color='#00AB55'
      options={{ showSpinner: false }}
      shallowRouting
    >
      <Box>
        <MainHeader />
        <Box
          sx={{
            bgcolor: "background.neutral",
            display: { sm: "flex" },
            minHeight: { sm: 1 },
            overflow: "hidden",
          }}
        >
          {!isMobile && isNavMini ? (
            <NavMini />
          ) : (
            <NavVertical
              openNav={open}
              onCloseNav={() => dispatch(setOpen(false))}
            />
          )}
          <Main>
            <VerifyEmailAlert />
            {children}
            <AuthSuccessPopup />
            <AlertDialog />
          </Main>
        </Box>
      </Box>
    </ProgressProvider>
  );
}
