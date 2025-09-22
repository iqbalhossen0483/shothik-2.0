import { ExpandMore, Language } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

export default function WebLoadingState() {
  return (
    <Box sx={{ width: "100%" }}>
      <Accordion
        defaultExpanded
        sx={{
          backgroundColor: "Background",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "divider",
          borderRadius: "10px",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: "text.secondary" }} />}
          aria-controls='panel-search-content'
          id='panel-search-header'
          sx={{
            p: 2,
            backgroundColor: "background.paper",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ p: 1, borderRadius: "8px" }}>
            <Language sx={{ fontSize: 20, color: "text.secondary" }} />
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: "medium", textAlign: "left" }}
            >
              Running Web Search
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <CircularProgress
                size={12}
                sx={{
                  color: "text.secondary",
                  animation: "bounce 0.3s infinite alternate",
                }}
              />
              <CircularProgress
                size={12}
                sx={{
                  color: "text.secondary",
                  animation: "bounce 0.3s infinite alternate 0.15s",
                }}
              />
              <CircularProgress
                size={12}
                sx={{
                  color: "text.secondary",
                  animation: "bounce 0.3s infinite alternate 0.3s",
                }}
              />
            </Box>
          </Box>
        </AccordionSummary>
        <Divider />
        <AccordionDetails
          sx={{ p: 2, bgcolor: "background.paper", borderRadius: "5px" }}
        >
          <Stack
            direction='row'
            spacing={2}
            sx={{
              overflowX: "auto",
              mt: 2,
              pb: 1,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                sx={{
                  width: 300,
                  flexShrink: 0,
                  bgcolor: "background.paper",
                  boxShadow: 0,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "divider",
                  borderRadius: "10px",
                  transition: "all 0.2s",
                  "&:hover": { boxShadow: 3 },
                }}
              >
                <CardContent>
                  <Stack gap={1}>
                    <Stack direction='row' spacing={1}>
                      <Skeleton
                        variant='circular'
                        width={40}
                        height={40}
                        animation='wave'
                        sx={{ animationDuration: "0.8s" }}
                      />
                      <Stack>
                        <Skeleton
                          variant='text'
                          width='auto'
                          height={10}
                          animation='wave'
                          sx={{ animationDuration: "0.8s" }}
                        />
                        <Skeleton
                          variant='text'
                          width='auto'
                          height={10}
                          animation='wave'
                          sx={{ animationDuration: "0.8s" }}
                        />
                      </Stack>
                    </Stack>
                    <Skeleton
                      variant='rounded'
                      width='100%'
                      height={20}
                      animation='wave'
                      sx={{ animationDuration: "0.8s" }}
                    />
                    <Skeleton
                      variant='rounded'
                      width='100%'
                      height={20}
                      animation='wave'
                      sx={{ animationDuration: "0.8s" }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
