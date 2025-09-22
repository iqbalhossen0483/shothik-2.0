import { Collections, PictureAsPdf } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import * as motion from "motion/react-client";

export default function UserMessage({ message }) {
  return (
    <Box
      component={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <Paper
        variant='outlined'
        sx={{
          p: 1.5,
          borderRadius: "15px 15px 0 15px",
          maxWidth: "70%",
        }}
      >
        <Typography variant='body1'>{message.message}</Typography>
      </Paper>
      <Stack
        mt={1}
        justifyContent='flex-end'
        flexDirection='row'
        flexWrap='wrap'
        alignItems='center'
        gap={1}
      >
        {message.files
          ? Array.from(message.files).map((file, index) => (
              <Paper
                sx={{
                  paddingX: 1.5,
                  paddingY: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
                key={index}
              >
                {file.name.includes(".pdf") ? (
                  <PictureAsPdf sx={{ color: "error.main" }} />
                ) : (
                  <Collections sx={{ color: "primary.main" }} />
                )}
                <Typography>{file.name}</Typography>
              </Paper>
            ))
          : null}
      </Stack>
    </Box>
  );
}
