"use client";
import {
  Box,
  Card,
  Grid2,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trySamples } from "../../../_mock/trySamples";
import { trackEvent } from "../../../analysers/eventTracker";
import useLoadingText from "../../../hooks/useLoadingText";
import useResponsive from "../../../hooks/useResponsive";
import useSnackbar from "../../../hooks/useSnackbar";
import {
  useGetShareAidetectorContendQuery,
  useGetUsesLimitQuery,
  useScanAidetectorMutation,
} from "../../../redux/api/tools/toolsApi";
import { setShowLoginModal } from "../../../redux/slice/auth";
import { setAlertMessage, setShowAlert } from "../../../redux/slice/tools";
import LoadingScreen from "../../../resource/LoadingScreen";
import UserActionInput from "../common/UserActionInput";
import WordCounter from "../common/WordCounter";
import OutputResult, { getColorByPerplexity } from "./OutputResult";
import SampleText from "./SampleText";
import ShareURLModal from "./ShareURLModal";

function formatNumber(number) {
  if (!number) return 0;
  const length = number.toString().length;
  if (length >= 4) {
    return number.toLocaleString("en-US");
  }
  return number.toString();
}

const AiDetector = () => {
  const [openSampleDrawer, setOpenSampleDrawer] = useState(false);
  const { themeLayout } = useSelector((state) => state.settings);
  const [showShareModal, setshowShareModal] = useState(false);
  const [outputContend, setOutputContend] = useState(null);
  const [scanAidetector] = useScanAidetectorMutation();
  const { user } = useSelector((state) => state.auth);
  const [enableEdit, setEnableEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const isMobile = useResponsive("down", "sm");
  const isMd = useResponsive("down", "md");
  const enqueueSnackbar = useSnackbar();
  const isMini = themeLayout === "mini";
  const params = useSearchParams();
  const share_id = params.get("share_id");
  const dispatch = useDispatch();
  const loadingText = useLoadingText(isLoading);
  const { data: shareContend, isLoading: isContendLoading } =
    useGetShareAidetectorContendQuery(share_id, {
      skip: !share_id,
    });
  const { data: userLimit, refetch } = useGetUsesLimitQuery({
    service: "ai-detector",
  });

  useEffect(() => {
    if (!shareContend) return;
    const data = shareContend?.result;
    if (!data) return;
    setOutputContend({
      ...data,
      aiSentences: data.sentences.filter(
        (sentence) => sentence.highlight_sentence_for_ai
      ),
      humanSentences: data.sentences.filter(
        (sentence) => !sentence.highlight_sentence_for_ai
      ),
    });
    setEnableEdit(false);
  }, [shareContend]);

  function handleClear() {
    setOutputContend(null);
    setUserInput("");
  }
  async function handleSubmit() {
    try {
      // handle edit;
      if (!enableEdit) {
        setEnableEdit(true);
        return;
      }

      //track event
      trackEvent("click", "ai-detector", "ai-detector_click", 1);

      setIsLoading(true);
      const res = await scanAidetector({ text: userInput }).unwrap();
      const data = res?.result;
      if (!data) throw { message: "Something went wrong" };
      setOutputContend({
        ...data,
        aiSentences: data.sentences.filter(
          (sentence) => sentence.highlight_sentence_for_ai
        ),
        humanSentences: data.sentences.filter(
          (sentence) => !sentence.highlight_sentence_for_ai
        ),
      });
      setEnableEdit(false);
      refetch();
    } catch (err) {
      const error = err?.data;
      if (/LIMIT_REQUEST|PACAKGE_EXPIRED/.test(error?.error)) {
        dispatch(setShowAlert(true));
        dispatch(setAlertMessage(error?.message));
      } else if (error?.error === "UNAUTHORIZED") {
        dispatch(setShowLoginModal(true));
      } else {
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleSampleText(keyName) {
    const text = trySamples.ai_detector[keyName];
    if (text) {
      setUserInput(text);
      setOpenSampleDrawer(false);
    }
  }

  if (isContendLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              position: "relative",
              height: isMobile ? 400 : 600,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {enableEdit ? (
              <TextField
                name='input'
                variant='outlined'
                rows={isMobile ? 13 : 18}
                fullWidth
                multiline
                placeholder='Enter your text here...'
                value={loadingText ? loadingText : userInput}
                onChange={(e) => setUserInput(e.target.value)}
                sx={{
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
            ) : (
              <Box sx={{ height: "100%", overflow: "auto", padding: 2 }}>
                {outputContend &&
                  outputContend.sentences.map((item, index) => (
                    <Fragment key={index}>
                      <span
                        onClick={() => setEnableEdit(true)}
                        style={{
                          backgroundColor: getColorByPerplexity(
                            item.highlight_sentence_for_ai,
                            item.perplexity
                          ),
                        }}
                      >
                        {item.sentence}
                      </span>
                    </Fragment>
                  ))}
              </Box>
            )}

            {!userInput ? (
              <>
                {!share_id ? (
                  <UserActionInput
                    setUserInput={setUserInput}
                    isMobile={isMobile}
                    disableTrySample={true}
                  />
                ) : null}
              </>
            ) : null}
            {userInput ? (
              <Box
                sx={{
                  borderTop: "1px solid",
                  borderTopColor: "divider",
                  px: 2,
                }}
              >
                <WordCounter
                  btnText={enableEdit ? "Scan" : "Edit"}
                  toolName='ai-detector'
                  userInput={userInput}
                  isLoading={isLoading}
                  handleClearInput={handleClear}
                  handleSubmit={handleSubmit}
                  userPackage={user?.package}
                  sticky={0}
                />
              </Box>
            ) : null}

            {userLimit && !userInput ? (
              <UsesLimit userLimit={userLimit} />
            ) : null}
          </Card>

          {userLimit && userInput ? <UsesLimit userLimit={userLimit} /> : null}
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          {outputContend ? (
            <OutputResult
              handleOpen={() => setshowShareModal(true)}
              outputContend={outputContend}
            />
          ) : (
            <SampleText
              handleSampleText={handleSampleText}
              isMini={isMini}
              isMobile={isMd}
              setOpen={setOpenSampleDrawer}
              isDrawer={openSampleDrawer}
            />
          )}
        </Grid2>
      </Grid2>

      {outputContend ? (
        <ShareURLModal
          open={showShareModal}
          handleClose={() => setshowShareModal(false)}
          title='AI Detection Report'
          content={outputContend}
          hashtags={["Shothik AI", "AI Detector"]}
        />
      ) : null}
    </Box>
  );
};

function UsesLimit({ userLimit }) {
  const progressPercentage = () => {
    if (!userLimit) return 0;

    const totalWords = userLimit.totalWordLimit;
    const remainingWords = userLimit.remainingWord;
    const progress = (remainingWords / totalWords) * 100;
    return progress;
  };

  return (
    <Stack sx={{ padding: 2 }} alignItems='flex-end'>
      <Box sx={{ width: { xs: 220, sm: 250 } }}>
        <LinearProgress
          sx={{ height: 6 }}
          variant='determinate'
          value={progressPercentage()}
        />
        <Typography sx={{ fontSize: { xs: 12, sm: 14 } }}>
          {formatNumber(userLimit?.totalWordLimit)} words /{" "}
          {formatNumber(userLimit?.remainingWord)} words left
        </Typography>
      </Box>
    </Stack>
  );
}

export default AiDetector;
