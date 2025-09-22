import { Description, Task } from "@mui/icons-material";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import useResponsive from "../../hooks/useResponsive";
import DotFlashing from "../../resource/DotFlashing";

const SessionHistoryModal = ({
  open,
  setOpen,
  data,
  isLoading,
  setSessionHistoryId,
}) => {
  const isMobile = useResponsive("down", "sm");
  const router = useRouter();

  const histories = data?.data;
  return (
    <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          width: isMobile ? "300px" : "400px",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <Stack
          justifyContent='center'
          alignItems='center'
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            padding: 1.5,
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "Background",
          }}
        >
          <Typography fontSize={18} fontWeight={600}>
            Session History
          </Typography>
        </Stack>

        <Stack paddingX={1.5}>
          {isLoading ? (
            <Box>
              <DotFlashing />
            </Box>
          ) : histories && histories.length ? (
            histories.map((history) => (
              <Stack
                flexDirection='row'
                alignItems='center'
                onClick={() => {
                  setSessionHistoryId(history._id);
                  setOpen(false);
                }}
                gap={1}
                key={history._id}
                sx={{
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  paddingY: 1.5,
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "divider",
                  },
                  width: "100%",
                }}
              >
                <Task sx={{ color: "primary.main" }} fontSize='small' />
                <Typography
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {history.messages[0].content.message}
                </Typography>
              </Stack>
            ))
          ) : (
            <Stack
              flexDirection='row'
              alignItems='center'
              justifyContent='center'
              gap={1}
              sx={{ height: "calc(100vh - 100px)" }}
            >
              <Description sx={{ color: "text.secondary" }} />
              <Typography sx={{ color: "text.secondary" }}>
                No history found
              </Typography>
            </Stack>
          )}
        </Stack>
      </Box>
    </Drawer>
  );
};

export default SessionHistoryModal;
