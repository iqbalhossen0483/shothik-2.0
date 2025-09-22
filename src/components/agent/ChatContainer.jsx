import { Stack } from "@mui/material";
import AgentMessage from "./AgentMessage";
import UserMessage from "./UserMessage";

export default function ChatContainer({
  chatHistory,
  handleSideView,
  ref,
  onScroll,
  messageBottomRef,
}) {
  return (
    <Stack
      ref={ref}
      onScroll={onScroll}
      spacing={2}
      sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}
    >
      {chatHistory.map((message, index) =>
        message.role === "user" ? (
          <UserMessage key={index} message={message.content} />
        ) : (
          <AgentMessage
            handleSideView={handleSideView}
            key={index}
            message={message}
          />
        )
      )}

      <div ref={messageBottomRef} />
    </Stack>
  );
}
