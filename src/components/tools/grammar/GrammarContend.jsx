"use client";
import { Card, Grid2, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trySamples } from "../../../_mock/trySamples";
import { trackEvent } from "../../../analysers/eventTracker";
import { detectLanguage } from "../../../hooks/languageDitector";
import useLoadingText from "../../../hooks/useLoadingText";
import useResponsive from "../../../hooks/useResponsive";
import useSnackbar from "../../../hooks/useSnackbar";
import { setShowLoginModal } from "../../../redux/slice/auth";
import { setAlertMessage, setShowAlert } from "../../../redux/slice/tools";
import UserActionInput from "../common/UserActionInput";
import BottomContend from "./BottomContend";
import LanguageMenu from "./LanguageMenu";

const GrammarContend = () => {
  const { user, accessToken } = useSelector((state) => state.auth);
  const [outputContend, setOutputContend] = useState("");
  const [language, setLanguage] = useState("English");
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const isMobile = useResponsive("down", "sm");
  const [errors, setErrors] = useState([]);
  const enqueueSnackbar = useSnackbar();
  const dispatch = useDispatch();
  const loadingText = useLoadingText(isLoading);
  const sampleText = trySamples.grammar[language];

  useEffect(() => {
    if (!userInput) return;
    const language = detectLanguage(userInput);
    setLanguage(language);
  }, [userInput]);

  function handleInput(e) {
    const value = e.target.value;
    setUserInput(value);
  }

  function handleClear() {
    setUserInput("");
    setOutputContend("");
    setErrors([]);
  }

  async function fetchWithStreaming(payload) {
    try {
      const url = process.env.NEXT_PUBLIC_API_URI + "/fix-grammar";
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
  async function handleSubmit() {
    try {
      setIsLoading(true);
      setOutputContend("");

      //track event
      trackEvent("click", "grammar", "grammar_fixed_click", 1);

      const payload = {
        data: userInput,
        language,
        mode: "Fixed",
        synonym: "Basic",
      };
      await fetchWithStreaming(payload);
      setErrors([]);
    } catch (error) {
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

  return (
    <Card sx={{ mt: 1, paddingX: 2, paddingTop: 1 }}>
      <LanguageMenu
        isLoading={isLoading}
        setLanguage={setLanguage}
        language={language}
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
            fullWidth
            multiline
            rows={isMobile ? 15 : 19}
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
        {isMobile && !userInput ? null : (
          <Grid2
            sx={{ height: { xs: 400, sm: 480 }, overflowY: "auto" }}
            size={{ xs: 12, md: 6 }}
          >
            <TextField
              name='input'
              variant='outlined'
              rows={isMobile ? 15 : 19}
              fullWidth
              multiline
              placeholder='Corrected output'
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
      <BottomContend
        handleClear={handleClear}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        outputContend={outputContend}
        userInput={userInput}
        userPackage={user?.package}
        language={language}
        errors={errors}
        setErrors={setErrors}
      />
    </Card>
  );
};

export default GrammarContend;
