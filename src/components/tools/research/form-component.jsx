import styled from "@emotion/styled";
import { ArrowUpward, Attachment, CloudUpload } from "@mui/icons-material";
import {
  Box,
  Card,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  tooltipClasses,
  Typography,
  useTheme,
} from "@mui/material";
import * as motion from "motion/react-client";
import { useCallback, useRef, useState } from "react";
import useResponsive from "../../../hooks/useResponsive";
import useSnackbar from "../../../hooks/useSnackbar";
import { useUploadImageMutation } from "../../../redux/api/auth/authApi";
import AttachmentPreview from "./AttachmentPreview";
import ModelSwitcher from "./ModelSwitcher";
import { searchGroups } from "./utils";

const models = [
  {
    value: "shothik-brain-1.0",
    label: "Shothik Brain",
    icon: "/moscot.png",
    description: "shothik brain 1.0",
    vision: true,
    experimental: false,
    category: "Stable",
  },
  {
    value: "deepseek-r1-distill-llama-70b",
    label: "Deepseek R1 Distill Llama 70b",
    icon: "/deepseek-r1.png",
    description: "deepseek-r1-distill-llama-70b",
    vision: true,
    experimental: false,
    category: "Stable",
  },
  {
    value: "llama-3.3-70b-instruct",
    label: "Llama 3.3 70b Instruct",
    icon: "/meta_llma.png",
    description: "llama 3.3 70b instruct",
    vision: true,
    experimental: false,
    category: "Stable",
  },
  {
    value: "qwen2.5-coder-32b-instruct",
    label: "Qwen2.5 Coder 32b Instruct",
    icon: "/gwen.png",
    description: "Qwen2.5 Coder 32b Instruct",
    vision: true,
    experimental: false,
    category: "Stable",
  },
  {
    value: "shothik-brain-1.5",
    label: "Shothik Brain 1.5",
    icon: "/moscot.png",
    description: "shothik brain 1.5",
    vision: true,
    experimental: true,
    category: "Experimental",
  },
];

const MAX_IMAGES = 4;

const ToolbarButton = ({ group, isSelected, onClick }) => {
  const Icon = group.icon;
  const isMobile = useResponsive("sm");

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: `1px solid ${theme.palette.divider}`,
    },
  }));

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  // Use regular button for mobile
  if (isMobile) {
    return (
      <IconButton onClick={handleClick}>
        <Icon size={20} />
      </IconButton>
    );
  }

  return (
    <HtmlTooltip
      title={
        <Box>
          <Typography variant='subtitle2'>{group.name}</Typography>
          <Typography sx={{ color: "text.secondary" }} variant='caption'>
            {group.description}
          </Typography>
        </Box>
      }
    >
      <IconButton
        sx={{
          backgroundColor: isSelected ? "action.hover" : "transparent",
        }}
        onClick={handleClick}
      >
        <Icon size={20} />
      </IconButton>
    </HtmlTooltip>
  );
};

const SelectionContent = ({ ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout={false}
      initial={false}
      animate={{
        width: isExpanded ? "auto" : "30px",
        gap: isExpanded ? "15px" : 0,
        paddingRight: isExpanded ? "0.5rem" : 0,
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {searchGroups.map((group) => {
        const showItem = isExpanded || props.selectedGroup === group.id;
        return (
          <motion.div
            key={group.id}
            layout={false}
            animate={{
              width: showItem ? "28px" : 0,
              opacity: showItem ? 1 : 0,
            }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
            }}
            style={{ margin: 0 }}
          >
            <ToolbarButton
              group={group}
              isSelected={props.selectedGroup === group.id}
              onClick={() => props.onGroupSelect(group)}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const FormComponent = ({
  input,
  setInput,
  attachments,
  setAttachments,
  hasSubmitted,
  setHasSubmitted,
  isLoading,
  handleSubmit,
  fileInputRef,
  inputRef,
  selectedModel,
  setSelectedModel,
  selectedGroup,
  setSelectedGroup,
}) => {
  const [uploadQueue, setUploadQueue] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const postSubmitFileInputRef = useRef(null);
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";
  const enqueueSnackbar = useSnackbar();
  const [uploadImage] = useUploadImageMutation();

  const handleGroupSelect = useCallback(
    (group) => {
      setSelectedGroup(group.id);
      inputRef.current?.focus();
    },
    [setSelectedGroup, inputRef]
  );

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const data = await uploadImage(formData).unwrap();
      return {
        url: data.image,
        name: "",
        contentType: "image/",
        size: 0,
      };
    } catch (error) {
      enqueueSnackbar("Failed to upload file, please try again!", {
        variant: "error",
      });
      throw error;
    }
  };

  const handleFileChange = useCallback(
    async (event) => {
      const files = Array.from(event.target.files || []);
      const totalAttachments = attachments.length + files.length;

      if (totalAttachments > MAX_IMAGES) {
        enqueueSnackbar("You can only attach up to 5 images.", {
          variant: "error",
        });
        return;
      }

      setUploadQueue(files.map((file) => file.name));

      try {
        const uploadPromises = files.map((file) => uploadFile(file));
        const uploadedAttachments = await Promise.all(uploadPromises);
        setAttachments((currentAttachments) => [
          ...currentAttachments,
          ...uploadedAttachments,
        ]);
      } catch (error) {
        console.error("Error uploading files!", error);
        enqueueSnackbar(
          "Failed to upload one or more files. Please try again.",
          {
            variant: "error",
          }
        );
      } finally {
        setUploadQueue([]);
        event.target.value = "";
      }
    },
    [attachments, setAttachments]
  );

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (attachments.length >= MAX_IMAGES) return;

      if (e.dataTransfer.items && e.dataTransfer.items[0].kind === "file") {
        setIsDragging(true);
      }
    },
    [attachments.length]
  );

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const getFirstVisionModel = useCallback(() => {
    return models.find((model) => model.vision)?.value || selectedModel;
  }, [selectedModel]);

  const handleDrop = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (files.length === 0) {
        enqueueSnackbar("Only image files are supported", { variant: "error" });
        return;
      }

      const totalAttachments = attachments.length + files.length;
      if (totalAttachments > MAX_IMAGES) {
        enqueueSnackbar("You can only attach up to 5 images.", {
          variant: "error",
        });
        return;
      }

      // Switch to vision model if current model doesn't support vision
      const currentModel = models.find((m) => m.value === selectedModel);
      if (!currentModel?.vision) {
        const visionModel = getFirstVisionModel();
        setSelectedModel(visionModel);
        enqueueSnackbar(
          `Switched to ${
            models.find((m) => m.value === visionModel)?.label
          } for image support`
        );
      }

      setUploadQueue(files.map((file) => file.name));

      try {
        const uploadPromises = files.map((file) => uploadFile(file));
        const uploadedAttachments = await Promise.all(uploadPromises);
        setAttachments((currentAttachments) => [
          ...currentAttachments,
          ...uploadedAttachments,
        ]);
      } catch (error) {
        console.error("Error uploading files!", error);
        enqueueSnackbar(
          "Failed to upload one or more files. Please try again.",
          {
            variant: "error",
          }
        );
      } finally {
        setUploadQueue([]);
      }
    },
    [
      attachments.length,
      setAttachments,
      uploadFile,
      selectedModel,
      setSelectedModel,
      getFirstVisionModel,
    ]
  );

  const onSubmit = (event) => {
    event.preventDefault();

    if (input.trim() || attachments.length > 0) {
      setHasSubmitted(true);

      handleSubmit();

      setAttachments([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      enqueueSnackbar("Please enter a search query or attach an image.");
    }
  };

  const triggerFileInput = useCallback(() => {
    if (attachments.length >= MAX_IMAGES) {
      enqueueSnackbar(`You can only attach up to ${MAX_IMAGES} images`, {
        variant: "error",
      });
      return;
    }

    if (hasSubmitted) {
      postSubmitFileInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
  }, [attachments.length, hasSubmitted, fileInputRef]);

  return (
    <Card
      component='div'
      sx={{
        padding: 1,
        borderWidth: "1px",
        borderStyle: "solid",
        width: "100%",
        borderColor:
          dark && isDragging
            ? "#ededed"
            : !dark && isDragging
            ? "#ccc"
            : "divider",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            backdropFilter: "blur(2px)",
            backgroundColor: dark
              ? "rgba(38, 38, 38, 0.8)"
              : "rgba(255, 255, 255, 0.8)",
            borderRadius: "12px",
            border: `1px dashed ${
              dark ? theme.palette.grey[700] : theme.palette.grey[300]
            }`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0.5rem",
            position: "absolute",
            inset: 0,
            zIndex: 50,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 3,
              py: 4,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 1.5,
                borderRadius: "50%",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[800]
                    : theme.palette.grey[100],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CloudUpload
                size={24}
                color={
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[400]
                    : theme.palette.grey[600]
                }
              />
            </Paper>
            <Box textAlign='center'>
              <Typography
                variant='body2'
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[400]
                      : theme.palette.grey[600],
                  fontWeight: 500,
                }}
              >
                Drop images here
              </Typography>
              <Typography
                variant='caption'
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[500]
                      : theme.palette.grey[500],
                }}
              >
                Max {MAX_IMAGES} images
              </Typography>
            </Box>
          </Box>
        </motion.div>
      )}

      <input
        type='file'
        hidden
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
        accept='image/*'
        tabIndex={-1}
      />

      {(attachments.length > 0 || uploadQueue.length > 0) && (
        <Stack direction='row' flexWrap='wrap' gap={1}>
          {/* Existing attachment previews */}
          {attachments.map((attachment, index) => (
            <AttachmentPreview
              key={attachment.url}
              attachment={attachment}
              onRemove={() => removeAttachment(index)}
              isUploading={false}
            />
          ))}
          {uploadQueue.map((filename) => (
            <AttachmentPreview
              key={filename}
              attachment={{
                url: "",
                name: filename,
                contentType: "",
                size: 0,
              }}
              onRemove={() => {}}
              isUploading={true}
            />
          ))}
        </Stack>
      )}

      <Box sx={{ position: "relative" }}>
        <TextField
          name='question'
          type='text'
          ref={inputRef}
          placeholder={
            hasSubmitted ? "Ask a new question..." : "Ask a question..."
          }
          fullWidth
          sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
          value={input || ""}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />

        <Stack
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack flexDirection='row' alignItems='center' gap={2}>
            {!hasSubmitted ? (
              <>
                <SelectionContent
                  selectedGroup={selectedGroup}
                  onGroupSelect={handleGroupSelect}
                />
                <ModelSwitcher
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  showExperimentalModels={true}
                  attachments={attachments}
                  models={models}
                />
              </>
            ) : null}
          </Stack>

          <Stack flexDirection='row' alignItems='center' gap={1}>
            <IconButton
              color='text.secondary'
              aria-label='Stop'
              sx={{ bgcolor: "rgba(73, 149, 87, 0.04)", borderRadius: "5px" }}
              onClick={(event) => {
                event.preventDefault();
                triggerFileInput();
              }}
              disabled={isLoading}
            >
              <Attachment
                sx={{ transform: "rotate(135deg)" }}
                fontSize='small'
              />
            </IconButton>

            <IconButton
              color='text.secondary'
              aria-label='Submit'
              sx={{ bgcolor: "rgba(73, 149, 87, 0.04)", borderRadius: "5px" }}
              onClick={onSubmit}
              disabled={!input || isLoading}
            >
              <ArrowUpward fontSize='small' />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export default FormComponent;
