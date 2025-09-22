import { Box, Typography } from "@mui/material";
import MainLayout from "../../../../components/blog/details/MainLayout";

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/blog/${slug}`);
    const blogData = await res.json();

    if (!blogData?.data) {
      return {
        title: "Blog Not Found | Shothik AI",
        description: "Blog not found",
      };
    }
    const blog = blogData.data;

    const metaTitle =
      blog?.metaTitle || blog?.title || "Shothik AI blog section";
    const metaDescription =
      blog?.metaDescription ||
      blog?.content?.slice(0, 150)?.replace(/\u003e|\u003ch2/g, "") ||
      "Shothik AI blog section";
    const metaKeywords =
      blog?.metaKeywords || "Shothik AI, Paraphrase, Humanize contend";
    const metaImage = blog?.banner;

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeywords,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        images: [metaImage],
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blogs/${slug}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
        images: [metaImage],
      },
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      title: "Error | Shothik AI",
      description: "Error fetching blog data",
    };
  }
}

const BlogDetails = async ({ params }) => {
  let blog = null;
  try {
    const { slug } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/blog/${slug}`);
    const blogData = await res.json();

    if (!blogData?.data) {
      return (
        <Box sx={{ py: 5, textAlign: "center", width: "100%" }}>
          <Typography variant='h6' color='text.secondary'>
            No blogs found.
          </Typography>
        </Box>
      );
    }
    blog = blogData.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return (
      <Box sx={{ py: 5, textAlign: "center", width: "100%" }}>
        <Typography variant='h6' color='text.secondary'>
          Error loading blog
        </Typography>
      </Box>
    );
  }

  return <MainLayout blog={blog} />;
};

export default BlogDetails;
