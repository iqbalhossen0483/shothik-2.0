import { Card, CardContent, Grid2, Skeleton, Stack } from "@mui/material";

const BlogLoading = () => {
  return (
    <Grid2
      container
      spacing={3}
      sx={{ py: 5, textAlign: "center", width: "100%" }}
    >
      {[1, 2, 3].map((item) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item}>
          <Card
            sx={{
              height: "100%",
              boxShadow: 3,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardContent>
              <Skeleton variant='rectangular' width='100%' height={140} />
              <Stack spacing={1} sx={{ mt: 2 }}>
                <Skeleton variant='text' width='60%' />
                <Skeleton variant='text' width='80%' />
                <Skeleton variant='text' width='40%' />
              </Stack>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default BlogLoading;
