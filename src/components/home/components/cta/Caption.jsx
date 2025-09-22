"use client";
import React from "react";
import { useSelector } from "react-redux";

const Caption = () => {
  const { user } = useSelector((state) => state.auth);

  const packageName = user?.package;
  const caption = !packageName ? "Sign up now" : "Explore the Features";
  return <span>{caption}</span>;
};

export default Caption;
