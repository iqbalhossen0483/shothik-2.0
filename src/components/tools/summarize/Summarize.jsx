"use client";
import {
  FormatListBulleted,
  FormatTextdirectionLToRRounded,
} from "@mui/icons-material";
import { Card, Grid2, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trySamples } from "../../../_mock/trySamples";
import { trackEvent } from "../../../analysers/eventTracker";
import useLoadingText from "../../../hooks/useLoadingText";
import useResponsive from "../../../hooks/useResponsive";
import useSnackbar from "../../../hooks/useSnackbar";
import { setShowLoginModal } from "../../../redux/slice/auth";
import { setAlertMessage, setShowAlert } from "../../../redux/slice/tools";
import UserActionInput from "../common/UserActionInput";
import BottomBar from "./BottomBar";
import TopNavigations from "./TopNavigations";

const modes = [
  {
    icon: <FormatListBulleted fontSize='small' />,
    name: "Key Sentences",
  },
  {
    icon: <FormatTextdirectionLToRRounded fontSize='small' />,
    name: "Paragraph",
  },
];
const LENGTH = {
  20: "Short",
  40: "Regular",
  60: "Medium",
  80: "Long",
};

const SummarizeContend = () => {
  const [selectedMode, setSelectedMode] = useState(modes[0].name);
  const { user, accessToken } = useSelector((state) => state.auth);
  const [currentLength, setCurrentLength] = useState(LENGTH[20]);
  const [outputContend, setOutputContend] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const isMobile = useResponsive("down", "sm");
  const enqueueSnackbar = useSnackbar();
  const dispatch = useDispatch();
  const loadingText = useLoadingText(isLoading);
  const sampleText = trySamples.summarize.English;

  async function fetchWithStreaming(payload) {
    try {
      const url = process.env.NEXT_PUBLIC_API_URI + "/summarize";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw { message: error.message, error: error.error };
      }

      const stream = response.body;
      const decoder = new TextDecoderStream();
      const reader = stream.pipeThrough(decoder).getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        setOutputContend((prev) => prev + value);
      }
    } catch (error) {
      throw error;
    }
  }

  const handleSubmit = async () => {
    try {
      //track event
      trackEvent("click", "summarize", "summarize_click", 1);

      setIsLoading(true);
      setOutputContend("");

      const payload = {
        text: userInput,
        mode: selectedMode,
        length: currentLength.toLowerCase(),
      };

      await fetchWithStreaming(payload);
    } catch (error) {
      if (/LIMIT_REQUEST|PACAKGE_EXPIRED/.test(error?.error)) {
        dispatch(setShowAlert(true));
        dispatch(setAlertMessage(error?.message));
      } else if (error.error === "UNAUTHORIZED") {
        dispatch(setShowLoginModal(true));
      } else {
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  function handleInput(e) {
    const value = e.target.value;
    setUserInput(value);
  }

  function handleClear() {
    setUserInput("");
    setOutputContend("");
  }

  return (
    <Card sx={{ mt: 1, paddingX: 2, overflow: "visible" }}>
      <TopNavigations
        LENGTH={LENGTH}
        currentLength={currentLength}
        modes={modes}
        selectedMode={selectedMode}
        setCurrentLength={setCurrentLength}
        setSelectedMode={setSelectedMode}
      />
      <Grid2
        container
        sx={{ height: "cale(100vh - 200px)", overflow: "hidden" }}
        spacing={2}
      >
        <Grid2
          sx={{ height: "100%", overflowY: "auto", position: "relative" }}
          size={{ xs: 12, md: 6 }}
        >
          <TextField
            name='input'
            variant='outlined'
            minRows={isMobile ? 12 : 19}
            maxRows={isMobile ? 12 : 19}
            fullWidth
            multiline
            placeholder='Input your text here...'
            value={userInput}
            onChange={handleInput}
            sx={{
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "divider",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "divider",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "divider",
                },
              },
            }}
          />
          {!userInput ? (
            <UserActionInput
              setUserInput={setUserInput}
              isMobile={isMobile}
              sampleText={sampleText}
            />
          ) : null}
        </Grid2>
        {!userInput && isMobile ? null : (
          <Grid2
            sx={{ height: "100%", overflowY: "auto" }}
            size={{ xs: 12, md: 6 }}
          >
            <TextField
              name='input'
              variant='outlined'
              minRows={isMobile ? 12 : 19}
              maxRows={isMobile ? 12 : 19}
              fullWidth
              multiline
              placeholder='Summarized text'
              value={loadingText ? loadingText : outputContend}
              disabled
              sx={{
                flexGrow: 1,
                color: "text.primary",
                "& .MuiOutlinedInput-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "divider",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "divider",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "divider",
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    color: "inherit",
                    WebkitTextFillColor: "inherit",
                    opacity: 1,
                  },
                  color: "text.primary",
                },
              }}
            />
          </Grid2>
        )}
      </Grid2>
      <BottomBar
        handleClear={handleClear}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        outputContend={outputContend}
        userInput={userInput}
        userPackage={user?.package}
      />
    </Card>
  );
};

export default SummarizeContend;
