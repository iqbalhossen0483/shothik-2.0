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
  isOutputFoucus,
  isInputFoucus,
  setIsInputFoucus,
  language,
  clearInput,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [selectedWord, setSelectedWord] = useState("");
  const internalUpdate = useRef(false);

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
      content: userInput,
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
        setUserInput(editor.getText());
        internalUpdate.current = true;
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

  useEffect(() => {
    if (!editor) return;
    if (internalUpdate.current) {
      internalUpdate.current = false;
      return;
    }
    if (!userInput) return;
    editor.commands.setContent(userInput);
  }, [editor, userInput]);

  const handleToggleFreeze = () => {
    const key = selectedWord.toLowerCase().trim();
    const isPhrase = key.includes(" ");
    let newWordSet;
    let newPhraseSet;
    if (isPhrase) {
      newPhraseSet = frozenPhrases.toggle(key);
    } else {
      newWordSet = frozenWords.toggle(key);
    }

    // Force re-render by updating the extension options
    editor.view.dispatch(
      editor.state.tr.setMeta("combinedHighlighting", {
        frozenWords: newWordSet,
        frozenPhrases: newPhraseSet,
      })
    );
    clearSelection();
  };

  const clearSelection = () => {
    setAnchorEl(null);
    setSelectedWord("");
  };

  useEffect(() => {
    if (!internalUpdate || !editor) return; // retun initially
    editor.commands.setContent("");
    return () => editor?.destroy();
  }, [editor, clearInput]);

  useEffect(() => {
    if (!editor) return;
    const separator = language === "Bangla" ? "। " : ". ";
    const newUserInput = userInput.split(separator).length;
    const shouldUpdate =
      formatedSentences.length === newUserInput &&
      (!activeSentence || (activeSentence && !isInputFoucus));

    if (shouldUpdate) {
      editor.commands.setContent(
        generateFormatedSentences(formatedSentences, activeSentence)
      );
    }
  }, [editor, formatedSentences, activeSentence, isInputFoucus]);

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
