import { Check } from "@mui/icons-material";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { setIsNewRegistered } from "../../redux/slice/auth";

export default function AuthSuccessPopup() {
  const { isNewRegistered } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Dialog
      open={isNewRegistered}
      onClose={() => dispatch(setIsNewRegistered(false))}
      slotProps={{
        paper: {
          sx: { borderRadius: "16px", p: 4, maxWidth: "400px", m: 2 },
        },
      }}
      style={{
        zIndex: 10000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: green[500],
            borderRadius: "50%",
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Check
            sx={{
              fontSize: 48,
              color: "white",
            }}
          />
        </Box>
        <Typography
          variant='h4'
          sx={{
            color: green[500],
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Success
        </Typography>

        <Typography
          variant='body1'
          sx={{
            color: "text.secondary",
            mb: 2,
          }}
        >
          Congratulations, your account has been successfully created.
        </Typography>
        <Button
          variant='contained'
          onClick={() => dispatch(setIsNewRegistered(false))}
          sx={{
            backgroundColor: green[500],
            px: 4,
            py: 1.5,
            borderRadius: "50px",
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: green[600],
            },
          }}
        >
          Continue
        </Button>
      </Box>
    </Dialog>
  );
}
