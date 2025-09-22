"use client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/system";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginModal } from "../../../redux/slice/auth";
import { setAlertMessage, setShowAlert } from "../../../redux/slice/tools";
import SvgColor from "../../../resource/SvgColor";

export default function AlertDialog() {
  const { showAlert, alertMessage } = useSelector((state) => state.tools);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Dialog
      open={showAlert}
      onClose={() => dispatch(setShowAlert(false))}
      fullWidth
      maxWidth='xs'
    >
      <span
        style={{
          marginBottom: -30,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <span style={{ paddingTop: 20, paddingRight: 20 }}>
          <SvgColor
            src='/icons/close.svg'
            onClick={() => dispatch(setAlertMessage(false))}
            sx={{ cursor: "pointer" }}
          />
        </span>
      </span>
      <DialogContent>
        <Stack sx={{ pt: { xs: 3, md: 5 } }}>
          <SvgColor
            color='primary.main'
            src={"/tools/ic-lock.svg"}
            sx={{ margin: "0 auto", width: 96, height: 96 }}
          />
        </Stack>
        <DialogContentText
          sx={{ pt: { xs: 3, md: 3 }, textAlign: "center" }}
          id='alert-dialog-description'
        >
          {alertMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mb: { xs: 1.5, md: 2.5 } }}>
        <Button
          fullWidth
          color='inherit'
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.grey[300]
                : theme.palette.grey[900],
            color: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.grey[900]
                : theme.palette.grey[300],
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.grey[300], 0.9)
                  : alpha(theme.palette.grey[900], 0.9),
            },
          }}
          variant='contained'
          size='medium'
          onClick={() => {
            if (!user) {
              router.push("/pricing");
            } else {
              dispatch(setShowAlert(false));
              dispatch(setShowLoginModal(true));
            }
          }}
        >
          {!user ? "Login" : "Upgrade now"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
