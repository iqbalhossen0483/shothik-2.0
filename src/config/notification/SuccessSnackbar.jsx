import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

export default function SuccessSnackbar({ open, onClose, message }) {
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
        severity='success'
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
