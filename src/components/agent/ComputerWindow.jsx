import Editor from "@monaco-editor/react";
import {
  Psychology,
  SmartToy,
  TravelExplore,
  UnfoldLess,
} from "@mui/icons-material";
import {
  Box,
  Card,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "motion/react";
import RenderMarkdown from "./RenderMarkdown";
import TaskProgress from "./TaskProgress";

const ComputerWindow = ({ computerLogs, closeWindow, taskProgress }) => {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  function handleEditorWillMount(monaco) {
    monaco.editor.defineTheme("mint-light-theme", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "", foreground: "2d2d2d" }, // default text
        { token: "comment", foreground: "6a737d", fontStyle: "italic" },
        { token: "keyword", foreground: "d73a49" },
        { token: "string", foreground: "032f62" },
        { token: "number", foreground: "005cc5" },
        { token: "variable", foreground: "e36209" },
        { token: "type", foreground: "22863a" },
      ],
      colors: {
        "editor.background": "#cbe9dd",
        "editor.foreground": "#2d2d2d",
        "editorLineNumber.foreground": "#5c5c5c",
        "editorCursor.foreground": "#333333",
        "editor.selectionBackground": "#a4c8ba88",
        "editor.inactiveSelectionBackground": "#a4c8ba44",
      },
    });
  }

  return (
    <Card
      component={motion.div}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ x: 50, opacity: 0, transition: { duration: 0.5 } }}
      sx={{
        height: "100%",
        padding: 2,
        position: "relative",
      }}
    >
      <Stack
        mb={0.5}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Stack direction='row' alignItems='center' gap={1}>
          <IconButton
            disableRipple
            sx={{
              backgroundColor: "rgba(0, 167, 111, 0.1)",
              color: "#00A76F",
              borderRadius: 1,
              padding: 0.5,
            }}
          >
            <SmartToy />
          </IconButton>
          <Typography fontSize={18} fontWeight={700}>
            Shothik AI Computer
          </Typography>
        </Stack>
        <IconButton onClick={closeWindow}>
          <UnfoldLess
            sx={{ color: "text.secondary", transform: "rotate(45deg)" }}
          />
        </IconButton>
      </Stack>

      <Stack
        sx={{
          backgroundColor: dark ? "rgba(4, 64, 57, 0.5)" : "#cbe9dd",
          paddingX: 1.5,
          paddingY: 0.5,
          borderRadius: 2,
          cursor: "pointer",
          width: "fit-content",
          color: dark ? "primary.lighter" : "primary.darker",
        }}
        direction='row'
        alignItems='center'
        gap={0.5}
        mb={1}
      >
        <Typography fontSize={14}>Shothik AI Agent is using</Typography>
        {computerLogs.agent_name === "browser_agent" ? (
          <TravelExplore sx={{ fontSize: 16, color: "primary.main" }} />
        ) : computerLogs.agent_name === "planner_agent" ? (
          <Psychology sx={{ fontSize: 18, color: "primary.main" }} />
        ) : (
          <SmartToy sx={{ color: "#00A76F", fontSize: 16 }} />
        )}
      </Stack>

      <Box
        sx={{
          borderRadius: 1,
          height: "500px",
          overflow: "hidden",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            padding: 0.5,
            textAlign: "center",
            backgroundColor: "#cbe9dd",
            color: "primary.darker",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          {computerLogs?.message?.includes("##") &&
          computerLogs?.type === "text"
            ? "Shothik AI Agent Task is completed"
            : computerLogs.message}
        </Typography>
        {computerLogs?.type === "tool" ? (
          <Editor
            height='93.5%'
            defaultLanguage='markdown'
            value={computerLogs?.data?.result}
            beforeMount={handleEditorWillMount}
            theme={dark ? "vs-dark" : "mint-light-theme"}
            options={{
              readOnly: true,
              scrollBeyondLastLine: false,
              minimap: { enabled: false },
              lineNumbers: "off",
              wordWrap: "on",
            }}
          />
        ) : computerLogs?.type === "result" ||
          computerLogs?.message?.includes("##") ? (
          <Box
            sx={{
              paddingX: 2,
              height: "93.5%",
              overflow: "auto",
              backgroundColor: "rgba(73, 149, 87, 0.1)",
            }}
          >
            <RenderMarkdown
              content={
                computerLogs?.message?.includes("##")
                  ? computerLogs?.message
                  : computerLogs?.data
              }
            />
          </Box>
        ) : null}
      </Box>

      {/* bottom progress */}
      {taskProgress.length ? (
        <TaskProgress taskProgress={taskProgress} />
      ) : null}
    </Card>
  );
};

export default ComputerWindow;
