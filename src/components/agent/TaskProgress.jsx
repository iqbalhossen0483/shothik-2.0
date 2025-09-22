import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function TaskProgress({ taskProgress }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const taskDone = taskProgress.filter((item) => item?.status === "success");

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 16,
        right: 16,
        left: 16,
      }}
    >
      <Paper
        sx={{
          px: 2,
          py: expanded ? 2 : 0.5,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        {expanded ? (
          <>
            <Typography variant='subtitle1' fontWeight='bold' mb={1}>
              Task progress
            </Typography>
            <List dense>
              {taskProgress.map((task, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon
                      color={
                        task?.status === "success" ? "success" : "disabled"
                      }
                      fontSize='small'
                    />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                    primary={task?.name}
                  />
                </ListItem>
              ))}
            </List>

            <IconButton
              sx={{
                position: "absolute",
                right: 10,
                bottom: 10,
              }}
              onClick={toggleExpanded}
              color='inherit'
              size='small'
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </>
        ) : (
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              variant='body2'
            >
              {taskProgress[taskProgress.length - 1]?.name}
            </Typography>
            <Stack direction='row' alignItems='center' gap={1}>
              <Typography variant='caption'>
                {taskDone.length}/{taskProgress.length}
              </Typography>
              <IconButton onClick={toggleExpanded} color='inherit' size='small'>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Stack>
          </Stack>
        )}
      </Paper>
    </Box>
  );
}
