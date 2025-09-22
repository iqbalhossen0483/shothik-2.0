
// HistoryTab.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Divider,
  IconButton
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Refresh,
  Delete
} from "@mui/icons-material";

const HistoryTab = () => {
  const [historyGroups, setHistoryGroups] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});
  const { accessToken } = useSelector((state) => state.auth);

  const API_BASE = process.env.NEXT_PUBLIC_PARAPHRASE_API_URI;

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/history`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });
      if (!res.ok) throw new Error('Failed to fetch history');
      const data = await res.json();
      setHistoryGroups(data);

      // Initialize all groups as expanded
      const init = {};
      data.forEach(group => { init[group.period] = true; });
      setExpandedGroups(init);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Are you sure you want to clear all history?')) return;
    try {
      const res = await fetch(`${API_BASE}/history`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });
      if (!res.ok) throw new Error('Failed to delete history');
      setHistoryGroups([]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const toggleGroup = (period) => {
    setExpandedGroups(prev => ({
      ...prev,
      [period]: !prev[period],
    }));
  };

  return (
    <Box sx={{ px: 2, py: 1 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          History
        </Typography>
        <Box>
          <IconButton size="small" onClick={fetchHistory}>
            <Refresh fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleDeleteAll}>
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Period groups */}
      {historyGroups.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No history entries.
        </Typography>
      ) : (
        historyGroups.map(({ period, history }) => (
          <Box key={period} sx={{ mb: 2 }}>
            <Box
              onClick={() => toggleGroup(period)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                mb: 1
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                {period}
              </Typography>
              {expandedGroups[period]
                ? <ExpandLess fontSize="small" />
                : <ExpandMore fontSize="small" />
              }
            </Box>
            <Divider />
            {expandedGroups[period] && history.map((entry, i) => (
              <Box
                key={i}
                sx={{
                  pt: 1,
                  pb: i < history.length - 1 ? 1 : 0,
                  borderBottom: i < history.length - 1 ? 1 : 0,
                  borderColor: "divider",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {new Date(entry.time).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
                <Typography variant="body2">
                  {entry.text}
                </Typography>
              </Box>
            ))}
          </Box>
        ))
      )}
    </Box>
  );
};

export default HistoryTab;

