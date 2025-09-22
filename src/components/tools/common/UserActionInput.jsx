"use client";
import { ContentPaste, SaveAsOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
const FileUpload = dynamic(() => import("./FileUpload"), { ssr: false });

const UserActionInput = ({
  isMobile,
  setUserInput,
  extraAction,
  disableTrySample = false,
  sampleText,
}) => {
  async function handlePaste() {
    const clipboardText = await navigator.clipboard.readText();
    setUserInput(clipboardText);
    if (extraAction) extraAction();
  }

  function handleSampleText() {
    if (!sampleText) return;
    setUserInput(sampleText);
    if (extraAction) extraAction();
  }

  const handleFileData = (htmlValue) => {
    setUserInput(htmlValue);
    if (extraAction) extraAction();
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        bottom: { sm: 80, xs: 80 },
        left: "0px",
        right: "0px",
      }}
    >
      <Stack
        direction='row'
        alignItems='start'
        justifyContent='center'
        flexWrap='wrap'
        rowGap={1.5}
        columnGap={2}
        sx={{ width: "80%", mx: "auto" }}
      >
        <Stack
          direction='row'
          id="sample-paste-section"
          alignItems='start'
          justifyContent='center'
          flexWrap='wrap'
          rowGap={1.5}
          columnGap={2}
          sx={{ width: "80%", mx: "auto" }}
        >
          {!disableTrySample ? (
            <Button
              color='warning'
              size={isMobile ? "small" : "large"}
              variant='soft'
              onClick={handleSampleText}
              disabled={!sampleText}
              startIcon={<SaveAsOutlined />}
              sx={{
                border: { sm: "none", xs: "2px solid" },
                borderColor: "primary.warning",
                borderRadius: "5px",
                "&:hover": {
                  borderColor: "primary.dark",
                },
              }}
            >
              {!isMobile ? "Try Sample Text" : "Try Sample"}
            </Button>
          ) : null}

          <Button
            size={isMobile ? "small" : "large"}
            variant='soft'
            color='secondary'
            onClick={handlePaste}
            sx={{
              border: { sm: "none", xs: "2px solid" },
              borderColor: "primary.secondary",
              borderRadius: "5px",
              "&:hover": {
                borderColor: "primary.dark",
              },
            }}
            startIcon={<ContentPaste />}
          >
            {!isMobile ? "Paste Text" : "Paste"}
          </Button>
        </Stack>
        <Box>
          <FileUpload isMobile={isMobile} setInput={handleFileData} />
          <Typography
            component='p'
            variant='caption'
            sx={{
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            {isMobile ? "" : "Supported file"} formats: pdf,docx.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default UserActionInput;
