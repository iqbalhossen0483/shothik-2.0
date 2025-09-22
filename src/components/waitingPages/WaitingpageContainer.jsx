import { Box, Container, Typography } from "@mui/material";

const WaitingpageContainer = ({ children, title }) => {
  return (
    <Container sx={{ py: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Logo */}
        <Box
          component='img'
          src='/moscot.png'
          alt='Logo'
          sx={{ mb: 2 }}
          height={80}
        />

        {/* Subtitle */}
        <Typography
          variant='subtitle2'
          sx={{
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            mb: 1,
            color: "text.secondary",
          }}
        >
          Shothik AI
        </Typography>

        {/* Main Heading */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant='h4'
            component='h1'
            sx={{
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Join the waitlist for the <br />
            <Box
              component='span'
              sx={{
                background: "linear-gradient(90deg, #00A76F 50%, #0B4D42 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: {
                  xs: 32,
                  sm: 40,
                  md: 48,
                  lg: 52,
                },
                fontWeight: 700,
              }}
            >
              {title}
            </Box>
          </Typography>
        </Box>
        {children}
      </Box>
    </Container>
  );
};

export default WaitingpageContainer;
