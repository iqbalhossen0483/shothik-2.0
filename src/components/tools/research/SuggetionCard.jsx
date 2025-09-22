import {
  AttachMoney,
  Code,
  Favorite,
  Flag,
  Group,
  Language,
  Psychology,
  SportsFootball,
  SportsSoccer,
  TrendingUp,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const SuggestionCards = ({ trendingQueries, handleExampleClick }) => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll function
  const autoScroll = () => {
    if (scrollRef.current && !isPaused) {
      scrollRef.current.scrollBy({
        left: 1, // Adjust this value to control scroll speed
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const scrollInterval = setInterval(autoScroll, 20);

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  const getIconForCategory = (category) => {
    const iconMap = {
      trending: <TrendingUp size='small' />,
      community: <Group size='small' />,
      science: <Psychology size='small' />,
      tech: <Code size='small' />,
      travel: <Language size='small' />,
      politics: <Flag size='small' />,
      health: <Favorite size='small' />,
      sports: <SportsSoccer size='small' />,
      finance: <AttachMoney size='small' />,
      football: <SportsFootball size='small' />,
    };

    return iconMap[category] || <TrendingUp size='small' />;
  };

  if (!trendingQueries?.length) {
    return (
      <Box sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            paddingBottom: 2,
            paddingX: 2,
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <Box
              key={index}
              sx={{
                flexShrink: 0,
                height: 48,
                width: 120,
                borderRadius: 2,
                background: "background.paper",
                borderwidth: "1px",
                borderStyle: "solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                padding: 2,
              }}
            >
              {/* Skeleton placeholder for image */}
              <Skeleton
                variant='rectangular'
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: 1,
                  backgroundColor: "rgba(200, 200, 200, 0.5)",
                  animation: "pulse 1.5s infinite",
                }}
              />

              {/* Text skeleton */}
              <Box sx={{ flex: 1, spaceY: 1 }}>
                <Skeleton
                  sx={{
                    height: 10,
                    borderRadius: 1,
                    backgroundColor: "divider",
                    animation: `pulse 1.5s infinite ease-in-out`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                />
                <Skeleton
                  sx={{
                    height: 8,
                    width: "50%",
                    backgroundColor: "divider",
                    borderRadius: 1,
                    animation: `pulse 1.5s infinite ease-in-out`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "auto",
          paddingBottom: 2,
          paddingX: 2,
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
        }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
          // Add a small delay before resuming animation on mobile
          setTimeout(() => setIsPaused(false), 1000);
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {Array(20)
          .fill(trendingQueries)
          .flat()
          .map((query, index) => (
            <Card
              key={index}
              onClick={() => handleExampleClick(query)}
              sx={{
                backgroundColor: "background.paper",
                transition: "all 0.2s ease-out",
                boxShadow: 0,
                borderRadius: 1,
                "&:hover": {
                  boxShadow: 2,
                },
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 1,
                minWidth: 150,
                cursor: "pointer",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "start",
                  flexDirection: "row",
                  padding: 0,
                  "&:last-child": { paddingBottom: 0 },
                }}
              >
                <IconButton
                  color='text.secondary'
                  aria-label='User'
                  sx={{
                    bgcolor: "rgba(73, 149, 87, 0.04)",
                    borderRadius: "5px",
                    p: 0.1,
                    fontSize: 16,
                  }}
                >
                  {getIconForCategory(query.category)}
                </IconButton>
                <Box
                  sx={{
                    flexGrow: 1,
                    textAlign: "left",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{
                      fontWeight: "medium",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {query.text}
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{
                      color: "text.secondary",
                      textTransform: "capitalize",
                    }}
                  >
                    {query.category}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  );
};
