import React, { useState } from "react";
import { Close, Search, Check } from "@mui/icons-material";
import {
  Box,
  Drawer,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Stack,
  Typography,
  Menu,
} from "@mui/material";
import { languages } from "../../../_mock/tools/languages";
import useResponsive from "../../../hooks/useResponsive";

const RenderLanguages = ({
  handleLanguageMenu,
  handleClose,
  selectedLanguage,
}) => {
  const [filterTerm, setFilterTerm] = useState("");

  const filtered = languages.filter((lang) =>
    lang.name.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <Box
      id="language_menu"
    >
      {/* Sticky search bar with secondary‐colored icon */}
      <FormControl
        variant="outlined"
        sx={{
          p: { xs: 2, md: 1 },
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "background.paper",
        }}
      >
        <OutlinedInput
          size="small"
          placeholder="Search language..."
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          endAdornment={
            <InputAdornment
              position="end"
              sx={{ color: "text.secondary" }}  // ensure the icon uses theme.secondary
            >
              <Search />
            </InputAdornment>
          }
        />
      </FormControl>

      {/* 3-column grid of languages */}
      <Box
        sx={{
          maxHeight: { xs: "60vh", md: "50vh" },
          overflowY: "auto",
          p: { xs: 2, md: 1 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2,1fr)",
              md: "repeat(3,1fr)",
            },
            gap: 1,
          }}
        >
          {filtered.map((lang, index) => {
            const isSelected = lang.name === selectedLanguage;
            return (
              <Box
                key={`${lang.name}-${index}`}  // append index to guarantee uniqueness
                onClick={() => {
                  handleLanguageMenu(lang.name);
                  handleClose();
                }}
                sx={{
                  cursor: "pointer",
                  p: 1,
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: isSelected
                    ? "success.light"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: isSelected
                      ? "success.light"
                      : "action.hover",
                  },
                }}
              >
                <Typography variant="body2">{lang.name}</Typography>
                {isSelected && (
                  <Check sx={{ fontSize: 16, color: "success.main" }} />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const LanguageMenus = ({
  open,
  anchorEl,
  handleClose,
  handleLanguageMenu,
  selectedLanguage,
}) => {
  const isMobile = useResponsive("down", "sm");

  return (
    <>
      {isMobile ? (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
          }}
        >
          <Box sx={{ height: "60vh" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ pt: 2, px: 2 }}
            >
              <Typography variant="subtitle1">Select language</Typography>
              <Close
                color="secondary"
                onClick={handleClose}
                sx={{ cursor: "pointer" }}
              />
            </Stack>
            <RenderLanguages
              handleLanguageMenu={handleLanguageMenu}
              handleClose={handleClose}
              selectedLanguage={selectedLanguage}
            />
          </Box>
        </Drawer>
      ) : (
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              role: "listbox",
              "aria-labelledby": "language-button",
            },
            paper: { style: { width: 550 } },
          }}
        >
          <RenderLanguages
            handleLanguageMenu={handleLanguageMenu}
            handleClose={handleClose}
            selectedLanguage={selectedLanguage}
          />
        </Menu>
      )}
    </>
  );
};

export default LanguageMenus;

