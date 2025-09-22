import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

export default function ErrorSnackbar({ open, onClose, message }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity='error'
        variant='outlined'
        sx={{
          width: "100%",
          zIndex: 9999,
          backgroundColor: "background.paper",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
