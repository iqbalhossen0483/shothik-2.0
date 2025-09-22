import { keyframes } from "@emotion/react";
import {
  AutoMode,
  CheckCircle,
  ExpandMore,
  Psychology,
  SmartToy,
  TravelExplore,
} from "@mui/icons-material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

export default function AgentMessage({ message, handleSideView }) {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  const data = message?.content;
  if (!data && !data.length) return null;
  const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

  return (
    <Box>
      <Stack direction='row' gap={2} alignItems='center'>
        <SmartToyIcon sx={{ color: "#00A76F", fontSize: 30 }} />
        <Typography fontWeight={600}>Shothik AI Agent</Typography>
      </Stack>
      {data[0]?.message?.includes("##") ? (
        <RenderResponse
          sx={{ marginTop: 1 }}
          item={data[0]}
          dark={dark}
          handleSideView={handleSideView}
        />
      ) : (
        <Typography fontSize={16} mt={1}>
          {data[0]?.message}
        </Typography>
      )}

      {data.slice(1, data.length).map((item, index, arr) => (
        <Stack sx={{ position: "relative" }} key={index}>
          <Box sx={{ position: "absolute", left: 0, top: 10, zIndex: 20 }}>
            <CheckCircle fontSize='small' sx={{ color: "primary.main" }} />
          </Box>
          <Box
            sx={{
              borderLeft: "1px dashed",
              borderColor: "primary.main",
              position: "absolute",
              top: 12,
              bottom: arr.length - 1 === index ? 12 : -12,
              left: 8,
              zIndex: 1,
            }}
          />

          <Accordion
            defaultExpanded
            disableGutters
            sx={{
              border: "none",
              boxShadow: "none",
              margin: 0,
              marginLeft: 3,
              "&::before": {
                display: "none",
              },
              "&.Mui-expanded": {
                backgroundColor: "transparent",
                boxShadow: "none",
                minHeight: "auto",
                marginLeft: 3,
              },
              "& .Mui-expanded": {
                backgroundColor: "transparent",
                boxShadow: "none",
                minHeight: "auto",
                margin: 0,
              },
              "& .MuiAccordionSummary-root": {
                padding: 0,
              },
              "& .MuiAccordionDetails-root": {
                boxShadow: "none",
                border: "none",
                paddingY: 0,
                paddingX: 1,
              },
              "& .MuiAccordionSummary-content": {
                marginY: 0,
              },
              "& .MuiButtonBase-root": {
                minHeight: "auto",
                marginY: 1,
              },
            }}
          >
            <AccordionSummary
              expandIcon={item?.message?.includes("##") ? null : <ExpandMore />}
              aria-controls={`logs-${index}`}
              id={`logs-${index}`}
            >
              {item?.message?.includes("##") ? (
                <RenderResponse
                  item={item}
                  dark={dark}
                  handleSideView={handleSideView}
                />
              ) : (
                <Typography>{item.message}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails
              sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}
            >
              {item.data && item.data.length
                ? item.data.map((subMessage, index) => {
                    if (subMessage.type === "text") {
                      return (
                        <Typography
                          sx={{
                            color: dark ? "primary.lighter" : "primary.darker",
                            fontSize: 14,
                          }}
                          key={index}
                        >
                          {subMessage.message}
                        </Typography>
                      );
                    } else if (subMessage.type === "tool") {
                      return (
                        <Box
                          onClick={() => handleSideView(subMessage)}
                          sx={{
                            backgroundColor: dark
                              ? "rgba(4, 64, 57, 0.5)"
                              : "#cbe9dd",
                            paddingX: 1.5,
                            paddingY: 0.5,
                            borderRadius: 2,
                            cursor: "pointer",
                            width: "fit-content",
                            maxWidth: "100%",
                            color: dark ? "primary.lighter" : "primary.darker",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                          key={index}
                        >
                          <Typography fontWeight={600}>Tool</Typography>
                          <Typography>||</Typography>
                          {subMessage.agent_name === "browser_agent" ? (
                            <TravelExplore
                              sx={{ fontSize: 16, color: "primary.main" }}
                            />
                          ) : subMessage.agent_name === "planner_agent" ? (
                            <Psychology
                              sx={{ fontSize: 18, color: "primary.main" }}
                            />
                          ) : (
                            <SmartToyIcon
                              sx={{ color: "#00A76F", fontSize: 16 }}
                            />
                          )}

                          <Typography
                            noWrap
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              flexGrow: 1,
                            }}
                            fontSize={14}
                          >
                            {subMessage.message}
                          </Typography>
                          {subMessage?.status === "progress" ? (
                            <AutoMode
                              sx={{
                                animation: `${spin} 2s linear infinite`,
                                fontSize: 16,
                                color: "primary.main",
                              }}
                            />
                          ) : (
                            <Button sx={{ padding: 0 }}>View</Button>
                          )}
                        </Box>
                      );
                    } else return null;
                  })
                : null}
            </AccordionDetails>
          </Accordion>
        </Stack>
      ))}
    </Box>
  );
}

function RenderResponse({ item, dark, handleSideView, sx }) {
  if (!item) return null;
  return (
    <Box
      onClick={() =>
        handleSideView({
          type: "result",
          data: item.message,
          status: item.status,
          agent_name: item.agent_name,
          message: "Shothik AI Agent Task is completed",
        })
      }
      sx={{
        backgroundColor: dark ? "rgba(4, 64, 57, 0.5)" : "#cbe9dd",
        paddingX: 1.5,
        paddingY: 0.5,
        borderRadius: 2,
        cursor: "pointer",
        width: "fit-content",
        color: dark ? "primary.lighter" : "primary.darker",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        ...sx,
      }}
    >
      <SmartToy sx={{ color: "#00A76F", fontSize: 16 }} />
      <Typography fontSize={14} fontWeight={600}>
        Shothik AI Agent Task is completed
      </Typography>
      <Typography>||</Typography>
      <Typography fontWeight={600} fontSize={14}>
        View
      </Typography>
    </Box>
  );
}
