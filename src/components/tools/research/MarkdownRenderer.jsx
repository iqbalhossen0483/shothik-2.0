import { Check, ContentCopy } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Link,
  List,
  ListItem,
  Paper,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import Marked from "marked-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useGetResearchMetaDataQuery } from "../../../redux/api/tools/toolsApi";

const isValidUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

const LinkPreview = ({ href }) => {
  const { data: metadata, isLoading } = useGetResearchMetaDataQuery(
    {
      url: href,
    },
    { skip: !href }
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <CircularProgress size={20} sx={{ color: "text.secondary" }} />
      </Box>
    );
  }

  const domain = new URL(href).hostname;

  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 2,
          bgcolor: "neutral.100",
          dark: { bgcolor: "neutral.700" },
        }}
      >
        <Image
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=256`}
          alt='Favicon'
          width={20}
          height={20}
          style={{ borderRadius: 4 }}
        />
        <Typography
          variant='body2'
          fontWeight={500}
          color='text.secondary'
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {domain}
        </Typography>
      </Box>

      {/* Content Section */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Typography
          variant='h6'
          fontWeight={600}
          color='text.primary'
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {metadata?.title || "Untitled"}
        </Typography>

        {metadata?.description && (
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              mt: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {metadata.description}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

const RenderHoverCard = ({ href, text, isCitation = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };
  return (
    <Box component='span' display='inline-block'>
      {/* Link as Trigger */}
      <Link
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          cursor: isCitation ? "help" : "pointer",
          fontSize: isCitation ? "0.875rem" : "inherit",
          margin: 0,
          backgroundColor: isCitation ? "divider" : "transparent",
          borderRadius: "9999px",
          textDecoration: "none",
          color: isCitation ? "text.secondary" : "text.secondary",
          width: "20px",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            textDecoration: "none",
          },
          "&::-webkit-any-link": {
            textDecoration: "none",
          },
        }}
      >
        {text}
      </Link>

      {/* Popover for Hover Effect */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMouseLeave}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        disableRestoreFocus
        sx={{
          pointerEvents: "none",
        }}
        slotProps={{
          paper: {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            sx: { width: 320, p: 0, boxShadow: 3 },
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: 0,
            borderwidth: "1px",
            borderStyle: "solid",
            borderColor: "divider",
          }}
        >
          <LinkPreview href={href} />
        </Paper>
      </Popover>
    </Box>
  );
};

const MarkdownRenderer = ({ content }) => {
  let linkItem = 0;

  const CodeBlock = ({ language, children }) => {
    const [isCopied, setIsCopied] = useState(false);
    const themeMode = useTheme();
    const theme = themeMode.palette.mode;

    const handleCopy = useCallback(async () => {
      await navigator.clipboard.writeText(children);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }, [children]);

    return (
      <Box sx={{ my: 0.5 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "auto 1fr",
            borderRadius: "8px",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingX: 3,
              paddingY: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              sx={{
                paddingX: 2,
                paddingY: 0.5,
                fontSize: "0.75rem",
                fontWeight: "500",
                borderRadius: "0.375rem",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {language || "text"}
            </Typography>
            <IconButton
              onClick={handleCopy}
              color='primary'
              sx={{ bgcolor: "rgba(73, 149, 87, 0.04)" }}
              aria-label={isCopied ? "Copied!" : "Copy code"}
            >
              {isCopied ? <Check /> : <ContentCopy />}
            </IconButton>
          </Box>

          <Box
            sx={{
              overflow: "auto",
              "&::-webkit-scrollbar": {
                height: "4px !important",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "2px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    );
  };

  const renderer = {
    text(text) {
      return text;
    },
    paragraph(children) {
      return <Typography key={this.elementId}>{children}</Typography>;
    },
    code(children, language) {
      return (
        <CodeBlock key={this.elementId} language={language}>
          {String(children)}
        </CodeBlock>
      );
    },
    link(href) {
      if (!isValidUrl(href)) return null;
      linkItem += 1;
      // console.log({ linkItem });
      return (
        <Typography key={this.elementId} component='sup'>
          <RenderHoverCard href={href} text={linkItem} isCitation={true} />
        </Typography>
      );
    },
    heading(children) {
      return (
        <Typography key={this.elementId} variant='h4' sx={{ my: 2 }}>
          {children}
        </Typography>
      );
    },
    list(children, ordered) {
      return (
        <List
          key={this.elementId}
          component={ordered ? "ol" : "ul"}
          sx={{
            listStyleType: ordered ? "decimal" : "disc",
            pl: 4,
            color: "text.primary",
            "& li": { display: "list-item" },
          }}
        >
          {children}
        </List>
      );
    },
    listItem(children) {
      return (
        <ListItem
          key={this.elementId}
          sx={{
            color: "text.primary",
            display: "list-item",
            p: 0,
          }}
        >
          {children}
        </ListItem>
      );
    },
    blockquote(children) {
      return (
        <Box
          key={this.elementId}
          component='blockquote'
          sx={{
            borderLeft: 4,
            borderColor: "neutral.300",
            pl: 4,
            fontStyle: "italic",
            my: 4,
            color: "text.secondary",
          }}
        >
          {children}
        </Box>
      );
    },
  };

  return <Marked renderer={renderer}>{content}</Marked>;
};
export default MarkdownRenderer;
