
// src/components/tools/paraphrase/actions/PlagiarismTab.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Divider,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import useSnackbar from "../../../../hooks/useSnackbar";
import { io } from "socket.io-client";

const PlagiarismTab = ({ text, selectedLang, freezeWords }) => {
  const { accessToken } = useSelector(state => state.auth);
  const enqueueSnackbar = useSnackbar();
  const API_BASE = process.env.NEXT_PUBLIC_PARAPHRASE_API_URI;

  const [socketId, setSocketId] = useState(null);
  const socketRef = useRef(null);
  const eventIdRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [results, setResults] = useState([]);

  // 1) Initialize socket once
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET, { transports: ["websocket"] });
    socketRef.current = socket;
    socket.on("connect", () => setSocketId(socket.id));
    socket.on("disconnect", () => setSocketId(null));
    return () => {
      socket.disconnect();
    };
  }, []);

  // 2) Listen for plagiarism-result events
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleResult = ({ eventId, summary, matches = [], score: s }) => {
      if (eventId !== eventIdRef.current) return;
      setLoading(false);

      // Determine numeric score
      if (typeof s === 'number') {
        setScore(s);
      } else {
        const m = summary.match(/\((\d+)%\)/);
        setScore(m ? parseInt(m[1], 10) : 0);
      }

      // Format match results
      const formatted = matches.map(m => ({
        percent: Math.round(m.score * 100),
        source: m.author || "Unknown",
      }));
      setResults(formatted);
    };

    const handleError = ({ eventId, message }) => {
      if (eventId !== eventIdRef.current) return;
      setLoading(false);
      setScore(0);
      setResults([]);
      enqueueSnackbar(`Plagiarism check error: ${message}`, { variant: 'error' });
    };

    socket.on("plagiarism-result", handleResult);
    socket.on("plagiarism-result-error", handleError);
    return () => {
      socket.off("plagiarism-result", handleResult);
      socket.off("plagiarism-result-error", handleError);
    };
  }, [enqueueSnackbar]);

  // 3) Trigger the async plagiarism check when `text` changes (and when socketId becomes available)
  useEffect(() => {
    if (!text || !socketId) return;

    setLoading(true);
    setScore(null);
    setResults([]);

    const eid = `${socketId}-${Date.now()}`;
    eventIdRef.current = eid;

    fetch(`${API_BASE}/check-plagiarism-async`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify({
        text,
        token: accessToken,
        socketId,
        eventId: eid,
      }),
    }).catch(err => {
      setLoading(false);
      enqueueSnackbar(err.message, { variant: 'error' });
    });
  }, [text, socketId]);

  return (
    <Box sx={{ px: 2, py: 1 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Plagiarism Checker
      </Typography>
      <Divider sx={{ my: 2 }} />

      {/* score card */}
      <Paper
        variant="outlined"
        sx={{
          bgcolor: loading ? 'grey.100' : 'success.light',
          p: 2,
          mb: 2,
          textAlign: "center",
          minHeight: 100,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h2">
              {score != null ? `${score}%` : '--'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Plagiarism
            </Typography>
          </>
        )}
      </Paper>

      {/* results list */}
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Results ({results.length})
      </Typography>

      {results.map((r, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            p: 1,
            mb: 1,
          }}
        >
          <Typography variant="body2" sx={{ width: "20%" }}>
            {r.percent}%
          </Typography>
          <Typography
            variant="body2"
            sx={{ flex: 1, textAlign: "center", ml: 1 }}
          >
            {r.source}
          </Typography>
          <IconButton size="small">
            <ExpandMore fontSize="small" />
          </IconButton>
        </Box>
      ))}

      {(!loading && results.length === 0) && (
        <Typography variant="body2" color="text.secondary">
          No matches found.
        </Typography>
      )}
    </Box>
  );
};

export default PlagiarismTab;

