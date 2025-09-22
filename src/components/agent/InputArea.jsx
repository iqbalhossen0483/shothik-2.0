import { keyframes } from "@emotion/react";
import {
  ArrowBackIos,
  AttachFile,
  AutoMode,
  Send,
  SmartToy,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { ai_agent_list } from "../../config/config/agents";
import useResponsive from "../../hooks/useResponsive";

export const loadingSpin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

export default function InputArea({ addChatHistory, loading, showTitle }) {
  const [files, setFiles] = useState(null);
  const [value, setValue] = useState("");
  const filesRef = useRef(null);
  const isMobile = useResponsive("down", "sm");
  const [selectedAgent, setSelectedAgent] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!value) return;

    addChatHistory({ message: value, files }, "user");
    setValue("");
    setFiles(null);
  };

  const handleFileInputClick = () => {
    if (!filesRef.current) return;
    filesRef.current.click();
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    setFiles(files);
  };

  return (
    <Stack alignItems='center' sx={{ width: "100%" }}>
      {showTitle && !selectedAgent && (
        <Box mb={1}>
          <Typography
            fontWeight={600}
            fontSize={22}
            mb={1}
            textAlign='center'
            sx={{ color: "primary.main" }}
          >
            Shothik AI multi Agent solution
          </Typography>
          <Stack flexDirection='row' alignItems='center' gap={0.5}>
            {ai_agent_list.map((agent, index) => (
              <Stack
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  paddingX: 2,
                  paddingY: 0.5,
                  backgroundColor: "#cbe9dd",
                  borderRadius: 2,
                  color: "primary.darker",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedAgent(agent)}
                key={index}
              >
                <Typography fontSize={14}>{agent.title}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}
      {selectedAgent && (
        <Stack
          flexDirection='row'
          alignItems='center'
          justifyContent='flex-start'
          sx={{
            width: isMobile ? "100%" : "80%",
            border: "1px solid",
            borderColor: "primary.main",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            borderBottom: "none",
            backgroundColor: "#cbe9dd",
            color: "primary.darker",
          }}
        >
          <IconButton onClick={() => setSelectedAgent(null)}>
            <ArrowBackIos fontSize='small' />
          </IconButton>
          <Typography>{selectedAgent.title}</Typography>
        </Stack>
      )}
      <Box
        component='form'
        onSubmit={handleAdd}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: showTitle ? "column" : "row",
          justifyContent: "space-between",
          padding: 2,
          border: "1px solid",
          borderColor: "primary.main",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          borderTopLeftRadius: selectedAgent ? 0 : "8px",
          borderTopRightRadius: selectedAgent ? 0 : "8px",
          width: isMobile ? "100%" : "80%",
        }}
      >
        <Stack
          flexDirection='row'
          alignItems='center'
          sx={{
            width: isMobile && !showTitle ? undefined : "100%",
            justifyContent: isMobile && !showTitle ? undefined : "flex-start",
          }}
        >
          <SmartToy sx={{ color: "#00A76F", mr: 1 }} />
          <TextField
            fullWidth
            variant='standard'
            placeholder='Give a task to Shothik AI Agent'
            slotProps={{
              input: { disableUnderline: true },
            }}
            sx={{ minWidth: isMobile ? 200 : 300 }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <input
            type='file'
            ref={filesRef}
            hidden
            accept='.pdf,.jpg,.jpeg,.png'
            multiple
            onChange={handleInputChange}
          />
        </Stack>

        <Stack
          flexDirection='row'
          alignItems='center'
          sx={{
            width: isMobile && !showTitle ? undefined : "100%",
            justifyContent: isMobile && !showTitle ? undefined : "flex-end",
          }}
        >
          <Tooltip
            title={
              filesRef?.current?.files?.length
                ? `${filesRef.current.files.length} Files selected`
                : "Attach files"
            }
          >
            <IconButton
              sx={{
                position: "relative",
                "&:hover .filesCount": { display: "none" },
              }}
              onClick={handleFileInputClick}
              type='button'
            >
              {files ? (
                <Typography
                  sx={{ position: "absolute", top: -5, right: 5 }}
                  className='filesCount'
                  fontSize={14}
                >
                  {Array.from(files).length}
                </Typography>
              ) : null}
              <AttachFile fontSize='small' />
            </IconButton>
          </Tooltip>

          <IconButton disabled={loading} type='submit' color='primary'>
            {loading ? (
              <AutoMode
                sx={{
                  animation: `${loadingSpin} 1s linear infinite`,
                  color: "primary.main",
                }}
              />
            ) : (
              <Send />
            )}
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
}
