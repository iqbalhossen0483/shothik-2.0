import {
  Box,
  Card,
  CircularProgress,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import CustomDonutChart from "./CustomDonutChart";

const HumanizeScrores = ({ loadingAi, scores, showIndex, isMobile }) => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      sx={{ gap: { lg: 10, md: 3, sm: 1 } }}
    >
      <Card
        sx={{
          flex: 1,
          maxWidth: isMobile ? 300 : 500,
          display: "flex",
          flexDirection: "column",
          padding: 2,
        }}
      >
        <Typography fontWeight={700}>Shothik AI Detector</Typography>

        {loadingAi ? (
          <CircularProgress size={16} color="inherit" />
        ) : scores ? (
          // <Box>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Box style={{ width: "100%" }}>
              <Slider
                aria-label="AI Score"
                key={showIndex}
                value={scores[showIndex]}
                sx={{ height: 5 }}
                valueLabelDisplay="on"
              />
            </Box>
            <Box style={{ marginTop: -18 }}>
              <span className="progress-text">
                {scores[showIndex]}% Human Written
              </span>
            </Box>
          </div>
        ) : (
          <span className="progress-text">No score</span>
        )}
      </Card>

      {!loadingAi && scores[showIndex] && (
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomDonutChart
            size={100}
            data={[
              { value: scores[showIndex], color: "#2E7D32" },
              { value: 100 - scores[showIndex], color: "#E8F5E9" },
            ]}
            initialSize={isMobile ? 100 : 115}
          />
        </div>
      )}
    </Stack>
  );
};

export default HumanizeScrores;
