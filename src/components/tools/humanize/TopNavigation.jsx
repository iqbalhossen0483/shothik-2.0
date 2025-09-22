import { Lock, Diamond } from "@mui/icons-material";
import {
  Slider,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Popover,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";

import { useRouter } from "next/navigation";

const models = ["Panda", "Raven"];

const TopNavigation = ({
  model,
  setModel,
  setShalowAlert,
  userPackage,
  currentLength,
  setCurrentLength,
  LENGTH,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const router = useRouter()

  const handleTabClick = (event, tab) => {
    const isLocked = !/pro_plan|unlimited/.test(userPackage) && tab === "Raven";

    if (isLocked) {
      setShalowAlert(true);
      setAnchorEl(event.currentTarget);
    } else {
      setShalowAlert(false);
      setAnchorEl(null);
    }

    setModel(tab);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "upgrade-popover" : undefined;

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      sx={{
        borderBottom: "1px solid",
        borderBottomColor: "divider",
        paddingX: 2,
      }}
    >
      <Tabs
        value={model}
        textColor='primary'
        sx={{
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        {models.map((tab) => {
          const isLocked =
            !/pro_plan|unlimited/.test(userPackage) && tab === "Raven";
          return (
            <Tab
              key={tab}
              value={tab}
              color='#00A76F'
              sx={{
                color: "text.secondary",
                "&.Mui-selected": {
                  color: "primary.main",
                },
              }}
              label={
                <Tooltip title='Model' arrow placement='top'>
                  {tab}
                </Tooltip>
              }
              icon={
                isLocked ? <Lock sx={{ width: 12, height: 12 }} /> : undefined
              }
              onClick={(e) => handleTabClick(e, tab)}
            />
          );
        })}
      </Tabs>

      <Slider
        style={{ width: "150px" }}
        aria-label='Length'
        getAriaValueText={(value) => LENGTH[value]}
        value={Object.keys(LENGTH).find(
          (key) => LENGTH[key] === currentLength
        )}
        marks
        step={20}
        min={20}
        max={80}
        valueLabelDisplay='on'
        valueLabelFormat={currentLength}
        onChange={(_, value) => setCurrentLength(LENGTH[value])}
        sx={{
          mt: { xs: 2, sm: 0 },
          "& .MuiSlider-valueLabel": {
            fontSize: "12px",
            padding: "2px 6px",
            transform: "translateY(-21px)",
            "&:before": {
              width: "6px",
              height: "6px",
              bottom: "-0px",
            },
          },
        }}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        disableRestoreFocus
        PaperProps={{
          sx: {
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            width: 300,
            textAlign: "center",
          },
        }}
      >
        
        <Typography variant='body2' sx={{ mt: 1, mb: 2, color: 'text.secondary' }}>
          Unlock advanced features and enhance your humanize experience.
        </Typography>
        <Button
          variant='contained'
          color='success'
          size='small'
          startIcon={<Diamond />}
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          onClick={e => {
            router.push("/pricing?redirect=/humanize-gpt")
          }}
        >
          Upgrade To Premium
        </Button>
      </Popover>
    </Stack>
  );
};

export default TopNavigation;
