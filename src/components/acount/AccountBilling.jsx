import { Box, Button, Card, Grid2, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import { useGetTransectionHistoryQuery } from "../../redux/api/auth/authApi";
import SvgColor from "../../resource/SvgColor";

export default function AccountBilling({ user }) {
  const { data } = useGetTransectionHistoryQuery();
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  if(!user) return null;

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 5, lg: 4 }}>
        <Card sx={{ p: 2 }}>
          <Typography
            variant='overline'
            sx={{ mb: 3, display: "block", color: "text.secondary" }}
          >
            Your Plan
          </Typography>

          {user?.package ? (
            <Box
              sx={{
                my: 3,
                display: "flex",
                gap: 1,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                color='primary'
                sx={{
                  fontSize: 20,
                  textTransform: "capitalize",
                  fontWeight: 600,
                }}
              >
                {user?.package.replace("_", " ")}
              </Typography>
              {user?.package !== "unlimited" ? (
                <Box>
                  <Link href='/pricing'>
                    <Button
                      color='primary'
                      size='small'
                      variant='contained'
                      rel='noopener'
                      startIcon={
                        <SvgColor
                          src='/navbar/diamond.svg'
                          sx={{
                            width: { xs: 16, md: 20 },
                            height: { xs: 16, md: 20 },
                          }}
                        />
                      }
                    >
                      Upgrade Plan
                    </Button>
                  </Link>
                </Box>
              ) : null}
            </Box>
          ) : null}
          <Typography textAlign='center'>
            Check out{" "}
            <Typography
              color='primary'
              sx={{ textDecoration: "none" }}
              component={Link}
              href='/pricing'
            >
              our plans
            </Typography>{" "}
            and find your perfect fit.
          </Typography>
        </Card>
      </Grid2>
      <Grid2 size={{ xs: 12, lg: 6 }}>
        {data?.length ? (
          <Card sx={{ p: 2 }}>
            <Typography
              variant='overline'
              sx={{ mb: 3, display: "block", color: "text.secondary" }}
            >
              Invoice History
            </Typography>

            {data.map((invoice) => (
              <Card
                sx={{
                  backgroundColor: dark ? "#3e524c" : "#ebf8f4",
                  color: dark ? "#c3d0db" : "#637381",
                }}
                key={invoice._id}
              >
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  sx={{
                    px: 2,
                    py: 1,
                    borderBottom: "1px solid",
                    borderBottomColor: "divider",
                    fontWeight: 600,
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      color: dark ? "white" : "black",
                    }}
                  >
                    {user.package.replace("_", " ")}
                  </Typography>
                  <Typography
                    sx={{
                      color: "primary.main",
                      backgroundColor: "white",
                      borderRadius: 10,
                      paddingY: 0.5,
                      paddingX: 1.5,
                    }}
                  >
                    {invoice.status === "success" ? "Active" : invoice.status}
                  </Typography>
                </Stack>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  sx={{ px: 2, py: 1 }}
                >
                  <Box>
                    <Typography>
                      Payment date:{" "}
                      <Typography fontWeight={500} component='span'>
                        {new Date(invoice._date).toLocaleDateString()}
                      </Typography>{" "}
                    </Typography>
                    <Typography>
                      Expired date:{" "}
                      <Typography fontWeight={500} component='span'>
                        {new Date(invoice.validTil).toLocaleDateString()}
                      </Typography>{" "}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={500} textAlign='center'>
                      {invoice.amount}
                      {invoice.paymentMethod === "bkash"
                        ? "৳"
                        : invoice.paymentMethod === "razorpay"
                        ? "₹"
                        : "$"}
                    </Typography>
                    <Button variant='text'>Download</Button>
                  </Box>
                </Stack>
              </Card>
            ))}
          </Card>
        ) : null}
      </Grid2>
    </Grid2>
  );
}
