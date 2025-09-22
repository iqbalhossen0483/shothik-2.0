import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import useSnackbar from "../../../hooks/useSnackbar";
import {
  useParaphraseForTaggingMutation,
  useReportForSentenceMutation,
} from "../../../redux/api/tools/toolsApi";
import EditableOutput from "./EditableOutput";
import RephraseSentenceNav from "./RephraseSentenceNav";
import RephraseSentences from "./RephraseSentences";
import Synonyms from "./Synonyms";

const ParaphraseOutput = ({
  data,
  input,
  setData,
  synonymLevel,
  userPackage,
  selectedLang,
  setOutputHistory,
  freezeWords,
  socketId,
  language,
  setProcessing,
  eventId,
  setEventId,
  setActiveSentence,
  activeSentence,
  isOutputFoucus,
  setIsOutputFoucus,
  isInputFoucus,
}) => {
  const [paraphraseForTagging] = useParaphraseForTaggingMutation();
  const [reportForSentence] = useReportForSentenceMutation();
  const [rephraseMode, setRephraseMode] = useState("Standard");
  const [showRephrase, setShowRephrase] = useState(false);
  const [rephraseData, setRephraseData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sentence, setSentence] = useState("");
  const enqueueSnackbar = useSnackbar();
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";
  const synonymInit = {
    synonyms: [],
    sentenceIndex: -1,
    wordIndex: -1,
    showRephraseNav: false,
  };
  const [synonymsOptions, setSynonymsOptions] = useState(synonymInit);
  console.log(anchorEl);
  const replaceSynonym = (newWord) => {
    setData((prevData) => {
      const newData = prevData.map((sentence, sIndex) =>
        sIndex === synonymsOptions.sentenceIndex
          ? sentence.map((wordObj, wIndex) =>
              wIndex === synonymsOptions.wordIndex
                ? { ...wordObj, word: newWord }
                : wordObj
            )
          : sentence
      );
      return newData;
    });
    setSynonymsOptions(synonymInit);
  };

  const replaceSentence = async (sentenceData) => {
    let newData = [...data];
    newData[synonymsOptions.sentenceIndex] = sentenceData;
    setData(newData);
    setOutputHistory((prevHistory) => {
      const arr = [];
      if (!prevHistory.length) {
        arr.push(data);
      }
      arr.push(newData);
      return [...prevHistory, ...arr];
    });

    setShowRephrase(false);

    try {
      setProcessing({ success: false, loading: true });

      let sentence = "";
      const data = newData[synonymsOptions.sentenceIndex];
      for (let i = 0; i < data.length; i++) {
        const word = data[i].word;
        if (/^[.,]$/.test(word)) {
          sentence += word;
        } else {
          sentence += (sentence ? " " : "") + word;
        }
      }
      const randomNumber = Math.floor(Math.random() * 10000000000);
      setEventId(`${socketId}-${randomNumber}`);
      const payload = {
        sentence,
        socketId,
        index: synonymsOptions.sentenceIndex,
        language,
        eventId,
      };
      await paraphraseForTagging(payload).unwrap();
    } catch (error) {
      console.log(error);
      setProcessing({ success: false, loading: false });
    }
    setSynonymsOptions(synonymInit);
  };

  const sendReprt = async () => {
    try {
      const inputs = input.replace(/<[^>]+>/g, "");
      const separator = selectedLang === "Bengali" ? "।" : ".";
      const sentences = inputs.split(separator);
      const output = data[synonymsOptions.sentenceIndex]
        ?.map((word) => word?.word)
        ?.join(" ");

      const payload = {
        input: sentences[synonymsOptions.sentenceIndex],
        output,
      };
      const { data: res } = await reportForSentence(payload).unwrap();

      enqueueSnackbar(res?.message, { variant: "success" });
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Unknown error. Please try again later.";
      enqueueSnackbar(msg, { variant: "error" });
    }
  };

  const handleCopy = async () => {
    const msg = "Sentence copied to clipboard";
    const text = data[synonymsOptions.sentenceIndex]
      ?.map((word) => word?.word)
      ?.join(" ");
    await navigator.clipboard.writeText(text);
    enqueueSnackbar(msg);
  };

  async function rephraseSentence() {
    try {
      if (!sentence || !selectedLang) return;
      setIsPending(true);
      setShowRephrase(true);

      // const url =
      //   process.env.NEXT_PUBLIC_PARAPHRASE_API_URI +
      //   "/paraphrase-with-variantV2";
      const url =
        process.env.NEXT_PUBLIC_API_URI + "/paraphrase-with-variantV2";
      const token = localStorage.getItem("accessToken");
      const payload = {
        text: sentence,
        mode: rephraseMode ? rephraseMode.toLowerCase() : "standard",
        synonymLevel: synonymLevel ? synonymLevel.toLowerCase() : "basic",
        model: "sai-nlp-boost",
        language: selectedLang,
        freezeWord: freezeWords,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token ? "Bearer " + token : "",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw { message: error.message, error: error.error };
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      setIsPending(false);
      if (reader) {
        let text = "";
        const saparator = selectedLang === "Bengali" ? "। " : ". ";
        const pattern = /\{[^}]+\}|\S+/g;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          // Decode the chunk and add it to the buffer
          const buffer = decoder.decode(value, { stream: true });
          text += buffer.replaceAll("\n", " ");

          let sentences = text.split(saparator);
          sentences = sentences.map((sentence) => {
            let result = sentence.match(pattern) || [];
            result = result.map((item) => {
              return {
                word: item,
                type: /\{[^}]+\}/.test(item) ? "freeze" : "none",
                synonyms: [],
              };
            });
            result.push({ word: saparator.trim(), type: "none", synonyms: [] });
            return result;
          });
          sentences = sentences.filter((item) => item.length > 1);

          setRephraseData(sentences);
        }
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  }

  useEffect(() => {
    if (rephraseData.length) {
      rephraseSentence();
    }
  }, [rephraseMode]);

  return (
    <Box sx={{ p: 2, flexGrow: 1, overflowY: "auto" }}>
      <EditableOutput
        data={data}
        dark={dark}
        setSynonymsOptions={setSynonymsOptions}
        setSentence={setSentence}
        setAnchorEl={setAnchorEl}
        setActiveSentence={setActiveSentence}
        activeSentence={activeSentence}
        isOutputFoucus={isOutputFoucus}
        setIsOutputFoucus={setIsOutputFoucus}
        isInputFoucus={isInputFoucus}
        language={language}
      />

      <Synonyms
        synonyms={synonymsOptions.synonyms}
        open={!!synonymsOptions.synonyms.length}
        handleClose={() =>
          setSynonymsOptions((prev) => {
            return {
              ...synonymInit,
              sentenceIndex: prev.sentenceIndex,
              showRephraseNav: prev.showRephraseNav,
            };
          })
        }
        anchorEl={anchorEl}
        replaceSynonym={replaceSynonym}
      />
      <RephraseSentenceNav
        anchorEl={anchorEl}
        open={synonymsOptions.showRephraseNav}
        rephraseSentence={rephraseSentence}
        handleCopy={handleCopy}
        sendReprt={sendReprt}
        handleClose={() =>
          setSynonymsOptions((prev) => {
            return { ...prev, showRephraseNav: false };
          })
        }
      />
      <RephraseSentences
        open={showRephrase}
        anchorEl={anchorEl}
        handleClose={() => setShowRephrase(false)}
        userPackage={userPackage}
        replaceSentence={replaceSentence}
        rephraseData={rephraseData}
        isPending={isPending}
        setRephraseMode={setRephraseMode}
        rephraseMode={rephraseMode}
      />
    </Box>
  );
};

export default ParaphraseOutput;
