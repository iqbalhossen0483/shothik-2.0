import { ArrowDropDown } from '@mui/icons-material';
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';

const ModelSwitcher = ({
  selectedModel,
  setSelectedModel,
  showExperimentalModels,
  attachments,
  models,
}) => {
  const selectedModelData = models.find((model) => model.value === selectedModel);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Check if there are attachments in current or previous messages
  const hasAttachments = attachments.length > 0;

  // Filter models based on attachments and experimental status
  const filteredModels = hasAttachments
    ? models.filter((model) => model.vision)
    : models.filter((model) => (showExperimentalModels ? true : !model.experimental));

  // Group models by category
  const groupedModels = filteredModels.reduce((acc, model) => {
    const category = model.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(model);
    return acc;
  }, {});

  return (
    <>
      <IconButton
        color="text.secondary"
        aria-label="Model"
        sx={{ bgcolor: 'rgba(73, 149, 87, 0.04)', borderRadius: '5px' }}
        onClick={handleOpen}
      >
        {selectedModelData && (
          <Avatar
            src={selectedModelData.icon}
            alt={selectedModelData.label}
            sx={{ width: 24, height: 24 }}
          />
        )}
        <ArrowDropDown fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: 220,
            p: 1,
            borderRadius: '8px',
            boxShadow: 3,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          },
        }}
      >
        {Object.entries(groupedModels).map(([category, categoryModels], categoryIndex) => (
          <div key={category}>
            {categoryIndex > 0 && <Divider sx={{ my: 1 }} />}
            <MenuItem disabled sx={{ fontSize: '11px', fontWeight: 'medium', opacity: 0.6 }}>
              {category}
            </MenuItem>
            {categoryModels.map((model) => (
              <MenuItem
                key={model.value}
                onClick={() => {
                  setSelectedModel(model.value.trim());
                  handleClose();
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  borderRadius: '6px',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 'unset', p: '5px', borderRadius: '6px', bgcolor: 'divider' }}
                >
                  <Avatar src={model.icon} alt={model.label} sx={{ width: 24, height: 24 }} />
                </ListItemIcon>
                <ListItemText
                  primary={model.label}
                  secondary={model.description}
                  primaryTypographyProps={{ fontSize: '14px', fontWeight: 'medium' }}
                  secondaryTypographyProps={{ fontSize: '10px', opacity: 0.8 }}
                />
              </MenuItem>
            ))}
          </div>
        ))}
      </Menu>
    </>
  );
};

export default ModelSwitcher;
