"use client";
// import 'driver.js/dist/driver.min.css'
import { InsertDriveFile } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { trySamples } from "../../../_mock/trySamples";
import { trackEvent } from "../../../analysers/eventTracker";
import { detectLanguage } from "../../../hooks/languageDitector";
import useResponsive from "../../../hooks/useResponsive";
import useSetState from "../../../hooks/useSetState";
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
import ParaphraseOutput from "./ParaphraseOutput";
import UpdateComponent from "./UpdateComponent";
import UserInputBox from "./UserInputBox";
import VerticalMenu from "./VerticalMenu";
import ViewInputInOutAsDemo from "./ViewInputInOutputAsDemo";

import { modes } from "../../../_mock/tools/paraphrase";
import { protectedPhrases, protectedSingleWords } from "./extentions";

const SYNONYMS = {
  20: "Basic",
  40: "Intermediate",
  60: "Advanced",
  80: "Expert",
};

const initialFrozenWords = new Set(protectedSingleWords);
const initialFrozenPhrase = new Set(protectedPhrases);

const ParaphraseContend = () => {
  const [selectedSynonyms, setSelectedSynonyms] = useState(SYNONYMS[20]);
  const [showLanguageDetect, setShowLanguageDetect] = useState(false);
  const [outputHistoryIndex, setOutputHistoryIndex] = useState(0);
  const [formatedSentences, setFormatedSentences] = useState([]);
  const [selectedMode, setSelectedMode] = useState("Standard");
  const [isOutputFoucus, setIsOutputFoucus] = useState(false);
  const [isInputFoucus, setIsInputFoucus] = useState(false);
  const [outputWordCount, setOutputWordCount] = useState(0);
  const [activeSentence, setActiveSentence] = useState(0);
  const [outputHistory, setOutputHistory] = useState([]);
  const [outputContend, setOutputContend] = useState("");
  const { user } = useSelector((state) => state.auth);
  const frozenWords = useSetState(initialFrozenWords);
  const frozenPhrases = useSetState(initialFrozenPhrase);
  const [language, setLanguage] = useState("English");
  const sampleText = trySamples.paraphrase[language || "English"];
  const [isLoading, setIsLoading] = useState(false);
  const { wordLimit } = useWordLimit("paraphrase");
  const [userInput, setUserInput] = useState("");
  // const userInputValue = useDebounce(userInput, 800);
  const [socketId, setSocketId] = useState(null);
  const [paraphrased] = useParaphrasedMutation();
  const [eventId, setEventId] = useState(null);
  const isMobile = useResponsive("down", "sm");
  const [result, setResult] = useState([]);
  const enqueueSnackbar = useSnackbar();
  const dispatch = useDispatch();
  const outputRef = useRef(null);
  const [clearInput, setClearInput] = useState(false);
  const [showMessage, setShowMessage] = useState({
    show: false,
    Component: null,
  });
  const [processing, setProcessing] = useState({
    loading: false,
    success: false,
  });

  useEffect(() => {
    if (!userInput) return;
    let timer;
    const detectLang = detectLanguage(userInput);
    if (detectLang !== language) {
      setLanguage(detectLang);
      setShowLanguageDetect(true);
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setShowLanguageDetect(false);
      }, 3000);
    }
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
      frozenWords.reset(initialFrozenWords);
      frozenPhrases.reset(initialFrozenPhrase);
      setActiveSentence(0);
      setFormatedSentences([]);
      setClearInput((prev) => !prev);
    }
    setResult([]);
    setOutputHistory([]);
  };

  const handleSubmit = async (value) => {
    try {
      // track event
      if (!value) {
        trackEvent("click", "paraphrase", "paraphrase_click", 1);
      }
      setIsLoading(true);
      setResult([]);
      setOutputHistoryIndex(0);
      setProcessing({ success: false, loading: true });

      const textAsWrodsArray = userInput
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      const finalText = textAsWrodsArray.slice(0, wordLimit).join(" ");

      // generate uniqe 10 number randomly;
      const randomNumber = Math.floor(Math.random() * 10000000000);
      setEventId(`${socketId}-${randomNumber}`);

      const payload = {
        text: finalText,
        freeze:
          frozenWords.size > 0
            ? frozenWords.values.join(", ")
            : frozenPhrases.size > 0
            ? frozenPhrases.values.join(", ")
            : "",
        language: language,
        mode: selectedMode ? selectedMode.toLowerCase() : "standard",
        synonym: selectedSynonyms ? selectedSynonyms.toLowerCase() : "basic",
        socketId,
        eventId,
      };

      await paraphrased(payload).unwrap();

      const separator = language === "Bangla" ? "। " : ". ";
      const sentences = finalText
        .split(separator)
        .map((s, i, arr) =>
          (s + (i === arr.length - 1 ? "" : separator)).trim()
        );
      setFormatedSentences(sentences);

      if (isMobile && outputRef.current) {
        outputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } catch (error) {
      const actualError = error?.data?.error;
      if (/LIMIT_REQUEST|PACAKGE_EXPIRED/.test(actualError)) {
        dispatch(setShowAlert(true));
        dispatch(setAlertMessage(error?.data?.message));
      } else if (actualError === "UNAUTHORIZED") {
        dispatch(setShowLoginModal(true));
      } else {
        enqueueSnackbar(error?.data?.message || error.message, {
          variant: "error",
        });
      }
      setProcessing({ success: false, loading: false });
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (userInputValue && !processing.loading) {
  //     handleSubmit(userInputValue);
  //   }
  // }, [userInputValue]);

  return (
    <Box>
      {/* <Onboarding/> */}
      <LanguageMenu
        isLoading={isLoading}
        setLanguage={setLanguage}
        language={language}
      />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflow: "hidden",
        }}
      >
        <Card
          sx={{
            flex: "1 1 0%",
            minWidth: 0,
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
              setShowMessage={setShowMessage}
            />
          ) : (
            <ModeNavigationForMobile
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              initialFrozenWords={initialFrozenWords}
              frozenWords={frozenWords}
              userPackage={user?.package}
            />
          )}

          <Divider sx={{ borderBottom: "2px solid", borderColor: "divider" }} />

          <Grid2 container>
            <Grid2
              sx={{
                height: isMobile ? "calc(100vh - 340px)" : 530,
                position: "relative",
                borderRight: { md: "2px solid" },
                borderRightColor: { md: "divider" },
                padding: 2,
                paddingBottom: 0,
                display: "flex",
                flexDirection: "column",
              }}
              size={{ xs: 12, md: 6 }}
            >
              <UserInputBox
                wordLimit={wordLimit}
                setUserInput={setUserInput}
                userInput={userInput}
                frozenPhrases={frozenPhrases}
                frozenWords={frozenWords}
                user={user}
                activeSentence={activeSentence}
                formatedSentences={formatedSentences}
                setActiveSentence={setActiveSentence}
                isOutputFoucus={isOutputFoucus}
                isInputFoucus={isInputFoucus}
                setIsInputFoucus={setIsInputFoucus}
                language={language}
                clearInput={clearInput}
              />

              {!userInput ? (
                <UserActionInput
                  setUserInput={setUserInput}
                  isMobile={isMobile}
                  sampleText={sampleText}
                />
              ) : null}
              <WordCounter
                btnText={outputContend ? "Rephrase" : "Paraphrase"}
                handleClearInput={handleClear}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                userInput={userInput}
                userPackage={user?.package}
                toolName='paraphrase'
                btnIcon={isMobile ? null : <InsertDriveFile />}
                sx={{ py: 0 }}
                dontDisable={true}
                sticky={320}
              />

              {showLanguageDetect && (
                <Stack
                  direction='row'
                  alignItems='center'
                  component={Paper}
                  gap={2}
                  sx={{
                    position: "absolute",
                    bottom: 80,
                    left: 20,
                    padding: 1,
                  }}
                >
                  <Typography>Detected Language: </Typography>
                  <Button variant='outlined'>{language}</Button>
                </Stack>
              )}
            </Grid2>
            {isMobile && !userInput ? null : (
              <Grid2
                size={{ xs: 12, md: 6 }}
                ref={outputRef}
                sx={{
                  height: isMobile ? "calc(100vh - 340px)" : 530,
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
                    <ViewInputInOutAsDemo
                      input={userInput}
                      wordLimit={wordLimit}
                    />
                  ) : !result.length ? (
                    <p>Paraphrased Text</p>
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
                      setOutputHistory={setOutputHistory}
                      input={userInput}
                      freezeWords={
                        frozenWords.size > 0
                          ? frozenWords.values.join(", ")
                          : frozenPhrases.size > 0
                          ? frozenPhrases.values.join(", ")
                          : ""
                      }
                      socketId={socketId}
                      language={language}
                      setProcessing={setProcessing}
                      eventId={eventId}
                      setEventId={setEventId}
                      setActiveSentence={setActiveSentence}
                      activeSentence={activeSentence}
                      isOutputFoucus={isOutputFoucus}
                      setIsOutputFoucus={setIsOutputFoucus}
                      isInputFoucus={isInputFoucus}
                    />
                    <OutputBotomNavigation
                      handleClear={handleClear}
                      outputContend={outputContend}
                      outputHistory={outputHistory}
                      outputHistoryIndex={outputHistoryIndex}
                      outputWordCount={outputWordCount}
                      proccessing={processing}
                      sentenceCount={result.length}
                      setActiveSentence={setActiveSentence}
                      setOutputHistoryIndex={setOutputHistoryIndex}
                      activeSentence={activeSentence}
                    />
                  </>
                ) : null}

                {user?.package === "free" && showMessage.show ? (
                  <UpdateComponent Component={showMessage.Component} />
                ) : null}
              </Grid2>
            )}
          </Grid2>
        </Card>
        <Box
          sx={{
            flex: "0 0 auto", // don’t grow or shrink
          }}
        >
          <VerticalMenu
            selectedMode={selectedMode}
            outputText={result}
            setOutputText={setResult}
            setSelectedMode={setSelectedMode}
            freezeWords={
              frozenWords.size > 0
                ? frozenWords.values.join(", ")
                : frozenPhrases.size > 0
                ? frozenPhrases.values.join(", ")
                : ""
            }
            text={userInput}
            selectedLang={language}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ParaphraseContend;
