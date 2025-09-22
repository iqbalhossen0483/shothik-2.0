
// SettingsSidebar.jsx
import React from 'react';
import { Box, Button, IconButton } from "@mui/material";
import {
  Close,
  Settings as SettingsIcon,
  ChatBubbleOutline as FeedbackIcon,
  Keyboard as KeyboardIcon,
} from "@mui/icons-material";

import SettingsTab from "./SettingsTab";
import FeedbackTab from "./FeedbackTab";
import ShortcutsTab from "./ShortcutsTab";

const tabs = [
  { id: "settings", icon: <SettingsIcon /> },
  { id: "feedback", icon: <FeedbackIcon /> },
  { id: "shortcuts", icon: <KeyboardIcon /> },
];

const SettingsSidebar = ({ open, onClose, tab = 'settings', setTab }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        width: 300,
        height: "100%",
        borderLeft: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {/* Top Nav */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          pt: 2,
          pb: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexGrow: 1,
          }}
        >
          {tabs.map((t) => (
            <Box
              key={t.id}
              onClick={() => setTab(t.id)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                flex: 1,
              }}
            >
              <IconButton
                size="large"
                disableRipple
                sx={{
                  color: tab === t.id ? "success.main" : "text.secondary",
                }}
              >
                {React.cloneElement(t.icon, { fontSize: "inherit" })}
              </IconButton>
              {tab === t.id && (
                <Box
                  sx={{
                    width: 24,
                    borderBottom: 2,
                    borderColor: "success.main",
                    mt: 0.5,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>

        {/* Close Button */}
        <IconButton id="settings_sidebar_x_button" size="small" onClick={onClose}>
          <Close fontSize="small" />
        </IconButton>
      </Box>

      {/* Tab Content */}
      <Box sx={{ px: 2 }}>
        {tab === "settings" && <SettingsTab />}
        {tab === "feedback" && <FeedbackTab />}
        {tab === "shortcuts" && <ShortcutsTab />}
      </Box>
    </Box>
  );
};

export default SettingsSidebar;

