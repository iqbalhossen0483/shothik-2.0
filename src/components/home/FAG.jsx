"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid2,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { faqData } from "../../_mock/fag";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("general");
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setExpanded(false);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ marginY: 6 }}>
      {/* Title */}
      <Typography
        variant='h2'
        align='center'
        sx={{
          mb: 4,
          fontSize: { xs: "1.8rem", sm: "2rem", md: "3rem", lg: "3rem" },
          fontWeight: "bold",
          background: "linear-gradient(135deg, #00A76F 30%, #0B4D42 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          overflowWrap: "break-word",
        }}
      >
        Frequently Asked Questions
      </Typography>

      {/* Tabs */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          overflowX: "auto",
          mb: 3,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant='scrollable'
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            "& .MuiTab-root": {
              fontWeight: "medium",
              textTransform: "capitalize",
              color: theme.palette.mode === "light" ? "text.primary" : "white",
              "&.Mui-selected": {
                color: "#00A76F",
                fontWeight: "bold",
              },
              "&:hover": {
                color: "#00A76F",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#00A76F",
            },
          }}
        >
          {Object.keys(faqData).map((tab) => (
            <Tab
              key={tab}
              label={tab.charAt(0).toUpperCase() + tab.slice(1)}
              value={tab}
            />
          ))}
        </Tabs>
      </Box>

      {/* FAQ Grid */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid2
          container
          spacing={3}
          justifyContent='center'
          alignItems='center'
          sx={{
            maxWidth: "900px",
          }}
        >
          {faqData[activeTab].map((faq, index) => (
            <Grid2 size={{ xs: 12 }} key={index}>
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleAccordionChange(`panel${index}`)}
                sx={{
                  borderRadius: "10px",
                  borderColor:
                    expanded === `panel${index}` &&
                    theme.palette.mode === "dark"
                      ? "#C6F7D0"
                      : "#C6F7D0",
                  boxShadow: expanded
                    ? "0 8px 20px rgba(0, 0, 0, 0.1)"
                    : "0 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    py: "18px",
                    [theme.breakpoints.down("sm")]: { padding: "16px" },
                    "& .MuiAccordionSummary-content": {
                      margin: 0,
                      [theme.breakpoints.down("sm")]: { fontSize: "1.2rem" },
                    },
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      color:
                        expanded === `panel${index}` ? "#0A7A6A" : "#9E9E9E",
                      transition: "color 0.3s ease",
                    },
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                  }}
                >
                  <Typography
                    sx={(theme) => ({
                      borderRadius: "14px",
                      fontWeight: 500,
                      fontSize: {
                        xs: theme.typography.body1.fontSize,
                        sm: theme.typography.h6.fontSize,
                        md: theme.typography.h5.fontSize,
                        lg: theme.typography.h4.fontSize,
                      },
                    })}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    [theme.breakpoints.down("sm")]: { padding: "15px" },
                    borderBottomLeftRadius: "6px",
                    borderBottomRightRadius: "6px",
                  }}
                >
                  <Typography
                    component='div'
                    sx={{
                      color: "text.seconday",
                      fontSize: "1.2rem",
                      [theme.breakpoints.down("sm")]: { fontSize: "1rem" },
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
}
