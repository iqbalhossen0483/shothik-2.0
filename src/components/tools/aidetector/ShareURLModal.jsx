import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import CopyButon from "../../blog/details/CopyButon";

const ShareURLModal = ({ open, handleClose, title, hashtags, content }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}?share_id=${content._id}`;
  let outputContend = "";

  content.sentences.forEach((item) => {
    outputContend += ` ${item.sentence}`;
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        gap={2}
        sx={{ paddingY: 3, paddingX: 2, position: "relative" }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <Close />
        </IconButton>

        <Typography variant='h5'>Share</Typography>
        <TextField
          value={shareUrl}
          fullWidth
          slotProps={{
            input: {
              endAdornment: <CopyButon text={shareUrl} />,
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              paddingY: 0.5,
              paddingRight: 0,
              "& fieldset": {
                borderColor: "divider",
              },
              "&:hover fieldset": {
                borderColor: "divider",
              },
              "&.Mui-focused fieldset": {
                borderColor: "divider",
              },
            },
            "& .MuiInputBase-input": {
              paddingY: 0,
            },
          }}
        />
        <Stack flexDirection='row' gap={1} alignItems='center'>
          <Box>
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              hashtag={`#${hashtags[0]}`}
              content={outputContend}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </Box>
          <Box>
            <TwitterShareButton
              url={shareUrl}
              title={title}
              hashtags={hashtags}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </Box>
          <Box>
            <LinkedinShareButton
              url={shareUrl}
              title={title}
              summary={outputContend}
              source={process.env.NEXT_PUBLIC_FRONTEND_URL}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ShareURLModal;
