import {
  ChevronLeft,
  ChevronRight,
  ContentCopy,
  DeleteRounded,
  GppMaybe,
  History,
  KeyboardArrowDown,
  KeyboardArrowUp,
  VerticalAlignBottom,
} from "@mui/icons-material";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import useResponsive from "../../../hooks/useResponsive";
import useSnackbar from "../../../hooks/useSnackbar";
import WordIcon from "../../../resource/assets/WordIcon";
import { downloadFile } from "../common/downloadfile";

const OutputBotomNavigation = ({
  sentenceCount,
  outputWordCount,
  proccessing,
  setOutputHistoryIndex,
  outputHistoryIndex,
  outputHistory,
  handleClear,
  outputContend,
  activeSentence,
  setActiveSentence,
}) => {
  const enqueueSnackbar = useSnackbar();
  const isMobile = useResponsive("down", "sm");

  const handleDownload = () => {
    downloadFile(outputContend, "paraphrase");
    enqueueSnackbar("Text Downloaded");
  };

  async function handleCopy() {
    await navigator.clipboard.writeText(outputContend);
    enqueueSnackbar("Copied to clipboard");
  }

  return (
    <Stack
      direction='row'
      columnGap={2}
      alignItems='center'
      justifyContent='space-between'
      flexWrap='wrap'
      rowGap={1}
      sx={{
        paddingBottom: 1,
        paddingX: 2,
        flexShrink: 0,
        minHeight: "auto",
        mt: "auto",
      }}
    >
      <Stack direction='row' columnGap={1} alignItems='center'>
        <Stack direction='row' spacing={0.5} alignItems='center'>
          <Tooltip title='Previous sentence' arrow placement='top'>
            <IconButton
              onClick={() => setActiveSentence((prev) => prev - 1)}
              disabled={activeSentence <= 1}
              color='primary'
              size='small'
              aria-label='delete'
              sx={{
                bgcolor: "rgba(73, 149, 87, 0.04)",
                borderRadius: "5px",
              }}
            >
              <KeyboardArrowUp />
            </IconButton>
          </Tooltip>

          <Typography sx={{ fontWeight: 600 }}>
            <b>{activeSentence}</b>/{sentenceCount}
          </Typography>

          <Tooltip title='Next sentence' arrow placement='top'>
            <IconButton
              onClick={() => setActiveSentence((prev) => prev + 1)}
              disabled={activeSentence === sentenceCount}
              size='small'
              sx={{
                bgcolor: "rgba(73, 149, 87, 0.04)",
                borderRadius: "5px",
              }}
              aria-label='delete'
              color='primary'
            >
              <KeyboardArrowDown />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction='row' alignItems='center' gap={0.5}>
          <WordIcon />
          <Typography sx={{ fontWeight: 600 }}>{outputWordCount}</Typography>
        </Stack>
      </Stack>
      <Stack direction='row' alignItems='center' justifyContent='end'>
        <Box>
          {proccessing.loading ? (
            <Image
              src='/loading-gif.gif'
              alt='arrow-left'
              width={25}
              height={25}
            />
          ) : !proccessing.success && sentenceCount ? (
            <GppMaybe sx={{ color: "#991006", fontSize: "16px" }} />
          ) : null}
        </Box>
        {!isMobile && (
          <Stack direction='row' spacing={0.5} alignItems='center'>
            <Tooltip title='Previous history' arrow placement='top'>
              <IconButton
                size='small'
                onClick={() => setOutputHistoryIndex((prev) => prev + 1)}
                disabled={
                  !outputHistory.length ||
                  outputHistoryIndex === outputHistory.length - 1
                }
                color='primary'
                aria-label='delete'
                sx={{
                  bgcolor: "rgba(73, 149, 87, 0.04)",
                  borderRadius: "5px",
                }}
              >
                <ChevronLeft />
              </IconButton>
            </Tooltip>

            <IconButton
              color='text.secondary'
              aria-label='History'
              size='small'
              sx={{
                bgcolor: "rgba(73, 149, 87, 0.04)",
                borderRadius: "5px",
              }}
            >
              <History />
            </IconButton>

            <Tooltip title='Next history' arrow placement='top'>
              <IconButton
                onClick={() => setOutputHistoryIndex((prev) => prev - 1)}
                disabled={outputHistoryIndex === 0}
                sx={{
                  bgcolor: "rgba(73, 149, 87, 0.04)",
                  borderRadius: "5px",
                  mr: 0.5,
                }}
                aria-label='delete'
                color='primary'
              >
                <ChevronRight />
              </IconButton>
            </Tooltip>
          </Stack>
        )}

        <Tooltip title='Clear result' placement='top' arrow>
          <IconButton
            onClick={() => handleClear("output")}
            sx={{
              borderRadius: "5px",
              p: 1,
              "&:hover": {
                backgroundColor: "inherit",
                color: "primary",
                boxShadow: "none",
              },
            }}
            aria-label='clear'
            size='large'
          >
            <DeleteRounded />
          </IconButton>
        </Tooltip>
        <Tooltip title='Export' placement='top' arrow>
          <IconButton
            onClick={handleDownload}
            sx={{
              borderRadius: "5px",
              p: 1,
              "&:hover": {
                backgroundColor: "inherit",
                color: "primary",
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
            aria-label='download'
            size='large'
          >
            <ContentCopy />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default OutputBotomNavigation;
