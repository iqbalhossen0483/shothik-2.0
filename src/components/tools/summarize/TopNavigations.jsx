import { Box, Slider, Stack, Tab, Tabs, Typography } from "@mui/material";
import React from "react";

const TopNavigations = ({
  selectedMode,
  setSelectedMode,
  modes,
  LENGTH,
  currentLength,
  setCurrentLength,
}) => {
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      sx={{ mb: 1 }}
      flexWrap='wrap'
      rowGap={1}
    >
      <Box>
        <Tabs
          value={selectedMode}
          onChange={(_, value) => setSelectedMode(value)}
          sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          {modes.map((tab) => (
            <Tab
              key={tab.name}
              icon={tab.icon}
              value={tab.name}
              label={tab.name}
              sx={{
                color: "text.secondary",
                "&.Mui-selected": {
                  color: "primary.main",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          gap: 2,
          mt: 2,
          mr: 2,
        }}
      >
        <Typography variant='subtitle2'>Length:</Typography>
        <Slider
          style={{ width: "150px" }}
          aria-label='Length'
          getAriaValueText={(value) => LENGTH[value]}
          value={Object.keys(LENGTH).find(
            (key) => LENGTH[key] === currentLength
          )}
          marks
          step={20}
          min={20}
          max={80}
          valueLabelDisplay='on'
          valueLabelFormat={currentLength}
          onChange={(_, value) => setCurrentLength(LENGTH[value])}
          sx={{
            mt: { xs: 2, sm: 0 },
            "& .MuiSlider-valueLabel": {
              fontSize: "12px",
              padding: "2px 6px",
              transform: "translateY(-21px)",
              "&:before": {
                width: "6px",
                height: "6px",
                bottom: "-0px",
              },
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default TopNavigations;
