import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { detectLanguage } from "../../../hooks/languageDitector";
import { FluentMdl2Switch } from "../../../resource/assets/LanguageToggleSwitch";
import LanguageMenus from "../common/LanguageMenus";

const LanguageMenu = ({
  isLoading,
  userInput,
  reverseText,
  translateLang,
  setTranslateLang,
}) => {
  const [languageDirection, setLanguageDirection] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [anchorEl, setEnchorEl] = useState(null);

  useEffect(() => {
    if (!userInput) return;
    const language = detectLanguage(userInput);
    setTranslateLang((prev) => {
      return { ...prev, fromLang: language };
    });
  }, [userInput]);

  function handleLanguage(e, direction) {
    setEnchorEl(e.target);
    setShowMenu(true);
    setLanguageDirection(direction);
  }

  const handleReverseTranslation = (e) => {
    setTranslateLang((prev) => ({
      fromLang: prev.toLang,
      toLang: prev.fromLang,
    }));

    reverseText();
  };

  function handleLanguageMenu(value) {
    setTranslateLang((prev) => {
      return { ...prev, [languageDirection]: value };
    });
  }

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      sx={{ mb: 1 }}
    >
      <Button
        disabled={isLoading}
        onClick={(e) => handleLanguage(e, "fromLang")}
        endIcon={<KeyboardArrowDown fontSize='small' />}
      >
        {translateLang.fromLang}
      </Button>
      <LanguageMenus
        anchorEl={anchorEl}
        handleClose={() => setShowMenu(false)}
        handleLanguageMenu={handleLanguageMenu}
        open={showMenu}
      />
      <Button
        onClick={handleReverseTranslation}
        sx={{ cursor: isLoading ? "default" : "pointer" }}
        disabled={!userInput || isLoading}
      >
        <FluentMdl2Switch />
      </Button>
      <Button
        disabled={isLoading}
        onClick={(e) => handleLanguage(e, "toLang")}
        endIcon={<KeyboardArrowDown fontSize='small' />}
      >
        {translateLang.toLang}
      </Button>
    </Stack>
  );
};

export default LanguageMenu;
