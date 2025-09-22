import { Close, Lock } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { modes } from "../../../_mock/tools/paraphrase";
import SvgColor from "../../../resource/SvgColor";

const ModeModal = ({
  showModeModal,
  handleClose,
  selectedMode,
  userPackage,
  setSelectedMode,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Modal
      sx={{ zIndex: 0 }}
      keepMounted
      open={showModeModal}
      onClose={handleClose}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: "0px",
          width: "100%",
          height: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          px: 4,
          pt: 3,
          pb: 2,
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      >
        <Typography variant='h5'>Choose a mode</Typography>

        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 5,
            top: 5,
            zIndex: 1,
          }}
        >
          <Close />
        </IconButton>

        <Grid2 container spacing={2} mt={2}>
          {modes.map((mode, index) => (
            <Grid2 size={{ xs: 6, md: 4 }} key={index}>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                spacing={1}
                sx={{
                  p: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  cursor: "pointer",
                  color:
                    selectedMode === mode.value
                      ? "primary.main"
                      : "text.primary",
                  bgcolor:
                    selectedMode === mode.value ? "primary.lighter" : "unset",
                }}
                onClick={() => {
                  if (mode.package.includes(userPackage || "free")) {
                    setSelectedMode(mode.value);
                    handleClose();
                  } else {
                    setShowAlert(true);
                  }
                }}
              >
                {!mode.package.includes(userPackage || "free") && (
                  <Lock sx={{ width: 12, height: 12 }} />
                )}
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                  {mode.value}
                </Typography>
              </Stack>
            </Grid2>
          ))}
        </Grid2>

        <Modal open={showAlert} onClose={() => setShowAlert(false)}>
          <Box
            sx={{
              position: "absolute",
              bottom: "0px",
              width: "100%",
              height: "auto",
              bgcolor: "rgba(0,0,0, 0.6)",
              zIndex: 999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingY: 5,
            }}
          >
            <Link href='/pricing?redirect=paraphrase'>
              <Button
                color='primary'
                size='medium'
                variant='contained'
                startIcon={
                  <SvgColor
                    src='/navbar/diamond.svg'
                    sx={{
                      width: { xs: 20, md: 24 },
                      height: { xs: 20, md: 24 },
                    }}
                  />
                }
              >
                Upgrade Plan
              </Button>
            </Link>
          </Box>
        </Modal>
      </Box>
    </Modal>
  );
};

export default ModeModal;
