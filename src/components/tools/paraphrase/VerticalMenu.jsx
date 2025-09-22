
"use client"
import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { CheckCircleOutline,  Gavel, SentimentSatisfiedAlt, Compare, History, Settings, Keyboard } from "@mui/icons-material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PlagiarismSidebar from './PlagiarismSidebar';
import SettingsSidebar from './settings/SettingsSidebar';

const ICON_SIZE = "2rem";

const VerticalMenu = ({selectedMode, setSelectedMode, outputText, setOutputText, freezeWords, text, selectedLang}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Box
        sx={{
          // position: "absolute",
          maxHeight: "90vh",
          marginTop: '10px',
          width: 'fit-content',
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}
      >{showSidebar  == 'plagiarism' || showSidebar == 'history' || showSidebar == 'tone' || showSidebar == 'compare' ? 
          <PlagiarismSidebar
            active={showSidebar}
            setActive={setShowSidebar}
            open={showSidebar}
            onClose={() => setShowSidebar(false)}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            outputText={outputText}
            setOutputText={setOutputText}
            text={text}
            freezeWords={freezeWords}
            selectedLang={selectedLang}
          />
          : showSidebar == 'settings' || showSidebar == 'feedback' || showSidebar == 'shortcuts' ? <SettingsSidebar tab={showSidebar} setTab={setShowSidebar} open={showSidebar == 'settings' || showSidebar == 'feedback' || showSidebar == 'shortcuts'} onClose={()=>{
            setShowSidebar(false);
          }}/> : <>

        {/* Center icons */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
          {/* Check Plagiarism */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Tooltip title="Check Plagiarism">
              <IconButton size="large" onClick={() => setShowSidebar('plagiarism')}>
                <Gavel sx={{ fontSize: ICON_SIZE }} />
              </IconButton>
            </Tooltip>
            <Typography variant="caption" align="center" component="div">
              Check<br />Plagiarism
            </Typography>
          </Box>

          {/* History */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Tooltip title="History">
              <IconButton size="large" onClick={() => setShowSidebar('history')}>
                <History sx={{ fontSize: ICON_SIZE }} />
              </IconButton>
            </Tooltip>
            <Typography variant="caption">History</Typography>
          </Box>
                {/* Compare */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Tooltip title="Compare">
              <IconButton size="large" onClick={() => setShowSidebar('compare')}>
                <Compare sx={{ fontSize: ICON_SIZE }} />
              </IconButton>
            </Tooltip>
            <Typography variant="caption">Compare</Typography>
          </Box>
       {/* Tone */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Tooltip title="Compare">
              <IconButton size="large" onClick={() => setShowSidebar('tone')}>
                <SentimentSatisfiedAlt sx={{ fontSize: ICON_SIZE }} />
              </IconButton>
            </Tooltip>
            <Typography variant="caption">Tone</Typography>
          </Box>
        </Box>
                   {/* Bottom spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Bottom icons */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginTop: "75px",
                alignItems: "center",
                color: "black",            // ① set a base color for captions
              }}
            >
              {/* Settings */}
              <Box id="paraphrase_settings" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Tooltip title="Settings">
                  <IconButton id="paraphrase_settings_button" size="large" sx={{ color: "black" }} onClick={() => setShowSidebar('settings')}>  {/* ② icons inherit or override to black */}
                    <Settings sx={{ fontSize: ICON_SIZE }} />
                  </IconButton>
                </Tooltip>
                <Typography variant="caption" color="inherit">  {/* ③ inherit the black from parent */}
                  Settings
                </Typography>
              </Box>

              {/* Feedback */}
              <Box id="paraphrase_feedback"  sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Tooltip title="Feedback">
                  <IconButton id="paraphrase_feedback_button" size="large" sx={{ color: "black" }} onClick={() => setShowSidebar('feedback')}>
                    <FeedbackIcon sx={{ fontSize: ICON_SIZE }} />
                  </IconButton>
                </Tooltip>
                <Typography variant="caption" color="inherit">
                  Feedback
                </Typography>
              </Box>

              {/* Hotkeys */}
              <Box id="paraphrase_shortcuts" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Tooltip title="Hotkeys">
                  <IconButton id="paraphrase_shortcuts_button" size="large" sx={{ color: "black" }} onClick={() => setShowSidebar('shortcuts')}>
                    <Keyboard sx={{ fontSize: ICON_SIZE }} />
                  </IconButton>
                </Tooltip>
                <Typography variant="caption" color="inherit">
                  Hotkeys
                </Typography>
              </Box>
            </Box>
        </>}
      </Box>

      {/* Sidebar toggled internally */}
    </>
  );
};

export default VerticalMenu;
