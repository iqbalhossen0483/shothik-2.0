"use client";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { projectDetails } from "../../../_mock/b2b/projectDetails";
import { VideoPlayer } from "../VideoPlayer";

const detectListStyle = (items) => {
  if (!items || items.length === 0) return "number";
  const firstItem = items[0];
  if (/^\s*\d+\.\s*/.test(firstItem)) return "number";
  if (/^\s*•\s*/.test(firstItem)) return "dot";
  return "number";
};

export const ProjectSection = ({ slug }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const data = projectDetails[slug];

  const getPrefix = (index, style) => {
    if (style === "number") {
      return (
        <span
          style={{ color: isDarkMode ? "white" : "#585858", fontWeight: "700" }}
        >
          {index + 1}.
        </span>
      );
    } else if (style === "dot") {
      return (
        <span
          style={{ color: isDarkMode ? "white" : "#585858", fontWeight: "700" }}
        >
          •
        </span>
      );
    }
    return null;
  };

  return (
    <Box sx={{ px: { xs: "1rem", sm: "1.25rem", md: "1.5rem" } }}>
      {data &&
        data.map((section, index) => {
          const computedListStyle = detectListStyle(section.listItems);
          return (
            <Stack
              key={index}
              direction='column'
              gap={2}
              sx={{ textAlign: "justify" }}
            >
              {section.paragraphs?.map((paragraph, pIndex) => (
                <Typography
                  sx={{ fontSize: 20, fontWeight: 500 }}
                  key={pIndex}
                  variant='body1'
                >
                  {paragraph}
                </Typography>
              ))}
              {section.listItems && (
                <List sx={{ fontSize: 24, fontWeight: 500 }}>
                  {section.listItems.map((item, lIndex) => {
                    // Remove any pre-existing numbering or bullet prefixes
                    const cleanedItem = item.replace(
                      /^(?:\s*(?:\d+\.|•))\s*/,
                      ""
                    );

                    // Split text at "-" and make first part bold if it exists
                    const parts = cleanedItem.split(" – ");
                    const formattedText =
                      parts.length > 1 ? (
                        <>
                          <Typography component='span'>{parts[0]}</Typography> –{" "}
                          {parts[1]}
                        </>
                      ) : (
                        cleanedItem
                      );

                    return (
                      <ListItem
                        sx={{ fontSize: 24, fontWeight: 500 }}
                        key={lIndex}
                      >
                        <ListItemText
                          primary={
                            <>
                              {getPrefix(lIndex, computedListStyle)}{" "}
                              {formattedText}
                            </>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              )}
              {section.image && (
                <VideoPlayer
                  videoSrc={section.image.videoSrc}
                  thumbnailSrc={section.image.src}
                  isShowInfo={false}
                  isShowPlayIcon={section.image.isShowPlayIcon}
                  sx={{
                    minWidth: "100%",
                    height: "25.1875rem",
                    marginTop: { xs: "0.75rem", sm: "1rem" },
                    borderRadius: "4px",
                    transition: "all 0.3s ease",
                    marginBottom: 3,
                    boxShadow: isDarkMode
                      ? "0 4px 8px rgba(0,0,0,0.2)"
                      : "none",
                    "&:hover": {
                      transform: "scale(1.01)",
                    },
                  }}
                />
              )}
            </Stack>
          );
        })}
    </Box>
  );
};
