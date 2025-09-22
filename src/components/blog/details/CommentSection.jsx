"use client";
import { DeleteOutline } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { refetchBlogDetails } from "../../../app/actions";
import useSnackbar from "../../../hooks/useSnackbar";
import {
  usePostCommentMutation,
  useRemoveCommentMutation,
} from "../../../redux/api/blog/blogApiSlice";
import TipTapEditor from "../../../resource/editor/TipTapEditor";
import { LikeDislike } from "./LikeDislike";

export default function CommentSection({ comments, data }) {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const enqueueSnackbar = useSnackbar();
  const [comment, setComment] = useState("");
  const [postComment] = usePostCommentMutation();
  const [removeComment] = useRemoveCommentMutation();
  const isPending = false;

  const handleRemoveComment = async (e, commentId) => {
    try {
      setLoading(true);
      e.stopPropagation();

      const confirm = window.confirm("Are you sure to remove?");
      if (!confirm) return;

      await removeComment(commentId).unwrap();
      const result = await refetchBlogDetails(data.slag);
      if (result.success) {
        enqueueSnackbar("Comment removed successfully");
      } else {
        throw { message: "Unable to remove. Try again" };
      }
    } catch (error) {
      enqueueSnackbar("Unable to remove. Try again", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      const payload = {
        blogId: data._id,
        user: user._id,
        content: comment,
        createdAt: new Date(),
      };
      if (!comment || comment === "<p></p>") {
        return;
      }
      await postComment(payload).unwrap();
      const result = await refetchBlogDetails(data.slag);
      if (result.success) {
        setComment("");
        enqueueSnackbar("Your comment placed successfully");
      } else {
        throw { message: "Unable to place comment" };
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Unable to place comment", { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Box
        sx={{
          borderBottom: "4px solid",
          borderColor: "divider",
          flex: "0 0 auto",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Button
          sx={{
            backgroundColor: "transparent",
            color: (theme) =>
              theme.palette.mode === "dark" ? "#d4d4d4" : "#1e1e1e",
            borderRadius: "0px",
            borderBottomWidth: "4px",
            borderBottomStyle: "solid",
            borderBottomColor: "primary.main",
            borderTopLeftRadius: "7px",
            borderTopRightRadius: "7px",
            padding: "15px 20px",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
            },
            mb: "-4px",
          }}
        >
          Comments
        </Button>
      </Box>
      <Typography variant='h4' gutterBottom>
        Leave a comment
      </Typography>

      <TipTapEditor content={comment} onChange={(value) => setComment(value)} />

      <Button
        disabled={isPending || !comment || comment === "<p></p>"}
        variant='contained'
        sx={{
          width: "100px",
          ml: "auto",
          mt: "10px",
          mb: "15px",
        }}
        onClick={onSubmit}
      >
        Comment
      </Button>

      <Box>
        {comments?.map((comment) => (
          <Accordion
            key={comment._id}
            defaultExpanded
            variant='outlined'
            sx={{
              mt: "1rem",
              borderRadius: "8px",
              "&:before": {
                backgroundColor: "transparent",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel3-content'
              id='panel3-header'
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    component='span'
                    color={"primary"}
                    fontWeight={"500"}
                  >
                    {comment?.user?.name}
                  </Typography>
                  <Typography
                    component='span'
                    width={"5px"}
                    height={"5px"}
                    fontWeight={"900"}
                    bgcolor={"black"}
                    borderRadius={"100%"}
                    alignSelf={"center"}
                    mx='4px'
                  ></Typography>
                  <Typography component='span' fontSize={"0.9rem"}>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(new Date(comment?.createdAt))}
                  </Typography>
                </Box>

                <Stack flexDirection='row' alignItems='center' gap={1}>
                  <LikeDislike
                    api='/blog/comment'
                    id={comment._id}
                    dislike={comment.dislikes}
                    like={comment.likes}
                    size='20px'
                    slug={data.slag}
                  />
                  {user?._id === comment?.user?._id && (
                    <DeleteOutline
                      onClick={(e) => handleRemoveComment(e, comment._id)}
                      disabled={loading}
                      sx={{
                        height: "20px",
                        width: "20px",
                        objectFit: "contain",
                        color: "orangered",
                      }}
                    />
                  )}
                </Stack>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ mt: "-2rem" }}>
              <Typography
                dangerouslySetInnerHTML={{ __html: comment?.content }}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
