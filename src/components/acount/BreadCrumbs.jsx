import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";

export default function Breadcrumb({ links, heading, activeLast }) {
  return (
    <Stack direction='row' alignItems='center'>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h5' gutterBottom>
          {heading}
        </Typography>

        {/* BREADCRUMBS */}
        <Breadcrumbs separator={<Separator />}>
          {links.map((link) => (
            <Typography
              sx={{
                typography: "body2",
                alignItems: "center",
                color: "text.primary",
                display: "inline-flex",
                textTransform: "capitalize",
                ...(activeLast === link.name && {
                  cursor: "default",
                  pointerEvents: "none",
                  color: "text.disabled",
                }),
              }}
            >
              {link.name}
            </Typography>
          ))}
        </Breadcrumbs>
      </Box>
    </Stack>
  );
}

export function Separator() {
  return (
    <Box
      component='span'
      sx={{
        width: 4,
        height: 4,
        borderRadius: "50%",
        bgcolor: "text.disabled",
      }}
    />
  );
}
