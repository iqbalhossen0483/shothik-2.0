import { useTheme } from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import {
  CursorHandler,
  EnterHandler,
  SentenceNode,
  WordNode,
} from "./extentions";

const getColorStyle = (type, dark = false) => {
  const adJectiveVerbAdverbColor = dark ? "#ef5c47" : "#d95645";
  const nounColor = dark ? "#b6bdbd" : "#530a78";
  const phraseColor = dark ? "#b6bdbd" : "#051780";
  const freezeColor = "#006ACC";

  if (/NP/.test(type)) return adJectiveVerbAdverbColor;
  if (/VP/.test(type)) return nounColor;
  if (/PP|CP|AdvP|AdjP/.test(type)) return phraseColor;
  if (/freeze/.test(type)) return freezeColor;
  return "inherit";
};

const generateFormatedText = (data, activeSentence, dark) => {
  const content = data.map((sentence, sIndex) => {
    return {
      type: "sentenceNode",
      attrs: {
        "data-sentence-index": sIndex + 1,
        class: `sentence-span ${
          activeSentence === sIndex + 1 ? "active-sentence" : ""
        }`,
      },
      content: sentence.map((word, wIndex) => {
        return {
          type: "wordNode",
          attrs: {
            "data-sentence-index": sIndex + 1,
            "data-word-index": wIndex + 1,
            "data-type": word.type,
            class: "word-span",
            style: `color:${getColorStyle(word.type, dark)};cursor:pointer`,
          },
          content: [
            {
              type: "text",
              text:
                ((wIndex === 0 && sIndex === 0) || /^[.,;?!]$/.test(word.word)
                  ? ""
                  : " ") + word.word,
            },
          ],
        };
      }),
    };
  });

  return {
    type: "doc",
    content: [{ type: "paragraph", content }],
  };
};

const EditableOutput = ({
  data,
  setSynonymsOptions,
  setSentence,
  setAnchorEl,
  setActiveSentence,
  activeSentence,
  isOutputFoucus,
  setIsOutputFoucus,
  isInputFoucus,
  language,
}) => {
  const [input, setInput] = useState("");
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          enter: false,
        }),
        SentenceNode,
        WordNode,
        CursorHandler.configure({
          enabled: !isInputFoucus,
          onActiveSentenceChange: (index) => {
            setActiveSentence(index);
          },
        }),
        EnterHandler,
      ],
      content: "",
      editable: true,
      immediatelyRender: false,
      onFocus: () => {
        setIsOutputFoucus(true);
      },

      onBlur: () => {
        setIsOutputFoucus(false);
      },
      onUpdate: ({ editor }) => {
        setInput(editor.getText());
      },
    },
    [isInputFoucus]
  );

  useEffect(() => {
    if (!editor || !data?.length) return;
    const sentences = [...data];

    const separator = language === "Bangla" ? "। " : ". ";
    const inputContent = input.split(separator).filter(Boolean);
    const existingSentenceCount = data.length;
    if (inputContent.length > existingSentenceCount) {
      const newSentences = inputContent.slice(existingSentenceCount);
      const newData = newSentences.map((sentence) => {
        const words = sentence
          .trim()
          .split(/\s+/)
          .map((word) => ({
            word,
            type: "none",
            synonyms: [],
          }));
        return words;
      });
      sentences.push(...newData);
    }

    const shouldUpdate = !activeSentence || (activeSentence && !isOutputFoucus);
    if (shouldUpdate) {
      editor.commands.setContent(
        generateFormatedText(sentences, activeSentence, dark)
      );
    }
  }, [editor, data, activeSentence, isOutputFoucus]);

  useEffect(() => {
    if (!editor) return;
    const dom = editor.view.dom;

    const handleClick = (e) => {
      const el = e.target.closest(".word-span");
      if (!el) return;

      const sentenceIndex = Number(el.getAttribute("data-sentence-index"));
      const wordIndex = Number(el.getAttribute("data-word-index"));
      const wordObj = data?.[sentenceIndex - 1]?.[wordIndex - 1];
      if (!wordObj) return;

      setAnchorEl(el);
      setSynonymsOptions({
        synonyms: wordObj.synonyms || [],
        sentenceIndex: sentenceIndex - 1,
        wordIndex: wordIndex - 1,
        showRephraseNav: true,
      });
      console.log({ wordIndex });
      const sentence = data[sentenceIndex - 1].map((w) => w.word).join(" ");
      setSentence(sentence);
    };

    dom.addEventListener("click", handleClick);
    return () => dom.removeEventListener("click", handleClick);
  }, [editor, data]);

  return <EditorContent editor={editor} />;
};

export default EditableOutput;
