import {
  Article,
  CalendarToday,
  CloudDownload,
  MenuBook,
  Person,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import * as motion from "motion/react-client";

const AcademicSearch = ({ data }) => {
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  return (
    <Card>
      <CardContent>
        <Stack direction='row' alignItems='center' spacing={0.5}>
          <Box>
            <IconButton
              color='text.secondary'
              aria-label='Book'
              sx={{ bgcolor: "rgba(73, 149, 87, 0.04)" }}
            >
              <MenuBook sx={{ fontSize: 22 }} />
            </IconButton>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold", fontSize: 17 }}>
              Academic Papers
            </Typography>
            <Typography
              sx={{ color: "text.secondary", fontSize: 15 }}
            >{`Found ${data?.length} papers`}</Typography>
          </Box>
        </Stack>
        <Stack
          direction='row'
          spacing={2}
          sx={{
            overflowX: "auto",
            mt: 2,
            pb: 1,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {data?.map((paper, index) => (
            <motion.div
              key={paper.url || index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  width: 300,
                  flexShrink: 0,
                  bgcolor: "background.paper",
                  boxShadow: 0,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "divider",
                  borderRadius: "10px",
                  transition: "all 0.2s",
                  "&:hover": { boxShadow: 3 },
                  p: 0,
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                  <Stack spacing={1}>
                    <Typography
                      variant='h5'
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {paper.title}
                    </Typography>

                    {paper.author && (
                      <Box>
                        <Chip
                          icon={<Person sx={{ fontSize: 20 }} />}
                          label={
                            paper.author.split(";").slice(0, 2).join(", ") +
                            (paper.author.split(";").length > 2
                              ? " et al."
                              : "")
                          }
                          sx={{
                            borderRadius: "5px",
                            bgcolor: dark ? "#2b323b" : "#f5f5f5",
                            color: "text.secondary",
                            "& .MuiChip-icon": { color: "inherit" },
                          }}
                        />
                      </Box>
                    )}

                    {paper.publishedDate && (
                      <Box>
                        <Chip
                          icon={<CalendarToday sx={{ fontSize: 17 }} />}
                          label={new Date(
                            paper.publishedDate
                          ).toLocaleDateString()}
                          sx={{
                            borderRadius: "7px",
                            bgcolor: dark ? "#2b323b" : "#f5f5f5",
                            color: "text.secondary",
                            "& .MuiChip-icon": { color: "inherit" },
                          }}
                        />
                      </Box>
                    )}

                    <Box>
                      <Typography
                        variant='body2'
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {paper.text}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant='outlined'
                        onClick={() => window.open(paper.url, "_blank")}
                        sx={{ flexGrow: 1 }}
                      >
                        <Article sx={{ fontSize: 18, mr: 1 }} />
                        View Paper
                      </Button>

                      {paper.url.includes("arxiv.org") && (
                        <Button
                          variant='outlined'
                          onClick={() =>
                            window.open(
                              paper.url.replace("abs", "pdf"),
                              "_blank"
                            )
                          }
                          sx={{
                            backgroundColor: "transparent",
                            "&:hover": {
                              backgroundColor: "rgba(138, 71, 255, 0.1)",
                            },
                          }}
                        >
                          <CloudDownload sx={{ fontSize: 18 }} />
                        </Button>
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AcademicSearch;
