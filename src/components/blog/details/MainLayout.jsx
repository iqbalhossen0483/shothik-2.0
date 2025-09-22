import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import CommentSection from "./CommentSection";
import { LikeDislike } from "./LikeDislike";
import ShareIcons from "./ShareIcons";

export default function MainLayout({ blog }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL??"https://shothik.ai"}/blogs/${blog?.slag}`;
  const title = blog?.title || "Check out this blog!";
  const hashtags = ["ShothikAI", "AIContent", "Tech"];

  return (
    <Container sx={{ mb: 6 }}>
      <Box sx={{ marginBottom: "16px" }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "bold",
            letterSpacing: "1px",
            lineHeight: "24px",
            textTransform: "uppercase",
            color: "rgb(255, 30, 255)",
            margin: "20px 0px 8px",
          }}
        >{`// ${blog?.category?.title} //`}</Typography>
        <Typography
          sx={{
            color: "text.main",
            fontSize: {
              xs: "1.2rem",
              sm: "1.4rem",
              md: "1.6rem",
              lg: "1.8rem",
            },
            fontStyle: "normal",
            fontWeight: "bold",
            letterSpacing: "-0.5px",
            lineHeight: "40px",
            wordBreak: "break-word",
            margin: "0px",
            padding: "0px",
          }}
        >
          {blog?.title}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "16px",
            lineHeight: "24px",
            margin: "8px 0px",
          }}
        >
          Updated on{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(blog?.updatedAt))}
        </Typography>
        <Box
          component={"ul"}
          sx={{
            alignItems: "center",
            color: "rgb(3, 27, 78)",
            display: "flex",
            flexFlow: "wrap",
            margin: "0px auto",
            padding: "10px 0px",
            width: "100%",
          }}
        ></Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "10px",
            marginTop: "16px",
          }}
        >
          <AvatarGroup>
            <Avatar
              alt={blog?.author?.name}
              src='/static/images/avatar/1.jpg'
            />
          </AvatarGroup>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "16px",
              letterSpacing: "0px",
              lineHeight: "24px",
              fontWeight: 500,
            }}
          >
            {blog?.author?.name
              ? blog?.author?.name
              : blog?.editorContent?.name}
          </Typography>
        </Box>
      </Box>
      <Box
        component='img'
        src={blog?.banner}
        alt={blog?.title}
        sx={{
          width: "100%",
          height: "450px",
          objectFit: "cover",
          mb: 4,
          borderRadius: 2,
          border: "solid 1px",
          borderColor: "divider",
        }}
      />

      <Typography
        sx={{
          letterSpacing: "0.1px",
          fontSize: "18px",
          fontWeight: 400,
          "& pre": {
            padding: "16px",
            borderRadius: "8px",
            overflowX: "auto",
          },
          "& code": {
            display: "block",
            fontSize: "16px",
          },
        }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <Stack sx={{ my: 10 }} alignItems='center'>
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            p: 3,
            width: { md: "70%", sm: "100%" },
          }}
        >
          <Typography>
            Thank you for being a valued member of the Shothik AI Community!
            Explore our cutting-edge AI solutions for paraphrasing, generating
            human-like content, refining grammar, and summarizing information
            with precision and clarity.
          </Typography>
          <Stack
            sx={{ color: "primary.main", mt: 1 }}
            flexDirection='row'
            gap={0.5}
            alignItems='center'
          >
            <Link href='/pricing'>Learn more about our products</Link>
            <KeyboardDoubleArrowRight fontSize='small' color='primary.main' />
          </Stack>
        </Box>
        <Card sx={{ mt: 5, p: 4, width: { md: "70%", sm: "100%" } }}>
          <Stack
            flexDirection='row'
            gap={3}
            sx={{
              borderBottom: "1px solid",
              borderBottomColor: "divider",
              pb: 2,
            }}
            flexWrap='wrap'
          >
            <Typography variant='h6'>Still looking for an answer?</Typography>
            <Link href='/blogs'>
              <Button variant='outlined'>Search for more help</Button>
            </Link>
          </Stack>
          <Stack
            sx={{ mt: 4 }}
            flexDirection='row'
            gap={1}
            alignItems='center'
            justifyContent='space-between'
            flexWrap='wrap'
            rowGap={2}
          >
            <Stack flexDirection='row' gap={1} alignItems='center'>
              <Typography sx={{ mr: 2 }} variant='h6'>
                Was this helpful?
              </Typography>
              <LikeDislike
                id={blog?._id}
                api='/blog'
                like={blog?.likes}
                dislike={blog?.dislikes}
                data={blog}
              />
            </Stack>

            <Divider
              sx={{ display: { xs: "none", sm: "block" } }}
              orientation='vertical'
              flexItem
            />

            <ShareIcons
              shareUrl={shareUrl}
              title={title}
              hashtags={hashtags}
              content={blog.content}
            />
          </Stack>
        </Card>
      </Stack>

      <CommentSection data={blog} comments={blog?.comments} />
    </Container>
  );
}
