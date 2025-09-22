import {
  AssistantPhotoRounded,
  InsertDriveFileRounded,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tooltip,
} from "@mui/material";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

export default function RephraseSentenceNav({
  open,
  anchorEl,
  handleClose,
  handleCopy,
  sendReprt,
  rephraseSentence,
}) {
  const ref = useOutsideClick(() => handleClose());

  return (
    <Popper
      ref={ref}
      placement='top-start'
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
    >
      <Paper variant='outlined'>
        <Stack
          direction='row'
          alignItems='center'
          sx={{ p: "5px" }}
          spacing={1}
        >
          <Tooltip title='See More Sentence' placement='top' arrow>
            <Button
              onClick={rephraseSentence}
              variant='outlined'
              sx={{ mb: 0 }}
              spacing={1}
              size='small'
            >
              Rephrase
            </Button>
          </Tooltip>

          <Tooltip title='Copy Sentence' placement='top' arrow>
            <IconButton
              onClick={handleCopy}
              aria-label='Copy Sentence'
              size='small'
            >
              <InsertDriveFileRounded />
            </IconButton>
          </Tooltip>
          <Tooltip title='Report Sentence' placement='top' arrow>
            <IconButton
              aria-label='Report Sentence'
              size='small'
              onClick={sendReprt}
            >
              <AssistantPhotoRounded />
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>
    </Popper>
  );
}
