
// SettingsTab.jsx
import React from 'react';
import { Box, Typography, Divider, Checkbox, IconButton } from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";

const SettingsTab = () => {
  const paraphraseOptions = [
    { label: "Paraphrase quotations", info: false, checked: true },
    { label: "Avoid contractions", info: true },
    { label: "Prefer active voice", info: true },
    { label: "Automatic start paraphrasing", info: false },
  ];

  const interfaceOptions = [
    { label: "Use yellow highlight", checked: true },
    { label: "Show tooltips" },
    { label: "Show legend" },
    { label: "Show changed words", highlight: "warning.main" },
    { label: "Show Structural changes" },
    { label: "Show longest unchanged words", highlight: "info.main" },
  ];

  return (
    <Box id="settings_tab">
      <Typography variant="h6" fontWeight="bold">
        Settings
      </Typography>

      {/* Paraphrase Section */}
      <Typography variant="subtitle2" gutterBottom>
        Paraphrase
      </Typography>
      {paraphraseOptions.map((opt, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Checkbox size="small" defaultChecked={!!opt.checked} />
          <Typography variant="body2">{opt.label}</Typography>
          {opt.info && (
            <IconButton size="small" sx={{ ml: "auto" }}>
              <InfoIcon fontSize="small" color="action" />
            </IconButton>
          )}
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      {/* Interface Section */}
      <Typography variant="subtitle2" gutterBottom>
        Interface
      </Typography>
      {interfaceOptions.map((opt, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Checkbox size="small" defaultChecked={!!opt.checked} />
          <Typography
            variant="body2"
            sx={opt.highlight ? { color: opt.highlight } : {}}
          >
            {opt.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SettingsTab;
