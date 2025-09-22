import { Book } from "@mui/icons-material";

const {
  Card,
  CardContent,
  IconButton,
  Box,
  Typography,
  Skeleton,
} = require("@mui/material");

export const AcademicLoadingState = () => {
  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
        height: "100px",
        my: 2,
        overflow: "hidden",
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CardContent sx={{ p: 2, width: "100%" }}>
        <Box display='flex' alignItems='center' gap={2}>
          {/* Icon Container */}
          <IconButton
            color='text.secondary'
            aria-label='User'
            sx={{ bgcolor: "rgba(73, 149, 87, 0.04)", borderRadius: "5px" }}
          >
            <Book sx={{ color: "text.secondary", fontSize: 24 }} />
          </IconButton>

          {/* Loading Text & Animation */}
          <Box>
            <Typography variant='body1' fontWeight={500} color='text.secondary'>
              Searching academic papers...
            </Typography>

            {/* Pulse Loading Effect */}
            <Box display='flex' gap={1} mt={0.5}>
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  width={`${Math.random() * 100 + 50}px`}
                  height={20}
                  sx={{
                    animation: `pulse 1.5s infinite ease-in-out`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
