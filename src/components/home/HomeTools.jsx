import { Box, Card, Grid2, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import Link from "next/link";
import { tools } from "../../config/config/navConfig";
import BgContainer from "./components/hero/BgContainer";
import UserActionButton from "./components/hero/UserActionButton";

export default function HomeTools() {
  return (
    <BgContainer
      sx={{ py: 8, px: { xs: 2, sm: 4, md: 6 } }}
      image='url(/home/bg.png)'
    >
      <Box>
        <Typography
          component={motion.h2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          variant='h2'
          align='center'
          sx={{
            fontSize: { xs: "1.8rem", sm: "2rem", md: "3rem", lg: "3rem" },
            lineHeight: 1.2,
            mb: 6,
            fontWeight: 600,
          }}
        >
          Seven powerful{" "}
          <b
            style={{
              background: "linear-gradient(135deg, #00A76F 40%, #3A7A69 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
            }}
          >
            tools
          </b>
          , <br />
          one unified platform
        </Typography>

        <Grid2 container spacing={3}>
          {tools.map((tool, i) =>
            tool.link ? (
              <Grid2
                component={motion.div}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 * (i + 1) }}
                viewport={{ once: true }}
                size={{ xs: 12, md: 4, sm: 6 }}
                key={tool.title}
              >
                <Card
                  component={Link}
                  href={tool.link}
                  sx={{
                    padding: 2,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    border: ".5px solid",
                    borderColor: "divider",
                    boxShadow: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    backgroundColor: "transparent",
                    height: "100%",
                    textDecoration: "none",
                    minHeight: 90,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 1,
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: tool.iconColor,
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "& svg": {
                        color: "#fff",
                        fontSize: 24,
                      },
                    }}
                  >
                    {tool.icon}
                  </Box>
                  {tool.label && (
                    <Typography
                      sx={{
                        backgroundColor: tool.iconColor,
                        color: "#fff",
                        fontSize: { xs: 10, sm: 12 },
                        fontWeight: "bold",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        textTransform: "uppercase",
                      }}
                    >
                      {tool.label}
                    </Typography>
                  )}
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontSize: { xs: 18, sm: 20, md: 20, lg: 22, xl: 22 },
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        "&::after": {
                          content: '"›"',
                          color: "#00A76F",
                          flexShrink: 0,
                        },
                      }}
                    >
                      {tool.title}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{
                        color: "text.secondary",
                        fontSize: 14,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {tool.description}
                    </Typography>
                  </Box>
                </Card>
              </Grid2>
            ) : null
          )}
        </Grid2>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <UserActionButton />
        </Box>
      </Box>
    </BgContainer>
  );
}
