import { DeleteRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import useResponsive from "../../../hooks/useResponsive";
import useStickyBottom from "../../../hooks/useStickyBottom";
import useWordLimit from "../../../hooks/useWordLimit";
import WordIcon from "../../../resource/assets/WordIcon";
import SvgColor from "../../../resource/SvgColor";

function WordCounter({
  userInput,
  isLoading,
  toolName,
  handleClearInput,
  children,
  userPackage,
  handleSubmit,
  btnText,
  ExtraBtn = null,
  ExtraCounter = null,
  btnIcon = null,
  sx = {},
  dontDisable = false,
  sticky = 635,
}) {
  if (sticky) {
    const { ref, style } = useStickyBottom(sticky);
    return (
      <Box ref={ref} sx={style}>
        <Contend
          btnText={btnText}
          handleClearInput={handleClearInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          toolName={toolName}
          userInput={userInput}
          userPackage={userPackage}
          ExtraBtn={ExtraBtn}
          ExtraCounter={ExtraCounter}
          btnIcon={btnIcon}
          dontDisable={dontDisable}
          sx={sx}
        >
          {children}
        </Contend>
      </Box>
    );
  } else {
    return (
      <Contend
        btnText={btnText}
        handleClearInput={handleClearInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        toolName={toolName}
        userInput={userInput}
        userPackage={userPackage}
        ExtraBtn={ExtraBtn}
        ExtraCounter={ExtraCounter}
        btnIcon={btnIcon}
        dontDisable={dontDisable}
        sx={sx}
      >
        {children}
      </Contend>
    );
  }
}

const Contend = ({
  userInput,
  isLoading,
  toolName,
  handleClearInput,
  children,
  userPackage,
  handleSubmit,
  btnText,
  ExtraBtn = null,
  ExtraCounter = null,
  btnIcon = null,
  sx = {},
  dontDisable = false,
}) => {
  const [wordCount, setWordCount] = useState(0);
  const isMobile = useResponsive("down", "sm");
  const { wordLimit } = useWordLimit(toolName);

  useEffect(() => {
    const words = userInput.trim() ? String(userInput).split(" ").length : 0;
    setWordCount(words);
  }, [userInput]);

  if (!userInput) return <Box sx={{ height: 48 }} />;
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
        py: 1,
        ...sx,
      }}
      bgcolor='background.paper'
    >
      <Stack
        direction='row'
        spacing={2}
        alignItems='center'
        justifyContent='space-between'
        height={48}
        sx={
          btnText === "Fix Grammar"
            ? { width: { xs: "100%", sm: "auto" } }
            : undefined
        }
      >
        <Stack direction='row' spacing={1} alignItems='center'>
          <WordIcon />
          <Typography
            variant='subtitle2'
            sx={{
              color: `${wordCount > wordLimit ? "error.main" : ""}`,
              whiteSpace: "nowrap",
            }}
          >
            <b>{wordCount}</b> /{" "}
            {wordLimit === 9999 ? (
              <Typography component='span' sx={{ color: "primary.main" }}>
                Unlimited
              </Typography>
            ) : (
              wordLimit
            )}
          </Typography>

          <Tooltip title='Clear text' placement='top' arrow>
            <IconButton
              aria-label='delete'
              size={isMobile ? "small" : "large"}
              variant={"outlined"}
              color='inherit'
              disabled={isLoading}
              onClick={handleClearInput}
              style={{ marginLeft: "-4px" }}
              disableRipple
            >
              <DeleteRounded sx={{ color: "text.secondary" }} />
            </IconButton>
          </Tooltip>
        </Stack>
        {ExtraCounter}
      </Stack>

      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        {wordCount > wordLimit && userPackage !== "unlimited" && (
          <Link href='/pricing'>
            <Button
              sx={{ py: { md: 0 }, px: { md: 2 }, height: { md: 40 } }}
              variant='contained'
              startIcon={
                <SvgColor
                  src='/navbar/diamond.svg'
                  sx={{ width: { xs: 20, md: 20 }, height: { xs: 20, md: 20 } }}
                />
              }
            >
              Upgrade
            </Button>
          </Link>
        )}
        <Button
          onClick={() => handleSubmit()}
          variant='contained'
          loading={isLoading}
          disabled={!dontDisable ? wordCount > wordLimit : false}
          sx={{ py: { md: 0 }, px: { md: 2 }, height: { md: 40 } }}
          startIcon={btnIcon}
        >
          {btnText}
        </Button>
        {ExtraBtn}
      </Stack>
      {children}
    </Stack>
  );
};

export default WordCounter;
