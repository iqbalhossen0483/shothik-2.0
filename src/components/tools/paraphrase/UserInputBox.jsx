import { Box, Button, Popover } from "@mui/material";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";
import "./editor.css";
import {
  CombinedHighlighting,
  CursorWatcher,
  EnterWatcher,
  SpanNode,
} from "./extentions";

function generateFormatedSentences(sentences, activeSentence) {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: sentences.map((sentence, sIndex) => ({
          type: "spanNode",
          attrs: {
            "data-sentence-index": sIndex + 1,
            class: `sentence-span ${
              activeSentence === sIndex + 1 ? "active-sentence" : ""
            }`,
          },
          content: [
            {
              type: "text",
              text: sentence + (sentences.length - 1 === sIndex ? "" : " "),
            },
          ],
        })),
      },
    ],
  };
}

function UserInputBox({
  wordLimit = 300,
  setUserInput,
  userInput = "",
  frozenWords,
  frozenPhrases,
  user,
  activeSentence,
  formatedSentences,
  setActiveSentence,
  setIsInputFoucus,
  isOutputFoucus,
  isInputFoucus,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [selectedWord, setSelectedWord] = useState("");
  const isInternalUpdate = useRef(false);

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          enter: false,
        }),
        Placeholder.configure({ placeholder: "Enter your text here..." }),
        CombinedHighlighting.configure({
          limit: wordLimit,
          frozenWords: frozenWords.set,
          frozenPhrases: frozenPhrases.set,
        }),
        SpanNode,
        EnterWatcher,
        CursorWatcher.configure({
          enabled: !isOutputFoucus,
          onActiveSentenceChange: (index) => {
            setActiveSentence(index);
          },
        }),
      ],
      content: "",
      immediatelyRender: false,
      onSelectionUpdate: ({ editor }) => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to, " ").trim();

        if (selectedText && from !== to) {
          setSelectedWord(selectedText);

          setTimeout(() => {
            const { view } = editor;
            const start = view.coordsAtPos(from);

            setPopoverPosition({
              top: start.bottom + window.scrollY,
              left: start.left + window.scrollX,
            });

            setAnchorEl(document.body);
          }, 10);
        } else {
          clearSelection();
        }
      },
      onUpdate: ({ editor }) => {
        isInternalUpdate.current = true;
        setUserInput(editor.getText());
      },
      onFocus: () => {
        setIsInputFoucus(true);
      },

      onBlur: () => {
        setIsInputFoucus(false);
      },
    },
    [isOutputFoucus]
  );

  const clearSelection = () => {
    setAnchorEl(null);
    setSelectedWord("");
  };

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  useEffect(() => {
    if (editor && !isInternalUpdate.current && userInput !== editor.getHTML()) {
      editor.commands.setContent(userInput);
    }
    isInternalUpdate.current = false; // reset flag
  }, [userInput, editor]);

  useEffect(() => {
    if (editor && formatedSentences.length) {
      editor.commands.setContent(
        generateFormatedSentences(formatedSentences, activeSentence)
      );
    }
  }, [formatedSentences, editor]);

  useEffect(() => {
    if (!editor) return;
    if (activeSentence && !isInputFoucus) {
      editor.commands.setContent(
        generateFormatedSentences(formatedSentences, activeSentence)
      );
    }
  }, [editor, activeSentence]);

  useEffect(() => {
    if (!editor) return;

    const plugin = editor.extensionManager.extensions.find(
      (ext) => ext.name === "combinedHighlighting"
    );

    if (!plugin) return;

    // Overwrite the frozenWords and frozenPhrases directly
    plugin.options.frozenWords = frozenWords.set;
    plugin.options.frozenPhrases = frozenPhrases.set;

    editor.view.dispatch(editor.state.tr); // ✅ trigger re-render
  }, [frozenWords.set, frozenPhrases.set, editor]);

  const handleToggleFreeze = () => {
    const key = selectedWord.toLowerCase().trim();
    const isPhrase = key.includes(" ");

    if (isPhrase) {
      frozenPhrases.toggle(key);
    } else {
      frozenWords.toggle(key);
    }

    clearSelection();
  };

  const isFrozen = () => {
    const key = selectedWord.toLowerCase().trim();
    return key.includes(" ") ? frozenPhrases.has(key) : frozenWords.has(key);
  };

  if (!editor) return null;

  const paidUser =
    user?.package === "pro_plan" ||
    user?.package === "value_plan" ||
    user?.package === "unlimited";

  const getButtonText = () =>
    !paidUser ? "Please upgrade to Freeze" : isFrozen() ? "Unfreeze" : "Freeze";

  return (
    <Box
      sx={{
        flexGrow: 1,
        cursor: "text",
        position: "relative",
        overflowY: "auto",
      }}
    >
      <EditorContent editor={editor} />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={clearSelection}
        anchorReference='anchorPosition'
        anchorPosition={popoverPosition}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Button
          variant='contained'
          size='small'
          disabled={!paidUser}
          onClick={handleToggleFreeze}
        >
          {getButtonText()}
        </Button>
      </Popover>
    </Box>
  );
}

export default UserInputBox;
