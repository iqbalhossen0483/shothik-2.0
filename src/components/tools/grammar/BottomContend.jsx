import {
  ContentCopy,
  StickyNote2Rounded,
  VerticalAlignBottom,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import useSnackbar from "../../../hooks/useSnackbar";
import { useSpellCheckerMutation } from "../../../redux/api/tools/toolsApi";
import WordCounter from "../common/WordCounter";
import { downloadFile } from "../common/downloadfile";

const BottomContend = ({
  userInput,
  outputContend,
  userPackage,
  isLoading,
  handleClear,
  handleSubmit,
  language,
  errors,
  setErrors,
}) => {
  const [errorChecking, setErrorChecking] = useState(false);
  const [spellChecker] = useSpellCheckerMutation();

  const enqueueSnackbar = useSnackbar();
  const text = useDebounce(userInput);

  async function handleCopy() {
    await navigator.clipboard.writeText(outputContend);
    enqueueSnackbar("Copied to clipboard");
  }

  const handleDownload = () => {
    downloadFile(outputContend, "grammar");
    enqueueSnackbar("Text Downloaded");
  };

  const handleCheckSpelling = async () => {
    try {
      setErrorChecking(true);
      const payload = { content: userInput, language };
      const res = await spellChecker(payload).unwrap();
      const data = res?.result || [];
      setErrors(data);
    } catch (error) {
      enqueueSnackbar(error.message || "Something went wrong", {
        variant: "error",
      });
    } finally {
      setErrorChecking(false);
    }
  };

  useEffect(() => {
    if (!text) return;
    handleCheckSpelling(text);
  }, [text]);

  return (
    <>
      <WordCounter
        handleClearInput={handleClear}
        btnText='Fix Grammar'
        isLoading={isLoading}
        userInput={userInput}
        userPackage={userPackage}
        handleSubmit={handleSubmit}
        toolName='grammar'
        sticky={530}
        ExtraCounter={
          userInput ? (
            <Stack direction='row' spacing={1} alignItems='center'>
              <StickyNote2Rounded sx={{ color: "text.secondary" }} />
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                variant='subtitle2'
              >
                Errors:{" "}
                {errorChecking ? (
                  <CircularProgress color='error.main' size={18} />
                ) : (
                  <Box sx={{ color: "error.main" }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                      component='span'
                    >
                      {errors.length}
                    </Typography>
                    <Divider sx={{ mb: 0.3, backgroundColor: "error.main" }} />
                    <Divider sx={{ backgroundColor: "error.main" }} />
                  </Box>
                )}
              </Typography>
            </Stack>
          ) : null
        }
      >
        <Stack direction='row' spacing={1} alignItems='center'>
          {outputContend && (
            <>
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
      {/* error  */}
      {errors?.length ? (
        <Stack direction='row' alignItems='center' spacing={1} mb={1}>
          {errors?.map((text) => (
            <span
              key={text}
              style={{
                margin: "5px",
                border: "1px solid #b71d18",
                padding: "2px 5px",
                borderRadius: 5,
                fontWeight: "bold",
                color: "#b71d18",
              }}
            >
              {text}
            </span>
          ))}
        </Stack>
      ) : null}
    </>
  );
};

export default BottomContend;
