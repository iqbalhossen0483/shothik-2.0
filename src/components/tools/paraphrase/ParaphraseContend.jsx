"use client";
import { InsertDriveFile } from "@mui/icons-material";
import { Box, Card, Divider, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { modes } from "../../../_mock/tools/paraphrase";
import { detectLanguage } from "../../../hooks/languageDitector";
import useResponsive from "../../../hooks/useResponsive";
import useSnackbar from "../../../hooks/useSnackbar";
import useWordLimit from "../../../hooks/useWordLimit";
import { useParaphrasedMutation } from "../../../redux/api/tools/toolsApi";
import { setShowLoginModal } from "../../../redux/slice/auth";
import { setAlertMessage, setShowAlert } from "../../../redux/slice/tools";
import UserActionInput from "../common/UserActionInput";
import WordCounter from "../common/WordCounter";
import LanguageMenu from "../grammar/LanguageMenu";
import ModeNavigation from "./ModeNavigation";
import ModeNavigationForMobile from "./ModeNavigationForMobile";
import OutputBotomNavigation from "./OutputBotomNavigation";
import ParaphraseEditor from "./ParaphraseEditor";
import ParaphraseOutput from "./ParaphraseOutput";
import ViewInputInOutAsDemo from "./ViewInputInOutputAsDemo";
import UserInputBox from "./UserInputBox";

const SYNONYMS = {
  20: "Basic",
  40: "Intermediate",
  60: "Advanced",
  80: "Expert",
};

const ParaphraseContend = () => {
  const [selectedSynonyms, setSelectedSynonyms] = useState(SYNONYMS[20]);
  const { user } = useSelector((state) => state.auth);
  const [outputHistoryIndex, setOutputHistoryIndex] = useState(0);
  const [highlightSentence, setHighlightSentence] = useState(0);
  const [selectedMode, setSelectedMode] = useState("Standard");
  const [outputWordCount, setOutputWordCount] = useState(0);
  const [outputHistory, setOutputHistory] = useState([]);
  const [outputContend, setOutputContend] = useState("");
  const [language, setLanguage] = useState("English");
  const [updateHtml, setUpdateHtml] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [freezeWords, setFreezeWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { wordLimit } = useWordLimit("paraphrase");
  const [userInput, setUserInput] = useState("");
  const [socketId, setSocketId] = useState(null);
  const [eventId, setEventId] = useState(null);
  const isMobile = useResponsive("down", "sm");
  const [result, setResult] = useState([]);
  const enqueueSnackbar = useSnackbar();
  const dispatch = useDispatch();
  const [paraphrased] = useParaphrasedMutation();
  const [showMessage, setShowMessage] = useState({
    show: false,
    Component: null,
  });

  useEffect(() => {
    if (!userInput) return;
    const language = detectLanguage(userInput);
    setLanguage(language);
  }, [userInput]);

  useEffect(() => {
    if (!outputHistory.length) {
      return;
    }

    const historyData = outputHistory[outputHistoryIndex];

    if (historyData) {
      setResult(historyData);
    }
  }, [outputHistoryIndex]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setSocketId(socket.id);
    });

    socket.on("disconnect", () => {
      console.warn("Socket disconnected");
      setSocketId("");
    });

    let accumulatedText = "";
    socket.on("paraphrase-plain", (data) => {
      if (data === ":end:") {
        accumulatedText = "";
        setIsLoading(false);
        return;
      }

      accumulatedText += data.replace(/[{}]/g, "");

      const separator = language === "Bangla" ? "। " : ". ";
      const sentences = accumulatedText.split(separator).map((sentence) => {
        const words = sentence
          .trim()
          .split(/\s+/)
          .map((word) => ({ word, type: "none", synonyms: [] }));

        // Add punctuation if it’s a full sentence
        if (sentence) {
          words.push({
            word: separator.trim(),
            type: "punctuation",
            synonyms: [],
          });
        }

        return words;
      });

      setResult(sentences);
      setOutputContend(accumulatedText.replace(/[()]/g, ""));
      setOutputWordCount(accumulatedText.split(/\s+/).filter(Boolean).length);
    });

    socket.on("paraphrase-tagging", (data) => {
      try {
        const sentence = JSON.parse(data);
        if (sentence.eventId === eventId) {
          setResult((prev) => {
            const updated = [...prev];
            updated[sentence.index] = sentence.data;
            return updated;
          });
        }
      } catch (error) {
        console.error("Error parsing paraphrase-tagging data:", error);
      }
    });

    socket.on("paraphrase-synonyms", (data) => {
      if (data === ":end:") {
        console.log("Synonyms processing completed.");
        setProcessing({ success: true, loading: false });
        return;
      }

      try {
        const sentence = JSON.parse(data);
        if (sentence.eventId === eventId) {
          setResult((prev) => {
            const updated = [...prev];
            updated[sentence.index] = sentence.data;
            return updated;
          });
        }
      } catch (error) {
        console.error("Error parsing paraphrase-synonyms data:", error);
      }
    });
  }, [language, eventId]);

  const handleClear = (_, action = "all") => {
    if (action === "all") {
      setUserInput("");
      setFreezeWords([]);
    }
    setResult([]);
    setOutputHistory([]);
  };

  function handleSampleText() {
    setUserInput(
      "The city streets were filled with excitement as people gathered for the annual parade. Brightly colored floats and marching bands filled the air with music and laughter. Spectators lined the sidewalks, cheering and waving as the procession passed by."
    );
    setUpdateHtml((prev) => !prev);
  }

  const handleSubmit = async (rephrase) => {
    try {
      const lastOutput = outputContend;
      let payload;

      setIsLoading(true);
      setResult([]);
      setOutputHistoryIndex(0);
      setProcessing({ success: false, loading: true });

      const textToParaphrase = rephrase ? lastOutput : userInput;
      const extractedSentences = textToParaphrase.replace(/<[^>]+>/g, "");
      const textAsWrodsArray = extractedSentences
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      const finalText = textAsWrodsArray.slice(0, wordLimit).join(" ");
      if (finalText > wordLimit) {
        throw { error: "LIMIT_REQUEST", message: "Worads limit execed" };
      }

      // generate uniqe 10 number randomly;
      const randomNumber = Math.floor(Math.random() * 10000000000);
      setEventId(`${socketId}-${randomNumber}`);

      payload = {
        text: finalText,
        freeze: freezeWords.length ? freezeWords.join(", ") : "",
        language: language,
        mode: selectedMode ? selectedMode.toLowerCase() : "standard",
        synonym: selectedSynonyms ? selectedSynonyms.toLowerCase() : "basic",
        socketId,
        eventId,
      };

      await paraphrased(payload).unwrap();
    } catch (error) {
      const actualError = error?.data?.error;
      setResult([]);
      if (/LIMIT_REQUEST|PACAKGE_EXPIRED/.test(actualError)) {
        dispatch(setShowAlert(true));
        dispatch(setAlertMessage(error?.data?.message));
      } else if (error?.error === "UNAUTHORIZED") {
        dispatch(setShowLoginModal(true));
      } else {
        enqueueSnackbar(error?.message, { variant: "error" });
      }
      setProcessing({ success: false, loading: false });
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <LanguageMenu
        isLoading={isLoading}
        setLanguage={setLanguage}
        language={language}
      />
      <Card
        sx={{
          mt: 1,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "12px",
          overflow: "visible",
        }}
      >
        {!isMobile ? (
          <ModeNavigation
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            userPackage={user?.package}
            selectedSynonyms={selectedSynonyms}
            setSelectedSynonyms={setSelectedSynonyms}
            SYNONYMS={SYNONYMS}
          />
        ) : (
          <ModeNavigationForMobile
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            freezeWords={freezeWords}
            setFreezeWords={setFreezeWords}
          />
        )}

        <Divider sx={{ borderBottom: "2px solid", borderColor: "divider" }} />

        <Grid2 container>
          <Grid2
            sx={{
              height: 530,
              position: "relative",
              borderRight: { md: "2px solid" },
              borderRightColor: { md: "divider" },
              padding: 2,
              paddingBottom: 0,
            }}
            size={{ xs: 12, md: 6 }}
          >
            {/* <ParaphraseEditor
              freezeWords={freezeWords}
              html={userInput}
              isMobile={isMobile}
              setFreezeWords={setFreezeWords}
              setHtml={setUserInput}
              user={user}
              updateHtml={updateHtml}
              wordLimit={wordLimit}
            /> */}
            <UserInputBox />

            {!userInput ? (
              <UserActionInput
                setUserInput={setUserInput}
                isMobile={isMobile}
                handleSampleText={handleSampleText}
                extraAction={() => setUpdateHtml((prev) => !prev)}
              />
            ) : null}
            <WordCounter
              btnText={outputContend ? "Rephrase" : "Paraphrase"}
              handleClearInput={handleClear}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              userInput={userInput}
              userPackage={user?.package}
              toolName="paraphrase"
              btnIcon={isMobile ? null : <InsertDriveFile />}
              sx={{ py: 0 }}
              dontDisable={true}
            />
          </Grid2>
          <Grid2
            size={{ xs: 12, md: 6 }}
            sx={{
              height: 530,
              overflow: "hidden",
              borderTop: { xs: "2px solid", md: "none" },
              borderTopColor: { xs: "divider", md: undefined },
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ color: "darkgray", paddingLeft: 15 }}>
              {isLoading ? (
                <ViewInputInOutAsDemo input={userInput} wordLimit={wordLimit} />
              ) : !result.length ? (
                <p>{!showMessage.show && "Paraphrased Text"}</p>
              ) : null}
            </div>

            {result.length ? (
              <>
                <ParaphraseOutput
                  data={result}
                  setData={setResult}
                  synonymLevel={selectedSynonyms}
                  dataModes={modes}
                  userPackage={user?.package}
                  selectedLang={language}
                  highlightSentence={highlightSentence}
                  setOutputHistory={setOutputHistory}
                  input={userInput}
                  freezeWords={freezeWords}
                  socketId={socketId}
                  language={language}
                  setProcessing={setProcessing}
                  eventId={eventId}
                  setEventId={setEventId}
                />
                <OutputBotomNavigation
                  handleClear={handleClear}
                  highlightSentence={highlightSentence}
                  outputContend={outputContend}
                  outputHistory={outputHistory}
                  outputHistoryIndex={outputHistoryIndex}
                  outputWordCount={outputWordCount}
                  proccessing={processing}
                  sentenceCount={result.length}
                  setHighlightSentence={setHighlightSentence}
                  setOutputHistoryIndex={setOutputHistoryIndex}
                />
              </>
            ) : null}
          </Grid2>
        </Grid2>
      </Card>
    </Box>
  );
};

export default ParaphraseContend;
