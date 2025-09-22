import {
  Box,
  Card,
  CardContent,
  Grid2,
  Pagination,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useGetBlogsQuery } from "../../redux/api/blog/blogApiSlice";
import BlogHeader from "./BlogHeader";
import BlogLoading from "./BlogLoading";

const MainContend = ({ selectedCategory, page, setPage, children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounce(searchQuery);
  const options = { page, selectedCategory, debouncedValue };
  const { data: blogs, isLoading } = useGetBlogsQuery(options);
  const totalPages = blogs?.totalPages || 1;

  return (
    <Grid2 size={{ xs: 12, md: 9 }}>
      <BlogHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Typography variant='h5' sx={{ mb: 3 }}>
        Results
      </Typography>

      {/* Blog Cards */}
      <Grid2 container spacing={3}>
        {isLoading ? (
          <BlogLoading />
        ) : !blogs.data?.length ? (
          <NoBlogFound />
        ) : (
          blogs.data?.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        )}
      </Grid2>

      {/* Pagination */}
      {totalPages > 1 ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color='primary'
          />
        </Box>
      ) : null}

      {children}
    </Grid2>
  );
};

function BlogCard({ blog }) {
  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={blog._id}>
      <Link href={`/blogs/${blog.slag}`} style={{ textDecoration: "none" }}>
        <Card
          sx={{
            height: "100%",
            boxShadow: 3,
            borderRadius: 2,
            overflow: "hidden",
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          <CardContent>
            <Typography
              variant='body2'
              color='primary.main'
              fontWeight='bold'
              marginBottom={2}
            >
              // {blog.category?.title || "Blog"} //
            </Typography>
            <Typography variant='h6' gutterBottom>
              {blog.title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(blog.updatedAt))}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid2>
  );
}

function NoBlogFound() {
  return (
    <Box sx={{ py: 5, textAlign: "center", width: "100%" }}>
      <Typography variant='h6' color='text.secondary'>
        No blogs found.
      </Typography>
    </Box>
  );
}

export default MainContend;
