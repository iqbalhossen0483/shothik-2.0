"use client";

import { Box, Paper, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { toolsData } from "../../../_mock/tutorials";
import TutorialSection, {
  IconWrapper,
} from "../../../components/tutorial/TutorialSection";
import useYoutubeSubscriber from "../../../hooks/useYoutubeSubcriber";

// Styled components
const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTab-root": {
    textTransform: "none",
    minWidth: "auto",
  },
}));

// Custom hook for tab management
const useTabManagement = (defaultTab) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return {
    currentTab,
    handleTabChange,
  };
};

// Tab navigation component
const TutorialTabs = ({ currentTab, onTabChange, toolsData }) => {
  return (
    <StyledTabs
      value={currentTab}
      onChange={onTabChange}
      variant='scrollable'
      scrollButtons='auto'
      aria-label='tutorial navigation tabs'
      sx={{
        "@media (min-width: 600px)": {
          paddingLeft: 3,
        },
        pt: 3,
      }}
    >
      {Object.entries(toolsData).map(([key, tool]) => (
        <Tab
          key={key}
          value={key}
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconWrapper sx={{ color: tool.iconColor }}>
                {tool.icon}
              </IconWrapper>
              {tool.name}
            </Box>
          }
          aria-label={`${tool.name} tutorial tab`}
        />
      ))}
    </StyledTabs>
  );
};

const Tutorials = () => {
  const { currentTab, handleTabChange } = useTabManagement("paraphrase");
  const { subscriberCount, loading, handleSubscribe, formatSubscriberCount } =
    useYoutubeSubscriber();

  const handleVideoClick = (videoId) => {
    console.log("Video clicked:", videoId);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", pb: 10 }}>
      <Paper
        sx={{
          bgcolor: "transparent",
          backgroundImage: "none",
        }}
      >
        <TutorialTabs
          currentTab={currentTab}
          onTabChange={handleTabChange}
          toolsData={toolsData}
        />

        <TutorialSection
          tool={toolsData[currentTab]}
          onVideoClick={handleVideoClick}
          subscriberCount={subscriberCount}
          loading={loading}
          handleSubscribe={handleSubscribe}
          formatSubscriberCount={formatSubscriberCount}
        />
      </Paper>
    </Box>
  );
};

export default Tutorials;
