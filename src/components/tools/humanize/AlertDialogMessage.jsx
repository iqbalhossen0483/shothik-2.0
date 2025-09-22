import { Diamond } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const AlertDialogMessage = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        translate: "-50% -50%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          width: { xs: "90%", sm: 400 },
          boxShadow: 3,
        }}
      >
        <Typography variant="h5">Upgrade</Typography>
        <Typography variant="body1" sx={{ xs: "14px", lg: "16px" }}>
          Unlock advanced features and enhance your paraphrasing experience.
        </Typography>
        <Link href="/pricing">
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
          >
            <Diamond fontSize="small" sx={{ marginRight: "5px" }} />
            Upgrade to Premium
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default AlertDialogMessage;
