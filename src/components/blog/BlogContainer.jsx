"use client";
import { Grid2 } from "@mui/material";
import { useState } from "react";
import BottomCard from "./BottomCard";
import MainContend from "./MainContend";
import NewsLetter from "./NewsLetter";
import SideBar from "./SideBar";

const BlogContainer = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (id) => {
    setPage(1);
    setSelectedCategory(id);
  };

  return (
    <Grid2 container spacing={5}>
      <SideBar
        onCategoryClick={handleCategoryClick}
        selectedCategory={selectedCategory}
      />

      <MainContend
        page={page}
        selectedCategory={selectedCategory}
        setPage={setPage}
      >
        <NewsLetter />
        <BottomCard />
      </MainContend>
    </Grid2>
  );
};

export default BlogContainer;
