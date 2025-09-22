import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { wordSentenceDecorator } from "./extentions";

const generateTextOnly = (data) => {
  let text = "";

  data.forEach((sentence, sIndex) => {
    sentence.forEach((wordObj, wIndex) => {
      const space =
        /^[.,;]$/.test(wordObj.word) || wordObj.word.endsWith("'") ? "" : " ";
      text += space + wordObj.word;
    });
  });

  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text }],
      },
    ],
  };
};

const EditableOutput = ({
  data,
  setSynonymsOptions,
  setSentence,
  setAnchorEl,
}) => {
  const [activeSentenceIndexes, setActiveSentenceIndexes] = useState([1]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editable: true,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor || !data?.length) return;

    editor.commands.setContent(generateTextOnly(data));

    // Remove previous decorator and reapply
    editor.view.setProps({
      decorations: wordSentenceDecorator(data, activeSentenceIndexes).props
        .decorations,
    });
  }, [editor, data]);

  useEffect(() => {
    if (!editor) return;
    const dom = editor.view.dom;

    const handleClick = (e) => {
      const el = e.target.closest(".word-span");
      if (!el) return;

      const sentenceIndex = Number(el.getAttribute("data-sentence-index"));
      const wordIndex = Number(el.getAttribute("data-word-index"));
      const wordObj = data?.[sentenceIndex]?.[wordIndex];
      if (!wordObj) return;

      setAnchorEl(el);
      setSynonymsOptions({
        synonyms: wordObj.synonyms || [],
        sentenceIndex,
        wordIndex,
        showRephraseNav: true,
      });

      const sentence = data[sentenceIndex].map((w) => w.word).join(" ");
      setSentence(sentence);
    };

    dom.addEventListener("click", handleClick);
    return () => dom.removeEventListener("click", handleClick);
  }, [editor, data]);

  return <EditorContent editor={editor} />;
};

export default EditableOutput;
