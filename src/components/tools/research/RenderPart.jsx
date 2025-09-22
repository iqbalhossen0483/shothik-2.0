import { AutoAwesome } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import CopyButon from "../../blog/details/CopyButon";
import { AcademicLoadingState } from "./AcademicLoadingState";
import AcademicSearch from "./AcademicSearch";
import MarkdownRenderer from "./MarkdownRenderer";
import WebLoadingState from "./WebLoading";
import WebSearch from "./WebSearch";

const RenderPart = ({ data, group }) => {
  switch (data.type) {
    case "text":
      return (
        <Box>
          <Stack
            flexDirection='row'
            justifyContent='space-between'
            mt={2}
            mb={1}
          >
            <Stack flexDirection='row' alignItems='center' gap={1}>
              <AutoAwesome sx={{ fontSize: 28, color: "primary.main" }} />
              <Typography variant='body1' fontWeight={600} color='text.primary'>
                Answer
              </Typography>
            </Stack>
            <Box>
              <CopyButon text={data.content} />
            </Box>
          </Stack>
          <MarkdownRenderer content={data.content} />
        </Box>
      );
    case "tool-invocation": {
      if (group === "web") {
        return data.content && typeof data.content !== "string" ? (
          <WebSearch data={data.content} />
        ) : (
          <WebLoadingState />
        );
      } else if (group === "academic") {
        return data.content && typeof data.content !== "string" ? (
          <AcademicSearch data={data.content} />
        ) : (
          <AcademicLoadingState />
        );
      }
    }
    case "reasoning": {
      return null;
    }
    default:
      return null;
  }
};

export default RenderPart;
