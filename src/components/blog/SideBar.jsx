"use client";
import { ArrowRight, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  Grid2,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useResponsive from "../../hooks/useResponsive";
import { useCategoryQuery } from "../../redux/api/blog/blogApiSlice";
import CategoryBtn from "./CategoryBtn";
import SideCard from "./SideCard";
import SideMenu from "./SideMenu";

const SideBar = ({ onCategoryClick, selectedCategory }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useResponsive("down", "sm");
  const { data: categories, isLoading } = useCategoryQuery();

  const handleCategoryClick = (category) => {
    onCategoryClick(category._id);
    if (isMobile) {
      setOpen(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid2 size={{ xs: 12, md: 3 }}>
      <Box sx={{ width: 250 }}>
        {isMobile ? (
          <>
            <Button variant='contained' size='large' onClick={handleOpen}>
              Popular Topics
              <ArrowRight sx={{ ml: 1 }} />
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              fullScreen={isMobile}
              slotProps={{
                paper: {
                  sx: {
                    width: "100%",
                    height: isMobile ? "80vh" : "auto",
                    margin: 0,
                    maxWidth: "100%",
                    overflow: "hidden",
                    position: "fixed",
                    bottom: 0,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                  },
                },
              }}
            >
              <DialogContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  height: "100%",
                  padding: isMobile ? "16px" : "24px",
                }}
              >
                <IconButton
                  onClick={handleClose}
                  sx={{
                    alignSelf: "flex-end",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Close />
                </IconButton>
                <Box sx={{ width: "100%" }}>
                  <Typography variant='h6' gutterBottom>
                    All topics
                  </Typography>
                  <div>
                    {categories?.data?.length ? (
                      categories.data.map((category) => (
                        <Button
                          key={category._id}
                          sx={{
                            color: (theme) =>
                              theme.palette.mode === "dark"
                                ? "rgba(255,255,255,0.7)"
                                : "rgba(0,0,0,0.87)",
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            p: 1,
                            m: 0,
                            ":hover": {
                              bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                  ? "rgba(255,255,255,0.08)"
                                  : "rgba(0,0,0,0.04)",
                              textDecoration: "none",
                              color: (theme) =>
                                theme.palette.mode === "dark"
                                  ? "rgba(255,255,255,0.7)"
                                  : "rgba(0,0,0,0.87)",
                            },
                          }}
                          onClick={() => handleCategoryClick(category)}
                        >
                          {category.title}
                        </Button>
                      ))
                    ) : (
                      <Box>
                        <Typography>No Category found</Typography>
                      </Box>
                    )}
                  </div>
                </Box>
                <SideMenu />

                <Box sx={{ mt: 4, p: 2, bgcolor: "#f8f9fa", borderRadius: 1 }}>
                  <SideCard />
                </Box>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <Stack sx={{ maxWidth: 500 }}>
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: 1,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: 0,
                },
              }}
            >
              <CategoryBtn
                selectedCategory={selectedCategory}
                category={{ title: "All topics", _id: "" }}
                handleCategoryClick={handleCategoryClick}
              />
              <div>
                {isLoading ? (
                  <>
                    <Skeleton variant='text' width='100%' height={20} />
                    <Skeleton variant='text' width='100%' height={20} />
                    <Skeleton variant='text' width='100%' height={20} />
                    <Skeleton variant='text' width='100%' height={20} />
                    <Skeleton variant='text' width='100%' height={20} />
                    <Skeleton variant='text' width='100%' height={20} />
                    <Skeleton variant='text' width='100%' height={20} />
                    <Skeleton variant='text' width='100%' height={20} />
                  </>
                ) : !categories?.data?.length ? (
                  <Box>
                    <Typography>No Category found</Typography>
                  </Box>
                ) : (
                  categories?.data?.map((category) => (
                    <CategoryBtn
                      selectedCategory={selectedCategory}
                      key={category._id}
                      category={category}
                      handleCategoryClick={handleCategoryClick}
                    />
                  ))
                )}
              </div>
              <SideMenu />
            </Box>
            <Card sx={{ mt: 4, p: 2, borderRadius: 1 }}>
              <SideCard />
            </Card>
          </Stack>
        )}
      </Box>
    </Grid2>
  );
};

export default SideBar;
