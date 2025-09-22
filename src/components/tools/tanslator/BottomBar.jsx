import { ContentCopy, VerticalAlignBottom } from "@mui/icons-material";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import React from "react";
import useResponsive from "../../../hooks/useResponsive";
import useSnackbar from "../../../hooks/useSnackbar";
import WordCounter from "../common/WordCounter";
import { downloadFile } from "../common/downloadfile";

const BottomBar = ({
  userInput,
  outputContend,
  userPackage,
  isHumanizing,
  isLoading,
  handleClear,
  handleHumanize,
  handleSubmit,
}) => {
  const isMobile = useResponsive("down", "sm");
  const enqueueSnackbar = useSnackbar();

  async function handleCopy() {
    await navigator.clipboard.writeText(outputContend);
    enqueueSnackbar("Copied to clipboard");
  }

  const handleDownload = () => {
    downloadFile(outputContend, "translation");
    enqueueSnackbar("Text Downloaded");
  };

  return (
    <WordCounter
      toolName='translator'
      userInput={userInput}
      userPackage={userPackage}
      isLoading={isLoading}
      handleClearInput={handleClear}
      handleSubmit={handleSubmit}
      btnText={outputContend ? "Regenerate" : "Translate"}
      sticky={320}
      ExtraBtn={
        outputContend ? (
          <Button
            onClick={handleHumanize}
            variant='contained'
            disabled={isLoading}
            loading={isHumanizing}
            sx={{ py: { md: 0 }, px: { md: 2 }, height: { md: 40 } }}
          >
            Humanize
          </Button>
        ) : null
      }
    >
      <Stack direction='row' alignItems='center'>
        {outputContend && (
          <>
            <Tooltip title='Export' placement='top' arrow>
              <IconButton
                onClick={handleDownload}
                aria-label='download'
                size={isMobile ? "small" : "large"}
              >
                <VerticalAlignBottom sx={{ fontWeight: 600 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Copy Full Text' placement='top' arrow>
              <IconButton
                onClick={handleCopy}
                aria-label='copy'
                size={isMobile ? "small" : "large"}
              >
                <ContentCopy />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>
    </WordCounter>
  );
};

export default BottomBar;
