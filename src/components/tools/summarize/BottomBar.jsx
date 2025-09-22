import {
  ContentCopy,
  StickyNote2Rounded,
  VerticalAlignBottom,
} from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import useSnackbar from "../../../hooks/useSnackbar";
import WordCounter from "../common/WordCounter";
import { downloadFile } from "../common/downloadfile";

const BottomBar = ({
  userInput,
  outputContend,
  userPackage,
  isLoading,
  handleClear,
  handleSubmit,
}) => {
  const enqueueSnackbar = useSnackbar();

  async function handleCopy() {
    await navigator.clipboard.writeText(outputContend);
    enqueueSnackbar("Copied to clipboard");
  }

  const handleDownload = () => {
    downloadFile(outputContend, "summarize");
    enqueueSnackbar("Text Downloaded");
  };

  const countSentence = (text) => {
    return text.split(/[.।]/).length - 1;
  };

  return (
    <WordCounter
      handleClearInput={handleClear}
      btnText='Summarize'
      isLoading={isLoading}
      userInput={userInput}
      userPackage={userPackage}
      handleSubmit={handleSubmit}
      toolName='summarize'
      sticky={220}
    >
      <Stack direction='row' spacing={1} alignItems='center'>
        {outputContend && (
          <>
            <Stack direction='row' spacing={1} alignItems='center'>
              <StickyNote2Rounded sx={{ color: "text.secondary" }} />
              <Typography variant='subtitle2'>
                {countSentence(outputContend)} Sentence
              </Typography>
            </Stack>

            <Tooltip title='Export' placement='top' arrow>
              <IconButton
                onClick={handleDownload}
                sx={{
                  borderRadius: "5px",
                  p: 1,
                  "&:hover": {
                    backgroundColor: "inherit",
                    color: "primary.main",
                    boxShadow: "none",
                  },
                }}
                aria-label='download'
                size='large'
              >
                <VerticalAlignBottom sx={{ fontWeight: 600 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Copy Full Text' placement='top' arrow>
              <IconButton
                onClick={handleCopy}
                sx={{
                  borderRadius: "5px",
                  p: 1,
                  "&:hover": {
                    backgroundColor: "inherit",
                    color: "primary.main",
                    boxShadow: "none",
                  },
                }}
                aria-label='copy'
                size='large'
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
