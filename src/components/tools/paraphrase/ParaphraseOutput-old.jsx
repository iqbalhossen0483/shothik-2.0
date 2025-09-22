import styled from "@emotion/styled";
import {
  AssistantPhotoRounded,
  ChevronRight,
  Close,
  Diamond,
  InsertDriveFileRounded,
  Lock,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  tooltipClasses,
  Typography,
  useTheme,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { modes } from "../../../_mock/tools/paraphrase";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import useSnackbar from "../../../hooks/useSnackbar";
import {
  useParaphraseForTaggingMutation,
  useReportForSentenceMutation,
} from "../../../redux/api/tools/toolsApi";

const ParaphraseOutput = ({
  data,
  input,
  setData,
  synonymLevel,
  userPackage,
  selectedLang,
  highlightSentence,
  setOutputHistory,
  freezeWords,
  socketId,
  language,
  setProcessing,
  eventId,
  setEventId,
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

  const handleWordClick = (event, synonyms, sentenceIndex, wordIndex) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
    setSynonymsOptions({
      synonyms,
      sentenceIndex,
      wordIndex,
      showRephraseNav: true,
    });
    const sentenceArr = data[sentenceIndex];
    let sentence = "";
    for (let i = 0; i < sentenceArr.length; i++) {
      const word = sentenceArr[i].word;
      if (/^[.,]$/.test(word)) {
        sentence += word;
      } else {
        sentence += (sentence ? " " : "") + word;
      }
    }
    setSentence(sentence);
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

  const adJectiveVerbAdverbColor = dark ? "#ef5c47" : "#d95645";
  const nounColor = dark ? "#b6bdbd" : "#530a78";
  const phraseColor = dark ? "#b6bdbd" : "#051780";
  const hoverColor = "#2971FE";
  const freezeColor = "#006ACC";

  return (
    <Box sx={{ p: 2, flexGrow: 1, overflowY: "auto" }}>
      {data.map((sentence, index) => (
        <Typography
          component='span'
          key={index}
          sx={{
            backgroundColor:
              highlightSentence === index
                ? `${dark ? "#253241" : "#f3f7ff"}`
                : undefined,
          }}
        >
          {sentence &&
            sentence?.map((segment, i, arr) => (
              <Typography
                component='span'
                key={i}
                sx={{
                  color: /NP/.test(segment.type)
                    ? adJectiveVerbAdverbColor
                    : /VP/.test(segment.type)
                    ? nounColor
                    : /PP|CP|AdvP|AdjP/.test(segment.type)
                    ? phraseColor
                    : /freeze/.test(segment.type)
                    ? freezeColor
                    : undefined,
                  cursor: "pointer",
                  transition: "all 0.1s ease-in-out",
                  "&:hover": {
                    color: !segment.child?.length ? hoverColor : undefined,
                  },
                }}
                onClick={(event) =>
                  handleWordClick(event, segment.synonyms, index, i)
                }
              >
                {arr.length - 1 === i ||
                segment.word === "," ||
                segment.word === ";" ||
                segment?.word?.endsWith("'")
                  ? ""
                  : " "}
                {segment.word?.length > 1
                  ? segment.word?.replace(/[.।]$/, "")
                  : segment.word}
              </Typography>
            ))}
        </Typography>
      ))}

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

function Synonyms({ synonyms, open, handleClose, anchorEl, replaceSynonym }) {
  const ref = useOutsideClick(() => handleClose());

  return (
    <Popper
      anchorEl={anchorEl}
      placement='bottom-start'
      ref={ref}
      open={open}
      onClose={handleClose}
      sx={{ zIndex: 500 }}
    >
      <List
        sx={{
          minWidth: 200,
          bgcolor: "background.paper",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 22px 0px",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
      >
        {synonyms.length
          ? synonyms?.map((synonym, index) => (
              <ListItemButton
                onClick={() => replaceSynonym(synonym)}
                key={`item-${index}`}
                sx={{
                  py: 0,
                  px: "12px",
                  minHeight: 32,
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  "&:hover .arrow-icon": {
                    display: "block",
                  },
                }}
              >
                <ListItemText sx={{}} primary={`${synonym}`} />
                <ChevronRight
                  className='arrow-icon'
                  sx={{ display: "none", color: "text.secondary" }}
                />
              </ListItemButton>
            ))
          : null}
      </List>
    </Popper>
  );
}

function RephraseSentenceNav({
  open,
  anchorEl,
  handleClose,
  handleCopy,
  sendReprt,
  rephraseSentence,
}) {
  const ref = useOutsideClick(() => handleClose());

  return (
    <Popper
      ref={ref}
      placement='top-start'
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
    >
      <Paper variant='outlined'>
        <Stack
          direction='row'
          alignItems='center'
          sx={{ p: "5px" }}
          spacing={1}
        >
          <Tooltip title='See More Sentence' placement='top' arrow>
            <Button
              onClick={rephraseSentence}
              variant='outlined'
              sx={{ mb: 0 }}
              spacing={1}
              size='small'
            >
              Rephrase
            </Button>
          </Tooltip>

          <Tooltip title='Copy Sentence' placement='top' arrow>
            <IconButton
              onClick={handleCopy}
              aria-label='Copy Sentence'
              size='small'
            >
              <InsertDriveFileRounded />
            </IconButton>
          </Tooltip>
          <Tooltip title='Report Sentence' placement='top' arrow>
            <IconButton
              aria-label='Report Sentence'
              size='small'
              onClick={sendReprt}
            >
              <AssistantPhotoRounded />
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>
    </Popper>
  );
}

function RephraseSentences(props) {
  const {
    open,
    anchorEl,
    handleClose,
    userPackage,
    replaceSentence,
    setRephraseMode,
    isPending,
    rephraseData,
    rephraseMode,
  } = props;

  if (!open) return null;
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  // Styled Tooltip
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  const adJectiveVerbAdverbColor = dark ? "#ef5c47" : "#d95645";
  const nounColor = dark ? "#b6bdbd" : "#530a78";
  const phraseColor = dark ? "#b6bdbd" : "#051780";
  const hoverColor = "#2971FE";
  const freezeColor = "#006ACC";

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      placement='bottom'
      sx={{ zIndex: 500 }}
    >
      <Box
        sx={{
          maxWidth: { xs: "320px", sm: "420px", lg: "635px" },
          border: 1,
          p: 0,
          borderRadius: "5px",
          bgcolor: "background.paper",
          borderColor: "background.neutral",
        }}
      >
        <Grid2 container spacing={2} sx={{ pl: 2 }} alignItems='center'>
          <Grid2 size={{ xs: 11 }}>
            <Tabs
              value={rephraseMode}
              onChange={(_, selectedMode) => {
                // if (userPackage?.includes(selectedMode.toLocaleLowerCase())) {
                // }
                setRephraseMode(selectedMode);
              }}
              variant='scrollable'
              scrollButtons='auto'
              textColor='primary'
              sx={{
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                "& .MuiTabs-scrollButtons": {
                  width: "24px",
                  height: "24px",
                },
                "& .MuiTabs-scrollButtons.Mui-disabled": {
                  display: "none",
                },
                alignItems: "center",
              }}
            >
              {modes.map((mode, index) => {
                const isDisabled = !mode.package.includes(userPackage);

                return (
                  <Tab
                    key={index}
                    value={mode.value}
                    label={
                      isDisabled ? (
                        <HtmlTooltip
                          title={
                            <Link
                              href='/pricing'
                              style={{ textDecoration: "none" }}
                            >
                              <div
                                style={{
                                  textAlign: "center",
                                  marginBottom: "10px",
                                }}
                              >
                                <Typography variant='h6' gutterBottom>
                                  Upgrade
                                </Typography>
                                <Typography variant='body2'>
                                  Access premium modes by upgrading your plan.
                                </Typography>
                                <Button
                                  variant='contained'
                                  color='primary'
                                  sx={{ mt: 1, width: "100%" }}
                                >
                                  <Diamond fontSize='small' sx={{ mr: 1 }} />
                                  Upgrade Plan
                                </Button>
                              </div>
                            </Link>
                          }
                        >
                          <span style={{ cursor: "not-allowed" }}>
                            {mode.value}
                          </span>
                        </HtmlTooltip>
                      ) : (
                        mode.value
                      )
                    }
                    icon={
                      isDisabled ? (
                        <Lock sx={{ width: 12, height: 12 }} />
                      ) : undefined
                    }
                    iconPosition='start'
                    onClick={(e) => isDisabled && e.preventDefault()}
                    sx={{
                      color: isDisabled ? "text.disabled" : "text.primary",
                      cursor: isDisabled ? "not-allowed" : "pointer",
                    }}
                  />
                );
              })}
            </Tabs>
          </Grid2>
          <Grid2 size={{ xs: 1 }}>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Grid2>
        </Grid2>

        <List
          sx={{
            width: "100%",
            overflow: "auto",
            maxHeight: 200,
          }}
        >
          {isPending ? (
            <Box sx={{ px: 2 }}>
              <Skeleton />
              <Skeleton animation='wave' />
              <Skeleton animation={false} />
            </Box>
          ) : (
            rephraseData?.map((sentence, index) => {
              return (
                <Fragment key={index}>
                  <ListItem
                    sx={{ p: 0 }}
                    onClick={() => replaceSentence(sentence)}
                  >
                    <ListItemButton>
                      <ListItemText>
                        {sentence &&
                          sentence?.map((segment, i, arr) => (
                            <Typography
                              component='span'
                              key={i}
                              sx={{
                                color: /NP/.test(segment.type)
                                  ? adJectiveVerbAdverbColor
                                  : /VP/.test(segment.type)
                                  ? nounColor
                                  : /PP|CP|AdvP|AdjP/.test(segment.type)
                                  ? phraseColor
                                  : /freeze/.test(segment.type)
                                  ? freezeColor
                                  : undefined,
                                cursor: "pointer",
                                transition: "all 0.1s ease-in-out",
                                "&:hover": {
                                  color: hoverColor,
                                },
                              }}
                            >
                              {arr.length - 1 === i ||
                              segment.word === "," ||
                              segment?.word?.endsWith("'")
                                ? ""
                                : " "}
                              {segment.word?.length > 1
                                ? segment.word
                                    ?.replace(/[{}]/g, "")
                                    .replace(/[.।]+$/, "")
                                : segment.word}
                            </Typography>
                          ))}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </Fragment>
              );
            })
          )}
        </List>
      </Box>
    </Popper>
  );
}

export default ParaphraseOutput;
