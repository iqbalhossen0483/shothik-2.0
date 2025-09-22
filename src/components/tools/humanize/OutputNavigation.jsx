import {
  ChevronLeft,
  ChevronRight,
  ContentCopy,
  VerticalAlignBottom,
} from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import useSnackbar from "../../../hooks/useSnackbar";
import { downloadFile } from "../common/downloadfile";

const OutputNavigation = ({
  isMobile,
  setShowIndex,
  showIndex,
  outputs,
  selectedContend,
}) => {
  const enqueueSnackbar = useSnackbar();

  async function handleCopy() {
    await navigator.clipboard.writeText(selectedContend);
    enqueueSnackbar("Copied to clipboard");
  }

  const handleDownload = () => {
    downloadFile(selectedContend, "Humanize");
    enqueueSnackbar("Text Downloaded");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 0 : 2,
        my: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Button
          size={isMobile ? "small" : "medium"}
          disabled={!showIndex}
          onClick={() => setShowIndex((prev) => prev - 1)}
          variant={isMobile ? "text" : "outlined"}
          startIcon={!isMobile && <ChevronLeft className='icon' />}
        >
          {isMobile ? <ChevronLeft className='icon' /> : "Previous"}
        </Button>

        <Typography sx={{ textWrap: "nowrap" }}>
          Draft {showIndex + 1} of {outputs}
        </Typography>

        <Button
          size={isMobile ? "small" : "medium"}
          disabled={showIndex === outputs - 1}
          onClick={() => setShowIndex((prev) => prev + 1)}
          variant={isMobile ? "text" : "outlined"}
          endIcon={!isMobile && <ChevronRight className='icon' />}
        >
          {isMobile ? <ChevronRight className='icon' /> : "Next"}
        </Button>
      </Box>

      <Tooltip title='Export' placement='top' arrow>
        <IconButton
          onClick={handleDownload}
          sx={{
            borderRadius: "5px",
            color: "primary.main",
            p: 1,
          }}
          aria-label='download'
          size='large'
        >
          <VerticalAlignBottom sx={{ fontWeight: 600 }} />
        </IconButton>
      </Tooltip>
      <Button
        size={isMobile ? "small" : "medium"}
        onClick={handleCopy}
        sx={{
          width: "fit-content",
          minWidth: "unset",
        }}
      >
        <ContentCopy />
        {!isMobile && <Typography>Copy</Typography>}
      </Button>
    </Box>
  );
};

export default OutputNavigation;
