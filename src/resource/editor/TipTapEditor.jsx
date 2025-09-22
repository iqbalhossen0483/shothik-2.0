import {
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  HorizontalRule,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import HorizontalRuleExtension from "@tiptap/extension-horizontal-rule";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";

const TipTapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3, 4] }), // Supports H2 - H4
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      HorizontalRuleExtension,
      Bold,
      Italic,
      Underline,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          py: 1,
          border: "2px solid",
          borderBottom: 0,
          borderColor: "divider",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      >
        {/* Bold */}
        <IconButton onClick={() => editor.commands.toggleBold()} size='small'>
          <FormatBold />
        </IconButton>

        {/* Italic */}
        <IconButton onClick={() => editor.commands.toggleItalic()} size='small'>
          <FormatItalic />
        </IconButton>

        {/* Underline */}
        <IconButton
          onClick={() => editor.commands.toggleUnderline()}
          size='small'
        >
          <FormatUnderlined />
        </IconButton>

        {/* p */}
        <IconButton
          onClick={() => editor.commands.setParagraph({ level: 1 })}
          size='small'
        >
          <Typography fontWeight={600}>P</Typography>
        </IconButton>

        {/* H2 */}
        <IconButton
          onClick={() => editor.commands.setHeading({ level: 2 })}
          size='small'
        >
          <Typography fontWeight={600}>H2</Typography>
        </IconButton>

        {/* H3 */}
        <IconButton
          onClick={() => editor.commands.setHeading({ level: 3 })}
          size='small'
        >
          <Typography fontWeight={600}>H3</Typography>
        </IconButton>

        {/* H4 */}
        <IconButton
          onClick={() => editor.commands.setHeading({ level: 4 })}
          size='small'
        >
          <Typography fontWeight={600}>H4</Typography>
        </IconButton>

        {/* Ordered List (OL) */}
        <IconButton
          onClick={() => editor.commands.toggleOrderedList()}
          size='small'
        >
          <FormatListNumbered />
        </IconButton>

        {/* Unordered List (UL) */}
        <IconButton
          onClick={() => editor.commands.toggleBulletList()}
          size='small'
        >
          <FormatListBulleted />
        </IconButton>

        {/* Blockquote */}
        <IconButton
          onClick={() => editor.commands.toggleBlockquote()}
          size='small'
        >
          <FormatQuote />
        </IconButton>

        {/* Divider (Horizontal Rule) */}
        <IconButton
          onClick={() => editor.commands.setHorizontalRule()}
          size='small'
        >
          <HorizontalRule />
        </IconButton>
      </Box>

      {/* Wrapped Editor Content in Box for Proper Styling */}
      <Box
        sx={{
          border: "2px solid",
          borderColor: "divider",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          minHeight: "100px",
          transition: "border-color 0.3s ease-in-out",
          "&:focus-within": {
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            borderColor: "primary.main",
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>

      {/* Global Styles for ProseMirror */}
      <style>{`
        .ProseMirror {
          min-height: 90px;
          padding: 5px 10px;
          font-size: 16px;
          outline: none;
        }
        .ProseMirror p, .ProseMirror h2, .ProseMirror h3, .ProseMirror h4 {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default TipTapEditor;
