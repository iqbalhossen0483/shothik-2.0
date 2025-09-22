
// src/components/tools/paraphrase/ModeNavigation.jsx
import React from "react";
import {
  Slider,
  Box,
  Stack,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Lock, ExpandMore } from "@mui/icons-material";
import { modes } from "../../../_mock/tools/paraphrase";

const ModeNavigation = ({
  selectedMode,
  setSelectedMode,
  userPackage,
  selectedSynonyms,
  setSelectedSynonyms,
  SYNONYMS,
  setShowMessage,
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));      // <600px
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600–900px
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg")); // 900–1200px

  // determine how many tabs to show before collapsing
  let visibleCount;
  if (isXs) visibleCount = 2;
  else if (isSm) visibleCount = 4;
  else if (isMd) visibleCount = 6;
  else visibleCount = modes.length; // lg and up, show all

  const initialModes = modes.slice(0, visibleCount);
  const extraModes = modes.slice(visibleCount);

  // handle the “extra” selected mode
  const [extraMode, setExtraMode] = React.useState(() =>
    initialModes.some((m) => m.value === selectedMode) ? null : selectedMode
  );

  // menu state for “More”
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMoreClick = (e) => setAnchorEl(e.currentTarget);
  const handleMoreClose = () => setAnchorEl(null);

  // unified mode-change logic
  const changeMode = (value) => {
    const modeObj = modes.find((m) => m.value === value);
    const isValid = modeObj.package.includes(userPackage || "free");
    if (isValid) {
      setSelectedMode(value);
      setShowMessage({ show: false, Component: null });
    } else {
      setShowMessage({ show: true, Component: value });
    }
    if (extraModes.some((m) => m.value === value)) {
      setExtraMode(value);
    }
    handleMoreClose();
  };

  // build list of tabs
  const displayedModes = extraMode
    ? [...initialModes, modes.find((m) => m.value === extraMode)]
    : initialModes;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: 2, pt: 1 }}
      spacing={2}
    >
      {/* Modes */}
      <Box sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Tabs
          value={selectedMode}
          onChange={(_, v) => changeMode(v)}
          variant="standard"
          sx={{
            flexWrap: "nowrap",
            overflow: "hidden",
            "& .MuiTabs-flexContainer": {
              gap: {
                xs: 0.5,
                sm: 1,
                md: 2,
                lg: 3,
              },
            },
            "& .MuiButtonBase-root": {
              minWidth: 0,
            },
            "& .MuiTabs-indicator": { display: "none" },
          }}
          textColor="primary"
        >
          {displayedModes.map((mode, idx) => (
            <Tab
              key={idx}
              value={mode.value}
              label={
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  {!mode.package.includes(userPackage || "free") && (
                    <Lock sx={{ width: 12, height: 12 }} />
                  )}
                  <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                    {mode.value}
                  </Typography>
                </Stack>
              }
            />
          ))}
        </Tabs>

        {/* Always keep the More button visible; initialModes shrink at breakpoints */}
        <Box
          id="mode_more_section"
          sx={{ position: "relative", ml: 1, flexShrink: 0 }}
        >
          <Button
            id="mode_more"
            aria-controls={open ? "mode-more-menu" : undefined}
            aria-haspopup="true"
            onClick={handleMoreClick}
            sx={{ textTransform: "none", color: "text.secondary" }}
            endIcon={<ExpandMore />}
          >
            More
          </Button>
          <Menu
            id="mode-more-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMoreClose}
            MenuListProps={{ "aria-labelledby": "mode_more" }}
            container={document.getElementById("mode_more_section")}
          >
            {extraModes.map((mode) => (
              <MenuItem
                key={mode.value}
                onClick={() => changeMode(mode.value)}
              >
                {!mode.package.includes(userPackage || "free") && (
                  <Lock sx={{ width: 12, height: 12, mr: 0.5 }} />
                )}
                {mode.value}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      {/* Synonyms slider (unchanged) */}
      <Box sx={{ width: "150px" }}>
        <Slider
          aria-label="Synonyms"
          getAriaValueText={(v) => SYNONYMS[v]}
          value={Object.keys(SYNONYMS).find((k) => SYNONYMS[k] === selectedSynonyms)}
          marks
          step={20}
          min={20}
          max={80}
          valueLabelDisplay="on"
          valueLabelFormat={selectedSynonyms}
          onChange={(_, v) => setSelectedSynonyms(SYNONYMS[v])}
          sx={{
            mt: { xs: 2, sm: 1 },
            width: "100%",
            "& .MuiSlider-valueLabel": {
              fontSize: "12px",
              padding: "2px 6px",
              transform: "translateY(-21px)",
              "&:before": { width: "6px", height: "6px", bottom: 0 },
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default ModeNavigation;

