import { Close as CloseIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Paper,
} from "@mui/material";
import * as motion from "motion/react-client";

const AttachmentPreview = ({ attachment, isUploading, onRemove }) => {
  return (
    <Paper
      component={motion.div}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "background.paper",
        borderRadius: 2,
        p: 1,
        pr: 2,
        gap: 1,
        boxShadow: 1,
        position: "relative",
        width: "auto",
      }}
    >
      {isUploading ? (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          width={40}
          height={40}
        >
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Avatar
          src={attachment.url}
          alt={`Image preview`}
          sx={{ width: 40, height: 40, borderRadius: 2 }}
          variant='rounded'
        />
      )}

      <IconButton
        component={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        sx={{
          position: "absolute",
          top: -8,
          right: -8,
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: 1,
          "&:hover": {
            backgroundColor: "grey.100",
          },
        }}
        size='small'
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </Paper>
  );
};

export default AttachmentPreview;
