import { FormatAlignLeft } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import React from "react";

const Suggestion = ({ handleSuggestedQuestionClick, suggestedQuestions }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Box display='flex' alignItems='center' gap={2} my={2}>
        <FormatAlignLeft fontSize='small' color='text.secondary' />
        <Typography variant='h6'>Suggested questions</Typography>
      </Box>

      <Box display='flex' flexDirection='column' gap={1}>
        {suggestedQuestions?.map((question, index) => (
          <Typography
            key={index}
            sx={{
              borderRadius: "1.5rem",
              fontWeight: "medium",
              padding: "0.5rem 1rem",
              backgroundColor: "background.paper",
              color: "text.secondary",
              cursor: "pointer",
              width: "fit-content",
            }}
            onClick={() => handleSuggestedQuestionClick(question)}
          >
            {question}
          </Typography>
        ))}
      </Box>
    </motion.div>
  );
};

export default Suggestion;
