"use client";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

export const VideoPlayer = ({
  videoSrc = "/assets/background/b2b/computer.mp4",
  thumbnailSrc = "/assets/background/b2b/computer.png",
  name = "name",
  title = "title",
  isShowInfo = true,
  isShowPlayIcon = true,
  sx,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "34.95288rem",
        maxHeight: "34.19956rem",
        overflow: "hidden",
        borderRadius: "0.14319rem",
        cursor: isShowPlayIcon ? "pointer" : "default",
        ...sx,
      }}
    >
      {isPlaying ? (
        <video
          src={videoSrc}
          controls
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            aspectRatio: "1/1",
          }}
        />
      ) : (
        <>
          <img
            src={thumbnailSrc}
            alt='Video Thumbnail'
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              aspectRatio: "1/1",
            }}
          />
          {isShowPlayIcon && (
            <img
              onClick={() => setIsPlaying(true)}
              src='/b2b/play.svg'
              alt='Play'
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
              }}
            />
          )}
        </>
      )}
      {!isPlaying && isShowInfo && (
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            left: 10,
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontFamily: "Public Sans",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "165%",
              textTransform: "uppercase",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              color: "#FFF",
              fontFamily: "Public Sans",
              fontSize: "0.5625rem",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "0.859rem",
              letterSpacing: "0.01688rem",
            }}
          >
            {title}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
