
// src/components/tools/paraphrase/actions/CompareTab.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Slider,
  CircularProgress,
} from "@mui/material";
import { ContentCopy, Refresh, Replay } from "@mui/icons-material";
import { modes } from "../../../../_mock/tools/paraphrase";
import useSnackbar from "../../../../hooks/useSnackbar";
import { io } from "socket.io-client";

const CompareTab = ({ selectedMode, setSelectedMode, text, selectedLang, freezeWords }) => {
  const { accessToken } = useSelector(state => state.auth);
  const enqueueSnackbar = useSnackbar();
  const synonymLevel = "basic";
  const API_BASE = process.env.NEXT_PUBLIC_PARAPHRASE_API_URI;

  const [socketId, setSocketId] = useState(null);
  const socketRef = useRef(null);
  const [suggestions, setSuggestions] = useState(
    modes.map(mode => ({
      label: mode.value,
      mode: mode.value,
      plain: "",
      sentences: [],
      loading: false,
      selected: mode.value.toLowerCase() === selectedMode?.toLowerCase(),
      eventId: null,
    }))
  );

  // initialize socket.io once
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET, { transports: ["websocket"] });
    socketRef.current = socket;
    socket.on("connect", () => {
      setSocketId(socket.id);
      if (text) startParaphrase(socket.id);
    });
    socket.on("disconnect", () => {
      setSocketId(null);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // listen for single-mode results
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const onResult = ({ eventId, mode, plain, sentences }) => {
      setSuggestions(prev =>
        prev.map(s =>
          s.eventId === eventId
            ? { ...s, plain, sentences, loading: false }
            : s
        )
      );
    };
    const onError = ({ eventId, mode, message }) => {
      setSuggestions(prev =>
        prev.map(s =>
          s.eventId === eventId
            ? { ...s, plain: "[Error]", sentences: [], loading: false }
            : s
        )
      );
      enqueueSnackbar(`Mode "${mode}" error: ${message}`, { variant: "error" });
    };

    socket.on("paraphrase-single", onResult);
    socket.on("paraphrase-single-error", onError);
    return () => {
      socket.off("paraphrase-single", onResult);
      socket.off("paraphrase-single-error", onError);
    };
  }, [enqueueSnackbar]);

  // kick off when text changes
  useEffect(() => {
    if (socketId && text) {
      startParaphrase(socketId);
    }
  }, [text]);

  // function to start one API call per mode
  const startParaphrase = (sid) => {
    const timestamp = Date.now();
    // build new suggestions with eventIds and loading
    const newSugs = modes.map(mode => ({
      label: mode.value,
      mode: mode.value,
      plain: "",
      sentences: [],
      loading: true,
      selected: mode.value.toLowerCase() === selectedMode?.toLowerCase(),
      eventId: `${sid}-${timestamp}-${mode.value}`,
    }));
    setSuggestions(newSugs);

    // fire one request per mode
    newSugs.forEach(s => {
      fetch(`${API_BASE}/paraphrase-single-mode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: JSON.stringify({
          text,
          mode: s.mode,
          synonymLevel,
          language: selectedLang,
          freezeWord: freezeWords,
          socketId: sid,
          eventId: s.eventId,
        }),
      }).catch(() => {
        // on fetch error, mark that card as error
        setSuggestions(prev =>
          prev.map(item =>
            item.eventId === s.eventId
              ? { ...item, plain: "[Error]", sentences: [], loading: false }
              : item
          )
        );
      });
    });
  };

  return (
    <Box sx={{ px: 2, py: 1 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Compare Modes
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {suggestions.map((s, i) => (
        <Card key={i} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              {s.label}
            </Typography>
            {s.loading ? (
              <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
                <CircularProgress size={20} />
                <Typography sx={{ ml: 1 }}>Loading...</Typography>
              </Box>
            ) : (
              <>
                <Typography variant="body2" gutterBottom>
                  {s.plain}
                </Typography>
                {s.sentences.map((sent, idx) => (
                  <Typography key={idx} variant="body2" sx={{ mt: 1 }}>
                    {sent}
                  </Typography>
                ))}
              </>
            )}
          </CardContent>

          {/* optional strength slider */}
          {typeof s.sliderValue === "number" && (
            <Box sx={{ px: 2 }}>
              <Slider value={s.sliderValue} size="small" sx={{ my: 1 }} />
            </Box>
          )}

          <CardActions sx={{ justifyContent: "space-between" }}>
            <Box>
              <IconButton size="small">
                <ContentCopy fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <Refresh fontSize="small" onClick={() => startParaphrase(socketId)} />
              </IconButton>
              <IconButton size="small">
                <Replay fontSize="small" onClick={() => startParaphrase(socketId)} />
              </IconButton>

            </Box>
            <Button
              onClick={() => setSelectedMode(s.label)}
              size="small"
              variant={s.selected ? "contained" : "outlined"}
            >
              {s.selected ? "Selected" : "Select"}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default CompareTab;

