"use client";
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
import LanguageMenu from "./LanguageMenu";

const Translator = () => {
  const [outputContend, setOutputContend] = useState("");
  const { user, accessToken } = useSelector((state) => state.auth);
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const isMobile = useResponsive("down", "sm");
  const enqueueSnackbar = useSnackbar();
  const dispatch = useDispatch();
  const loadingText = useLoadingText(isLoading);
  const sampleText = trySamples.translator.English;
  const [translateLang, setTranslateLang] = useState({
    fromLang: "Auto Detect",
    toLang: "English",
  });

  function handleInput(e) {
    const value = e.target.value;
    setUserInput(value);
  }

  function handleClear() {
    setUserInput("");
    setOutputContend("");
  }

  async function fetchWithStreaming(payload, api = "/translator") {
    try {
      const url = process.env.NEXT_PUBLIC_API_URI + api;
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

  async function handleSubmit(payloads, url) {
    try {
      //track event
      trackEvent("click", "translator", "translator_click", 1);

      setOutputContend("");
      setIsLoading(true);
      const direction = translateLang.fromLang + " to " + translateLang.toLang;
      const payload = payloads ? payloads : { data: userInput, direction };

      await fetchWithStreaming(payload, url);
    } catch (error) {
      if (/LIMIT_REQUEST|PACAKGE_EXPIRED/.test(error?.error)) {
        dispatch(setShowAlert(true));
        dispatch(setAlertMessage(error?.message));
      } else if (error?.error === "UNAUTHORIZED") {
        dispatch(setShowLoginModal(true));
      } else {
        enqueueSnackbar(error?.message, { variant: "error" });
      }
      setOutputContend("");
    } finally {
      setIsLoading(false);
    }
  }

  const handleHumanize = async () => {
    try {
      setIsHumanizing(true);
      const payload = {
        data: outputContend,
        language: translateLang.toLang,
        mode: "Fixed",
        synonym: "Basic",
      };
      await handleSubmit(payload, "/fix-grammar");

      enqueueSnackbar("Translation humanized successfully.", {
        variant: "success",
      });
    } catch (err) {
      const error = err?.response?.data;
      if (/LIMIT_REQUEST|PACAKGE_EXPIRED/.test(error?.error)) {
        dispatch(setShowAlert(true));
        dispatch(setAlertMessage("Humanize limit exceeded, Please upgrade"));
      } else if (error?.error === "UNAUTHORIZED") {
        dispatch(setShowLoginModal(true));
      } else {
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    } finally {
      setIsHumanizing(false);
    }
  };

  function reverseText() {
    if (!outputContend) return;
    const input = userInput;
    setUserInput(outputContend);
    setOutputContend(input);
  }

  return (
    <Card sx={{ mt: 1, paddingX: 2, paddingTop: 2 }}>
      <LanguageMenu
        isLoading={isLoading || isHumanizing}
        userInput={userInput}
        reverseText={reverseText}
        translateLang={translateLang}
        setTranslateLang={setTranslateLang}
      />

      <Grid2 container spacing={2}>
        <Grid2
          sx={{
            height: { xs: 400, sm: 480 },
            overflowY: "auto",
            position: "relative",
          }}
          size={{ xs: 12, md: 6 }}
        >
          <TextField
            name='input'
            variant='outlined'
            rows={isMobile ? 15 : 19}
            fullWidth
            multiline
            placeholder={"Input your text here..."}
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
        {isMobile && !userInput ? null : (
          <Grid2
            sx={{ height: { xs: 400, sm: 480 }, overflowY: "auto" }}
            size={{ xs: 12, md: 6 }}
          >
            <TextField
              name='output'
              variant='outlined'
              rows={isMobile ? 15 : 19}
              fullWidth
              multiline
              placeholder={"Translated text"}
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
        handleHumanize={handleHumanize}
        handleSubmit={handleSubmit}
        isHumanizing={isHumanizing}
        isLoading={isLoading}
        outputContend={outputContend}
        userInput={userInput}
        userPackage={user?.package}
      />
    </Card>
  );
};

export default Translator;
