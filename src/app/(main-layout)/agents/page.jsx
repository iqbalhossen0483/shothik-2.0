"use client";
import {
  AutoMode,
  HistoryEdu,
  LibraryAdd,
  Replay,
  WorkHistory,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Grid2,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Typography,
} from "@mui/material";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatContainer from "../../../components/agent/ChatContainer";
import ComputerWindow from "../../../components/agent/ComputerWindow";
import InputArea, { loadingSpin } from "../../../components/agent/InputArea";
import SessionHistoryModal from "../../../components/agent/SessionHistoryModal";
import useResponsive from "../../../hooks/useResponsive";
import {
  useGetAgentSessionByIdQuery,
  useGetAgentSessionQuery,
} from "../../../redux/api/tools/toolsApi";

export default function AgentPage() {
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [openSessionModal, setOpenSessionModal] = useState(false);
  const [computerLogs, setComputerLogs] = useState(null);
  const [hasQuestion, setHasQuestion] = useState(false);
  const [taskProgress, setTaskProgress] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useResponsive("down", "md");
  const messagesContainerRef = useRef(null);
  const autoScrollTimeout = useRef(null);
  const [error, setError] = useState("");
  const messageBottomRef = useRef(null);
  const [sessionHistoryId, setSessionHistoryId] = useState(null);
  const {
    data: sessionHitoryData,
    isLoading,
    refetch,
  } = useGetAgentSessionQuery(
    {
      user_id: user?._id,
    },
    { skip: !user?._id }
  );
  const { data: sessionHistory } = useGetAgentSessionByIdQuery(
    sessionHistoryId,
    { skip: !sessionHistoryId }
  );

  useEffect(() => {
    if (!sessionHistory) return;
    setChatHistory(sessionHistory.data.messages);
  }, [sessionHistory]);

  async function requestToAgent(user_query) {
    try {
      setLoading(true);
      setError("");
      setHasQuestion(false);

      if (!user?._id) {
        throw new Error("User ID is not available");
      }

      const formData = new FormData();
      formData.append("query", user_query.message);
      formData.append("user_id", user._id);
      if (sessionId) {
        formData.append("session_id", sessionId);
      }
      if (user_query.files) {
        for (let i = 0; i < user_query.files.length; i++) {
          formData.append("files", user_query.files[i]);
        }
      }

      const url = process.env.NEXT_PUBLIC_AGENT_API + "/agent";
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      while (!done) {
        const { done: readerDone, value } = await reader.read();
        done = readerDone;
        if (value) {
          const data = decoder.decode(value, { stream: !done });
          const fixed = data.replace(/\\'/g, "'");
          if (fixed.includes("Error:")) {
            throw fixed;
          }

          try {
            fixed.split("json_data:").forEach((item) => {
              if (item.trim() === "") return;

              console.log("newMessage", item);

              const newMessage = JSON.parse(item);

              //check inital response;
              if (newMessage.type === "initial_response") {
                setSessionId(newMessage.session_id);
                return;
              }

              if (newMessage?.type === "tool") {
                // add task progress;
                setTaskProgress((prev) => {
                  const lastContent = prev[prev.length - 1];
                  if (lastContent?.status === "progress") {
                    lastContent.status = "success";
                  } else {
                    prev.push({
                      name: newMessage?.message?.slice(0, 200),
                      status: "progress",
                    });
                  }
                  return [...prev];
                });
              }

              // add assistant message;
              setChatHistory((history) => {
                // Create a copy to avoid direct state mutation
                const updatedHistory = [...history];

                // Check if history is empty or last message is not from assistant
                if (
                  updatedHistory[updatedHistory.length - 1].role !== "assistant"
                ) {
                  // Add new assistant message with the new data
                  updatedHistory.push({
                    role: "assistant",
                    content: [newMessage],
                  });
                } else {
                  // Last message is from assistant
                  const lastMessage = updatedHistory[updatedHistory.length - 1];
                  const lastContent =
                    lastMessage.content[lastMessage.content.length - 1];

                  // Check if agent_name matches and both are tool type
                  if (lastContent.agent_name === newMessage.agent_name) {
                    if (
                      lastContent.type === "tool" &&
                      newMessage.type === "tool"
                    ) {
                      // Update status and data of existing content
                      // lastContent.status = newMessage.status;
                      // lastContent.data = newMessage.data;
                    } else {
                      //  Add as new content inside the last content data
                      if (lastContent.data) {
                        const lastContentData =
                          lastContent.data[lastContent.data.length - 1];
                        if (
                          lastContentData.status === "progress" &&
                          lastContentData.agent_name === newMessage.agent_name
                        ) {
                          // Update existing in-progress message of the same type
                          lastContentData.status = newMessage.status;
                          lastContentData.data = newMessage.data;
                        } else {
                          lastContent.data.push(newMessage);
                        }
                      } else {
                        lastContent.data = [newMessage];
                      }
                    }
                  } else {
                    // Add as new content
                    lastMessage.content.push(newMessage);
                  }
                }

                return updatedHistory;
              });
            });
          } catch (error) {
            console.error("Error parsing JSON: ", fixed, "error: ", error);
          }
        }
      }

      refetch();
    } catch (error) {
      console.log("Error in requestToAgent:", error);
      setError(
        error.message || "An error occurred while processing your request."
      );
    } finally {
      setLoading(false);
    }
  }

  const addChatHistory = async (content, role) => {
    setChatHistory((prev) => {
      return [
        ...prev,
        {
          role,
          content: content,
        },
      ];
    });
    if (role === "user") {
      requestToAgent(content);
    }
  };

  const handleSideView = (log) => {
    setExpanded(true);
    setComputerLogs(log);
  };

  useEffect(() => {
    if (chatHistory.length < 2) return;
    const lastMessage = chatHistory[chatHistory.length - 1];

    if (lastMessage?.role !== "assistant") return;

    const lastContent = lastMessage.content;
    if (!lastContent) return;
    if (lastContent.length === 0) return;

    const lastData = lastContent[lastContent.length - 1];
    if (!lastData) return;

    if (lastData?.message?.includes("##")) {
      handleSideView({
        type: "result",
        message: "Shothik AI Agent Task is completed",
        data: lastData.message,
      });
    } else {
      const lastMessagesData = lastData?.data;
      if (!lastMessagesData || !lastMessagesData?.length) return;
      const lastMessage = lastMessagesData[lastMessagesData.length - 1];
      if (lastMessage?.type !== "text" && lastMessage?.status === "success") {
        handleSideView(lastMessage);
      }
    }

    if (messageBottomRef.current && autoScrollEnabled) {
      messageBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 50;

    if (!isAtBottom) {
      // User scrolled up → disable auto scroll
      setAutoScrollEnabled(false);

      // Clear previous timer
      if (autoScrollTimeout.current) {
        clearTimeout(autoScrollTimeout.current);
      }

      // Enable auto scroll after 10 seconds
      autoScrollTimeout.current = setTimeout(() => {
        setAutoScrollEnabled(true);
      }, 10000);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    setError("");
    setSessionId(null);
    setTaskProgress([]);
    setLoading(false);
    setComputerLogs(null);
    setExpanded(false);
    setOpenSessionModal(false);
  };

  return (
    <Box sx={{ marginBottom: 2, position: "relative" }}>
      <Container maxWidth={expanded ? "xl" : "md"} sx={{ height: "100%" }}>
        <Grid2 container spacing={2} sx={{ position: "relative" }}>
          {/* Right Side or loggin side */}
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: chatHistory.length ? "space-between" : "center",
              alignItems: chatHistory.length ? "normal" : "center",
              height: "calc(100vh - 90px)",
              position: "relative",
            }}
            size={{ xs: 12, md: expanded ? 6 : 12 }}
          >
            {/* Chat messages area */}
            {chatHistory.length ? (
              <ChatContainer
                ref={messagesContainerRef}
                messageBottomRef={messageBottomRef}
                onScroll={handleScroll}
                handleSideView={handleSideView}
                chatHistory={chatHistory}
              />
            ) : null}

            {error && (
              <Stack
                direction='row'
                gap={0.5}
                alignItems='center'
                mb={1}
                justifyContent='center'
              >
                <Typography sx={{ color: "error.main" }}>{error}</Typography>
                <Replay
                  onClick={() =>
                    addChatHistory({ message: "proceed", files: null }, "user")
                  }
                  sx={{ color: "error.main", cursor: "pointer", fontSize: 18 }}
                />
              </Stack>
            )}

            {/* Input area */}
            {!chatHistory.length || hasQuestion ? (
              <InputArea
                addChatHistory={addChatHistory}
                loading={loading}
                error={error}
                showTitle={!chatHistory.length}
              />
            ) : null}
            {loading && (
              <AutoMode
                sx={{
                  animation: `${loadingSpin} 1s linear infinite`,
                  color: "primary.main",
                  position: "absolute",
                  bottom: 0,
                  right: 5,
                }}
              />
            )}
          </Grid2>

          {/* Window side for showing image or .md file */}
          <AnimatePresence initial={false}>
            {expanded ? (
              <Grid2
                size={{ xs: 12, md: 6 }}
                sx={{
                  height: "calc(100vh - 90px)",
                  ...(isMobile && {
                    position: "absolute",
                    top: 0,
                    bottom: 5,
                    right: 5,
                    left: 0,
                    zIndex: 50,
                  }),
                }}
              >
                <ComputerWindow
                  computerLogs={computerLogs}
                  closeWindow={() => setExpanded(false)}
                  taskProgress={taskProgress}
                />
              </Grid2>
            ) : null}
          </AnimatePresence>
        </Grid2>
      </Container>

      {/* session modal icon  */}
      <SpeedDial
        ariaLabel='Session Navigation'
        sx={{ position: "absolute", bottom: 5, right: 5 }}
        icon={<HistoryEdu />}
      >
        <SpeedDialAction
          disableInteractive={isLoading}
          onClick={() => {
            setOpenSessionModal((prev) => !prev);
            setSessionHistoryId(null);
          }}
          icon={<WorkHistory />}
          slotProps={{ tooltip: { title: "History" } }}
          sx={{ boxShadow: "none" }}
        />
        <SpeedDialAction
          onClick={clearChat}
          disableInteractive={loading}
          icon={<LibraryAdd />}
          slotProps={{ tooltip: { title: "New" } }}
          sx={{ boxShadow: "none" }}
        />
      </SpeedDial>

      {/* session history modal  */}
      <SessionHistoryModal
        open={openSessionModal}
        setOpen={setOpenSessionModal}
        data={sessionHitoryData}
        setSessionHistoryId={setSessionHistoryId}
        isLoading={isLoading}
      />
    </Box>
  );
}
