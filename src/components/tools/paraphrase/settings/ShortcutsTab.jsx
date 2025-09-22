
// ShortcutsTab.jsx
import React from 'react';
import { Box, Typography, Divider } from "@mui/material";

const ShortcutsTab = () => {
  const rows = [
    { action: "Copy sentence", shortcut: "Alt + C" },
    { action: "Paraphrase all text", shortcut: "Ctrl + Enter" },
    { action: "Copy all paraphrased text", shortcut: "Ctrl + C" },
  ];

  return (
    <Box sx={{ px: 2, py: 1 }}>
      {/* Title */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Keyboard Shortcuts
      </Typography>

      {/* Header Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography variant="subtitle2" color="text.secondary">
          Action
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Keyboard shortcut
        </Typography>
      </Box>

      {/* Data Rows */}
      {rows.map((row, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
            borderBottom: i < rows.length - 1 ? 1 : 0,
            borderColor: "divider",
          }}
        >
          <Typography variant="body2">
            {row.action}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "Monospace" }}>
            {row.shortcut}
          </Typography>
        </Box>
      ))}

      {/* Section Divider */}
      <Divider sx={{ my: 3 }} />

      {/* Canvas Divider Section */}
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Canvas divider
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
        }}
      >
        <Typography variant="body2">
          Auto center
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: "Monospace" }}>
          Ctrl + |
        </Typography>
      </Box>
    </Box>
  );
};

export default ShortcutsTab;

