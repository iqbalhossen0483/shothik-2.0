"use client";

import React from "react";
import FacebookPixel from "./FacebookPixel";
import GoogleAnalytics from "./GoogleAnalytics";
import GoogleTagManager from "./GoogleTagManager";

const Analytics = () => {
  return (
    <>
      <GoogleAnalytics />
      <GoogleTagManager />
      <FacebookPixel />
    </>
  );
};

export default Analytics;
