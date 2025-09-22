"use client";

import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginModal } from "../../redux/slice/auth";

export default function SideCard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <Typography fontWeight={700} sx={{ mb: 1 }}>
        {user?.email
          ? user.package === "free"
            ? "Unlock Premium Features and Enhance Your Experience with Shothik AI"
            : "Explore All Features and Enhance Your Experience with Shothik AI"
          : "Sign up for free to access all features"}
      </Typography>
      <Typography color='text.secondary' sx={{ mb: 2, fontSize: "12px" }}>
        {(!user?.email || user?.package === "free") &&
          "Unlock the full potential of Shothik AI."}{" "}
        Experience AI-powered paraphrasing, human-like content generation,
        grammar refinement, and precise summarization to enhance your writing
        effortlessly.
      </Typography>
      <Button
        onClick={() => {
          if (user?.email) {
            router.push("/paraphrase");
          } else {
            dispatch(setShowLoginModal(true));
          }
        }}
        variant='contained'
        color='primary'
        fullWidth
        sx={{ textTransform: "none" }}
      >
        {user?.email ? "Explore the features" : "Sign up for free"}
      </Button>
    </>
  );
}
