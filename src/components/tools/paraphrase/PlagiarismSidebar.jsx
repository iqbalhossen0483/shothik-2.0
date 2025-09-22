
// PlagiarismSidebar.jsx
import React from 'react';
import { Box, IconButton } from "@mui/material";
import {
  Close,
  Gavel,
  History,
  EmojiEmotions,
  Compare,
  SentimentSatisfiedAlt,
} from "@mui/icons-material";

import PlagiarismTab from "./actions/PlagiarismTab";
import HistoryTab        from "./actions/HistoryTab";   // to come
import ToneTab           from "./actions/ToneTab";      // to come
import CompareTab        from "./actions/CompareTab";   // to come

const tabs = [
  { id: "plagiarism", icon: <Gavel />,       component: PlagiarismTab },
  { id: "history",    icon: <History />,     component: HistoryTab },
  { id: "tone",       icon: <SentimentSatisfiedAlt />, component: ToneTab },
  { id: "compare",    icon: <Compare />, component: CompareTab },
];

const PlagiarismSidebar = ({ open, onClose, active, setActive, score, results, selectedMode, setSelectedMode, outputText, setOutputText, text, freezeWords, selectedLang }) => {
  if (!open) return null;

  const ActiveTab = tabs.find((t) => t.id === active)?.component;

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
      {/* top nav */}
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
        <Box sx={{ display: "flex", flex: 1, justifyContent: "space-around" }}>
          {tabs.map((t) => (
            <Box
              key={t.id}
              onClick={() => setActive(t.id)}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <IconButton
                size="large"
                disableRipple
                sx={{
                  color:
                    active === t.id ? "primary.main" : "text.secondary",
                }}
              >
                {React.cloneElement(t.icon, { fontSize: "inherit" })}
              </IconButton>
              {active === t.id && (
                <Box
                  sx={{
                    width: 24,
                    borderBottom: 2,
                    borderColor: "primary.main",
                    mt: 0.5,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>

        <IconButton size="small" onClick={onClose}>
          <Close fontSize="small" />
        </IconButton>
      </Box>

      {/* active tab content */}
      {ActiveTab && (
        <ActiveTab
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          score={score}
          results={results}
          outputText={outputText}
          setOutputText={setOutputText}
          text={text}
          freezeWords={freezeWords}
          selectedLang={selectedLang}
        />
      )}
    </Box>
  );
};

export default PlagiarismSidebar;

