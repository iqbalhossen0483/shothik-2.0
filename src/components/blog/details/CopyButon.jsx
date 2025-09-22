"use client";
import { Check, ContentCopy } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import useSnackbar from "../../../hooks/useSnackbar";

const CopyButon = ({ text }) => {
  const enqueueSnackbar = useSnackbar();
  const [showCopy, setShowCopy] = useState(true);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    enqueueSnackbar("Copied URL");
    setShowCopy(false);
    setTimeout(() => {
      setShowCopy(true);
    }, 2000);
  }

  return (
    <IconButton onClick={handleCopy}>
      {showCopy ? <ContentCopy /> : <Check />}
    </IconButton>
  );
};

export default CopyButon;
