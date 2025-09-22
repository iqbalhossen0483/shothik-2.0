import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useSnackbar from "../../hooks/useSnackbar";
import { useNewsletterMutation } from "../../redux/api/blog/blogApiSlice";

const NewsLetter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsletter] = useNewsletterMutation();
  const enqueueSnackbar = useSnackbar();
  const [email, setEmail] = useState("");

  async function handlenewLatter(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (!email) {
        enqueueSnackbar("Please enter your email address.", {
          variant: "error",
        });
        return;
      }
      await newsletter({ email }).unwrap();
      enqueueSnackbar("Thank you for subscribing to our newsletter!", {
        variant: "success",
      });
      setEmail("");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.data?.message || "Something went wrong", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Box onSubmit={handlenewLatter} component='form' sx={{ mt: 10 }}>
      <Typography variant='h6' gutterBottom>
        Get our newsletter
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Stay up to date by signing up for Shothik AI's Infrastructure as a
        Newsletter.
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='Email address'
          size='small'
          sx={{ flexGrow: 1 }}
        />
        <Button
          disabled={isLoading}
          type='submit'
          variant='contained'
          color='primary'
          sx={{ textTransform: "none" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default NewsLetter;
