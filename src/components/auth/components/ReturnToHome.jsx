"use client";
import { ChevronLeft } from "@mui/icons-material";
import { Link } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { setShowLoginModal } from "../../../redux/slice/auth";

const ReturnToHome = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/");
    dispatch(setShowLoginModal(true));
  };

  return (
    <Link
      component='p'
      onClick={handleNavigation}
      color='inherit'
      variant='subtitle2'
      sx={{
        mt: 3,
        mx: "auto",
        alignItems: "center",
        display: "inline-flex",
      }}
    >
      <ChevronLeft fontSize='small' />
      Return to sign in
    </Link>
  );
};

export default ReturnToHome;
