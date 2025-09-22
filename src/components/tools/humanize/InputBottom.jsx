import useWordLimit from "@/hooks/useWordLimit";
import { DeleteRounded } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const InputBottom = ({
  userInput,
  isMobile,
  miniLabel,
  isLoading,
  handleClear,
  setWordCount,
}) => {
  const { wordLimit } = useWordLimit("bypass");
  const [userInputInfo, setUserInputInfo] = useState({
    charecters: 0,
    sentences: 0,
    words: 0,
  });
  useEffect(() => {
    if (!userInput) return;

    const words = userInput.trim() ? String(userInput).split(" ").length : 0;
    const charecters = userInput.length;
    const sentences = userInput.split(/[.!?]/).filter(Boolean).length;
    setUserInputInfo({ words, charecters, sentences });
    setWordCount(words);
  }, [userInput]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingX: 2,
        borderTop: "1px solid",
        borderTopColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          sx={{
            fontSize: { xs: 12, sm: 15, md: 16 },
            color: `${userInputInfo.words > wordLimit ? "error.main" : ""}`,
          }}
        >
          {userInputInfo.words} /{" "}
          {wordLimit === 9999 ? (
            <Typography component="span" sx={{ color: "primary.main" }}>
              Unlimited
            </Typography>
          ) : (
            wordLimit
          )}{" "}
          Words
        </Typography>
        <Typography color="gray">|</Typography>
        <Typography sx={{ fontSize: { xs: 12, sm: 15, md: 16 } }}>
          {userInputInfo.charecters} {isMobile ? "Char" : "Characters"}
        </Typography>
        <Typography color="gray">|</Typography>
        <Typography sx={{ fontSize: { xs: 12, sm: 15, md: 16 } }}>
          {userInputInfo.sentences} {isMobile ? "Sen" : "Sentences"}
        </Typography>
      </Box>
      <IconButton
        aria-label="delete"
        size={isMobile ? "small" : "large"}
        variant={miniLabel ? "soft" : "outlined"}
        color="inherit"
        disabled={isLoading}
        onClick={handleClear}
      >
        <DeleteRounded sx={{ color: "text.secondary" }} />
      </IconButton>
    </Box>
  );
};

export default InputBottom;
