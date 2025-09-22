"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const ViewMoreButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push("/b2b");
      }}
      variant='contained'
      color='primary'
      size='small'
      sx={{
        fontSize: ".9rem",
        fontWeight: "normal",
        px: 2,
        "&::after": {
          content: '"›"',
          flexShrink: 0,
          marginLeft: "0.5rem",
        },
      }}
    >
      View More
    </Button>
  );
};

export default ViewMoreButton;
