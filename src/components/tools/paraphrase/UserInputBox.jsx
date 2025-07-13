import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box } from "@mui/material";
import { useEffect } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import "./editor.css";

// Custom Word Limit Extension
const WordLimit = Extension.create({
  name: "wordLimit",

  addOptions() {
    return {
      limit: 20,
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("wordLimit"),

        props: {
          decorations: (state) => {
            const { doc } = state;
            const decorations = [];
            const limit = this.options.limit;
            let wordCount = 0;

            doc.descendants((node, pos) => {
              if (!node.isText) return;

              const nodeText = node.text;
              const regex = /\b\w+\b/g;
              let match;

              while ((match = regex.exec(nodeText)) !== null) {
                wordCount++;

                if (wordCount > limit) {
                  const from = pos + match.index;
                  const to = from + match[0].length;

                  decorations.push(
                    Decoration.inline(from, to, {
                      class: "word-limit-exceeded",
                    })
                  );
                }
              }
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});

function UserInputBox({ wordLimit = 20 }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Enter your text here...",
      }),
      WordLimit.configure({
        limit: wordLimit,
      }),
    ],
    content: "",
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  // Get current word count
  const text = editor.getText();
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const currentWordCount = text.trim() === "" ? 0 : words.length;

  console.log(`${currentWordCount}/${wordLimit} words`);

  return (
    <Box>
      <EditorContent editor={editor} />
    </Box>
  );
}

export default UserInputBox;
