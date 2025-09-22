"use client";
import { Box, Stack, Tooltip } from "@mui/material";
import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import CopyButon from "./CopyButon";

const ShareIcons = ({ shareUrl, title, hashtags, content }) => {
  return (
    <Stack flexDirection='row' gap={1} alignItems='center'>
      <Box>
        <FacebookShareButton
          url={shareUrl}
          quote={title}
          hashtag={`#${hashtags[0]}`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </Box>
      <Box>
        <TwitterShareButton url={shareUrl} title={title} hashtags={hashtags}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </Box>
      <Box>
        <LinkedinShareButton
          url={shareUrl}
          title={title}
          summary={content || ""}
          source={process.env.NEXT_PUBLIC_FRONTEND_URL}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </Box>
      <Box>
        <Tooltip title='Copy URL' arrow placement='top'>
          <CopyButon text={shareUrl} />
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default ShareIcons;
