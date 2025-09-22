import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export const IconWrapper = ({ children, sx }) => {
  return (
    <Box
      sx={{
        borderRadius: "50%",
        width: 30,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& svg": {
          color: "#fff",
          fontSize: 24,
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

const TutorialSection = ({
  tool,
  onVideoClick,
  subscriberCount,
  loading,
  handleSubscribe,
  formatSubscriberCount,
}) => {
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleVideoClick = (videoUrl) => {
    // Extract video ID from URL if it's a full URL
    let videoId = videoUrl;
    if (videoUrl.includes("youtube.com/embed/")) {
      videoId = videoUrl.split("youtube.com/embed/")[1];
    }
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    setCurrentVideo(embedUrl);
    if (onVideoClick) onVideoClick(videoId);
  };

  // Set initial video
  useEffect(() => {
    if (tool?.videoId) {
      handleVideoClick(tool.videoId);
    }
  }, [tool]);

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", pb: 10 }}>
      <Paper
        elevation={1}
        sx={{
          bgcolor: "transparent",
          backgroundImage: "none",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant='h4' gutterBottom>
            {tool.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            {/* Main content */}
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  // backgroundColor: '#f5f5f5',
                  marginBottom: 2,
                  width: { xs: "100%", sm: "100%", md: "auto" },
                }}
              >
                {currentVideo ? (
                  <iframe
                    src={currentVideo}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: 8,
                    }}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                ) : (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Skeleton
                      variant='rectangular'
                      width='100%'
                      height='100%'
                      animation='wave'
                      sx={{
                        bgcolor: "rgba(0, 0, 0, 0.1)",
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                )}
              </Box>

              <Typography variant='h6' gutterBottom>
                {tool.title}
              </Typography>

              <Typography variant='body2' color='text.secondary' gutterBottom>
                {tool.description}
              </Typography>

              <Divider sx={{ mt: 3 }} />

              <Box
                sx={{ display: "flex", alignItems: "center", mt: 2, gap: 2 }}
              >
                {loading ? (
                  <>
                    <Skeleton variant='circular' width={40} height={40} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant='text' width={100} height={28} />
                      <Skeleton variant='text' width={140} height={20} />
                    </Box>
                    <Skeleton
                      variant='rectangular'
                      width={100}
                      height={36}
                      sx={{ borderRadius: 1 }}
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src='/green_tick.svg'
                      width={40}
                      height={40}
                      alt='Shothik AI'
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant='subtitle1'>Shothik AI</Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {formatSubscriberCount(subscriberCount)} subscribers
                      </Typography>
                    </Box>
                    <Button
                      onClick={handleSubscribe}
                      variant='contained'
                      color='error'
                      sx={{
                        bgcolor: "#FF0000",
                        "&:hover": {
                          bgcolor: "#CC0000",
                        },
                        fontWeight: "bold",
                        textTransform: "none",
                        px: 3,
                      }}
                    >
                      Subscribe
                    </Button>
                  </>
                )}
              </Box>
            </Box>

            {/* Sidebar */}
            <Card sx={{ width: 400 }}>
              <CardContent>
                <Box
                  onClick={() => handleVideoClick(tool.videoId)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                    cursor: "pointer",
                  }}
                >
                  <IconWrapper
                    sx={{ width: 52, height: 52, color: tool.iconColor }}
                  >
                    {tool.icon}
                  </IconWrapper>

                  <Typography variant='h6'>
                    {tool.title} <br />
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      component='span'
                    >
                      Shothik AI
                    </Typography>
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant='subtitle2' gutterBottom>
                  More related to {tool.name}
                </Typography>
                <List>
                  {tool.tutorials.map((tutorial, index) => (
                    <ListItem
                      key={index}
                      onClick={() => handleVideoClick(tutorial.videoLink)}
                    >
                      <ListItemIcon>
                        <IconWrapper
                          sx={{ color: tool.iconColor, width: 24, height: 24 }}
                        >
                          {tool.icon}
                        </IconWrapper>
                      </ListItemIcon>
                      <ListItemText primary={tutorial.name} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default TutorialSection;
