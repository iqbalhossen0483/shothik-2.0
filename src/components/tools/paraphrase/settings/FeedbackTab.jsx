
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert
} from "@mui/material";

const FeedbackTab = () => {
  // grab user & token from your auth slice
  const { user, accessToken } = useSelector((state) => state.auth);

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [success, setSuccess]   = useState(null);

  const handleSubmit = async () => {
    // simple client-side validation
    if (!feedback.trim()) {
      setError('Please write some feedback before submitting.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PARAPHRASE_API_URI}/feedback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ message: feedback })
        }
      );

      if (!res.ok) {
        const data = await res.json();
        // server might return { error: '...' }
        throw new Error(data.error || 'Failed to submit feedback.');
      }

      setSuccess('Thank you for your feedback!');
      setFeedback('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="feedback_tab">
      <Typography variant="h6" fontWeight="bold">
        Feedback
      </Typography>
      <Typography variant="body2" fontWeight="medium" gutterBottom>
        Are you happy with our service?
      </Typography>
      <Typography variant="body2" gutterBottom>
        What do you think about the paraphrasing tool?
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <TextField
        fullWidth
        size="small"
        placeholder="Write feedback..."
        multiline
        rows={4}
        sx={{ mb: 2 }}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        disabled={loading}
      />

      <Button
        variant="contained"
        color="success"
        onClick={handleSubmit}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
        <Image
          src="/moscot.png"
          alt="moscot"
          width={120}
          height={120}
          objectFit="contain"
        />
      </Box>
    </Box>
  );
};

export default FeedbackTab;

