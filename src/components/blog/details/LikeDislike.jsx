"use client";
import {
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refetchBlogDetails } from "../../../app/actions";
import useSnackbar from "../../../hooks/useSnackbar";
import {
  useDisLikeContendMutation,
  useLikeContendMutation,
} from "../../../redux/api/blog/blogApiSlice";
import { setShowLoginModal } from "../../../redux/slice/auth";

export function LikeDislike({ id, api, like, dislike, size = "30px", slug }) {
  const enqueueSnackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [likeContend] = useLikeContendMutation();
  const [disLikeContend] = useDisLikeContendMutation();
  const dispatch = useDispatch();
  const userId = user._id;

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!userId) {
      return dispatch(setShowLoginModal(true));
    }
    setLoading(true);
    try {
      await likeContend({ api, id, body: { userId } }).unwrap();
      const result = await refetchBlogDetails(slug);
      if (result.success) {
        enqueueSnackbar("Liked successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Unable to like", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Unable to like", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDislike = async (e) => {
    e.stopPropagation();
    if (!userId) {
      return dispatch(setShowLoginModal(true));
    }
    setLoading(true);
    try {
      await disLikeContend({ api, id, body: { userId } }).unwrap();
      const result = await refetchBlogDetails(slug);
      if (result.success) {
        enqueueSnackbar("Disliked successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Unable to dislike", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Unable to dislike", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack flexDirection='row' alignItems='center' gap={1}>
      <Stack flexDirection='row' alignItems='center' gap={0.5}>
        {like?.includes(userId) ? (
          <ThumbUpAlt
            sx={{
              height: size,
              width: size,
              color: "primary.main",
            }}
          />
        ) : (
          <ThumbUpOffAlt
            onClick={handleLike}
            sx={{
              height: size,
              width: size,
              color: "primary.main",
              cursor: "pointer",
            }}
            disabled={loading}
          />
        )}
        <Typography align='center' fontWeight={"700"} color='primary.main'>
          {like?.length || 0}
        </Typography>
      </Stack>
      <Stack flexDirection='row' alignItems='center' gap={0.5}>
        {dislike?.includes(userId) ? (
          <ThumbDownAlt
            sx={{
              height: size,
              width: size,
              color: "warning.main",
            }}
          />
        ) : (
          <ThumbDownOffAlt
            onClick={handleDislike}
            sx={{
              height: size,
              width: size,
              color: "warning.main",
              cursor: "pointer",
            }}
            disabled={loading}
          />
        )}
        <Typography align='center' fontWeight={"700"} color='warning.main'>
          {dislike?.length || 0}
        </Typography>
      </Stack>
    </Stack>
  );
}
