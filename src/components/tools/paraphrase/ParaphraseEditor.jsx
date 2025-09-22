import { Box, Fade, Popper, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import style from "./editor.module.css";

const ParaphraseEditor = ({
  html,
  setHtml,
  freezeWords,
  setFreezeWords,
  user,
  wordLimit,
  updateHtml,
  isMobile,
}) => {
  const [isSnackbar, setSnackbar] = useState(false);
  const [wordFreeze, setWordFreeze] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState("");
  const nodeSelect = useRef(null);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const wordFreezeClose = () => {
    setSnackbar(false);
    setWordFreeze("");
  };

  function findInstances(str, word) {
    const stringWithoutSpaces = str.toLowerCase();
    const regex = new RegExp("\\b" + word + "\\b", "gi");
    const instances = stringWithoutSpaces.match(regex);

    return instances ? instances.length : 0;
  }

  const ref = useOutsideClick(() => handleClose());

  const validateText = (html) => {
    const words = html
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0); // Split into words
    const wordLimitation = wordLimit;
    const validWords = words.slice(0, wordLimitation).join(" ");
    const restWords = words.slice(wordLimitation).join(" ") || "";

    let styledHTML = "";

    if (words.length > wordLimitation) {
      let invalidWord = "";
      const targetStyle = `style="display:inline; opacity: 0.5;"`;
      if (restWords?.includes(targetStyle)) {
        invalidWord = restWords;
      } else {
        invalidWord = `<div style='display:inline; opacity: 0.5;'>${restWords}</div>`;
      }

      styledHTML = `${validWords} ${invalidWord}`;
    } else {
      styledHTML = html;
    }

    return styledHTML;
  };

  const handleChange = (html) => {
    const styledHTML = validateText(html);
    setHtml(styledHTML);
  };

  useEffect(() => {
    const styledHTML = validateText(html);
    if (styledHTML !== '<div style="opacity: 1"></div>') {
      setHtml(styledHTML);
    }
  }, [updateHtml]);

  const toggleFreeze = () => {
    const isAlreadyFrozen = freezeWords.includes(word);

    if (isAlreadyFrozen) {
      setFreezeWords((prevState) => prevState.filter((w) => w !== word));

      const styledHtml = html.replaceAll(
        `<span style="color:#006ACC; cursor: pointer; display: inline" class="freeze-word-text">${word}</span>`,
        word
      );
      setHtml(styledHtml);
      setWordFreeze("Word Unfreeze");
      setSnackbar(true);
    } else {
      setFreezeWords((prevState) => [...prevState, word.trim()]);
      const styledHtml = html.replaceAll(
        word,
        `<span style="color:#006ACC; cursor: pointer; display: inline" class="freeze-word-text">${word}</span>`
      );
      setHtml(styledHtml);
      setWordFreeze("Word Freeze");
      setSnackbar(true);
    }
    handleClose();
  };

  const handleMouseUp = () => {
    if (!isMobile) {
      const selection = window.getSelection();
      const selectedText = selection.toString();
      // Resets when the selection has a length of 0
      if (!selection || selection.anchorOffset === selection.focusOffset) {
        handleClose();
        return;
      }

      // Check if there is selected text and if the mouse was released within the nodeSelect element
      if (
        selectedText.trim().length > 0 &&
        nodeSelect.current.contains(selection.anchorNode)
      ) {
        setWord(selectedText);
        const getBoundingClientRect = () => {
          if (selection.rangeCount === 0) {
            setOpen(false);
            return;
          }
          return selection.getRangeAt(0).getBoundingClientRect();
        };

        setOpen(true);
        setAnchorEl({ getBoundingClientRect });
      } else {
        handleClose();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    // Get the plain text from the clipboard
    const text = e.clipboardData.getData("text/plain");

    // Insert the sanitized text into the current caret position
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    // Insert plain text
    range.insertNode(document.createTextNode(text));

    // Move the caret to the end of the inserted text
    range.collapse(false);

    // Update the state
    const updatedHtml = nodeSelect.current.innerHTML;
    setHtml(updatedHtml);
  };

  const id = open ? "virtual-element-popper" : undefined;
  let instances = findInstances(html, word);

  const paidUser =
    user?.package === "pro_plan" ||
    user?.package === "value_plan" ||
    user?.package === "unlimited";

  return (
    <Box
      sx={{
        flexGrow: 1,
        cursor: "text",
        position: "relative",
        overflowY: "auto",
      }}
      onClick={() => nodeSelect.current?.focus()}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        {/* Placeholder text */}
        {!html && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              color: "#888",
              pointerEvents: "none",
            }}
          >
            Please enter text...
          </div>
        )}
        <ContentEditable
          innerRef={nodeSelect}
          html={html}
          onMouseUp={handleMouseUp}
          onPaste={handlePaste}
          onChange={(e) => handleChange(e.target.value)}
          tagName='div'
          className={style.content_editable}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        placement='top'
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              ref={ref}
              onClick={paidUser ? toggleFreeze : () => router.push("/pricing")}
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "background.paper",
                p: 0.8,
                bgcolor: "background.gray",
                borderRadius: 0.5,
                cursor: "pointer",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              {`${
                freezeWords.includes(word)
                  ? "Unfreeze"
                  : paidUser
                  ? "Freeze"
                  : "Please upgrade to Freeze"
              }${instances > 1 ? ` all ${instances} instances` : ""}`}
            </Box>
          </Fade>
        )}
      </Popper>
      <Snackbar
        sx={{
          zIndex: { xl: 9999, lg: 999 },
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
        open={isSnackbar}
        autoHideDuration={2500}
        onClose={wordFreezeClose}
        message={wordFreeze}
      />
    </Box>
  );
};

export default ParaphraseEditor;
