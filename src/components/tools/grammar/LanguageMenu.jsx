import {
  ExpandMoreOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import { Button, Stack, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import useResponsive from "../../../hooks/useResponsive";
import LanguageMenus from "../common/LanguageMenus";

// You can include "Auto Detect" as a valid tab option if needed
const initLanguage = ["English", "Bangla"]; // Add "Auto Detect" here if needed

const LanguageMenu = ({ setLanguage, isLoading, language }) => {
  const [languageTabs, setlanguageTabs] = useState(initLanguage);
  const [showMenu, setShowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useResponsive("down", "sm");

  function handleLanguage(e) {
    setAnchorEl(e.currentTarget);
    setShowMenu(true);
  }

  function handleLanguageMenu(value) {
    const languageLength = isMobile ? 3 : 5;
    setlanguageTabs((prev) => {
      if (!prev.includes(value)) {
        const newTabs = [...prev, value];
        return newTabs.length > languageLength ? newTabs.slice(1) : newTabs;
      }
      return prev;
    });
    setLanguage(value);
  }

  // ✅ Ensure language is valid
  const selectedTab = languageTabs.includes(language)
    ? language
    : languageTabs[0];

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={{ xs: 2, sm: 4 }}
      sx={{ paddingX: 2, width: "100%" }}
    >
      <Tabs
        onChange={(_, value) => setLanguage(value)}
        textColor="primary"
        value={selectedTab}
        sx={{
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        {languageTabs.map((tab) => (
          <Tab
            key={tab}
            value={tab}
            label={tab}
            disabled={isLoading}
            sx={{
              "&.MuiTab-root:hover": {
                color: "text.primary",
              },
            }}
          />
        ))}
      </Tabs>
      <Box id="language-menu-wrapper">
        <Button id="language_x_button" sx={{zIndex: -999, opacity: 0, position: "absolute", }} onClick={()=>{
          setShowMenu(false)
        }}>x</Button>
        <Button
          disabled={isLoading}
          onClick={handleLanguage}
          size="small"
          id="language_all_button"
          endIcon={
            showMenu ? <KeyboardArrowUpOutlined /> : <ExpandMoreOutlined />
          }
          variant="text"
          sx={{ color: "text.secondary" }}
        >
          All
        </Button>

        <LanguageMenus
          selectedLanguage={language}
          anchorEl={anchorEl}
          handleClose={() => setShowMenu(false)}
          handleLanguageMenu={handleLanguageMenu}
          open={showMenu}
        />

      </Box>
    </Stack>
  );
};

export default LanguageMenu;
