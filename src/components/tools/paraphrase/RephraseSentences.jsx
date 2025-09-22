import styled from "@emotion/styled";
import { Close, Diamond, Lock } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popper,
  Skeleton,
  Tab,
  Tabs,
  Tooltip,
  tooltipClasses,
  Typography,
  useTheme,
} from "@mui/material";
import { Fragment } from "react";
import { modes } from "../../../_mock/tools/paraphrase";

export default function RephraseSentences(props) {
  const {
    open,
    anchorEl,
    handleClose,
    userPackage,
    replaceSentence,
    setRephraseMode,
    isPending,
    rephraseData,
    rephraseMode,
  } = props;

  if (!open) return null;
  const theme = useTheme();
  const dark = theme.palette.mode === "dark";

  // Styled Tooltip
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  const adJectiveVerbAdverbColor = dark ? "#ef5c47" : "#d95645";
  const nounColor = dark ? "#b6bdbd" : "#530a78";
  const phraseColor = dark ? "#b6bdbd" : "#051780";
  const hoverColor = "#2971FE";
  const freezeColor = "#006ACC";

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      placement='bottom'
      sx={{ zIndex: 500 }}
    >
      <Box
        sx={{
          maxWidth: { xs: "320px", sm: "420px", lg: "635px" },
          border: 1,
          p: 0,
          borderRadius: "5px",
          bgcolor: "background.paper",
          borderColor: "background.neutral",
        }}
      >
        <Grid2 container spacing={2} sx={{ pl: 2 }} alignItems='center'>
          <Grid2 size={{ xs: 11 }}>
            <Tabs
              value={rephraseMode}
              onChange={(_, selectedMode) => {
                setRephraseMode(selectedMode);
              }}
              variant='scrollable'
              scrollButtons='auto'
              textColor='primary'
              sx={{
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                "& .MuiTabs-scrollButtons": {
                  width: "24px",
                  height: "24px",
                },
                "& .MuiTabs-scrollButtons.Mui-disabled": {
                  display: "none",
                },
                alignItems: "center",
              }}
            >
              {modes.map((mode, index) => {
                const isDisabled = !mode.package.includes(userPackage);

                return (
                  <Tab
                    key={index}
                    value={mode.value}
                    label={
                      isDisabled ? (
                        <HtmlTooltip
                          title={
                            <Link
                              href='/pricing'
                              style={{ textDecoration: "none" }}
                            >
                              <div
                                style={{
                                  textAlign: "center",
                                  marginBottom: "10px",
                                }}
                              >
                                <Typography variant='h6' gutterBottom>
                                  Upgrade
                                </Typography>
                                <Typography variant='body2'>
                                  Access premium modes by upgrading your plan.
                                </Typography>
                                <Button
                                  variant='contained'
                                  color='primary'
                                  sx={{ mt: 1, width: "100%" }}
                                >
                                  <Diamond fontSize='small' sx={{ mr: 1 }} />
                                  Upgrade Plan
                                </Button>
                              </div>
                            </Link>
                          }
                        >
                          <span style={{ cursor: "not-allowed" }}>
                            {mode.value}
                          </span>
                        </HtmlTooltip>
                      ) : (
                        mode.value
                      )
                    }
                    icon={
                      isDisabled ? (
                        <Lock sx={{ width: 12, height: 12 }} />
                      ) : undefined
                    }
                    iconPosition='start'
                    onClick={(e) => isDisabled && e.preventDefault()}
                    sx={{
                      color: isDisabled ? "text.disabled" : "text.primary",
                      cursor: isDisabled ? "not-allowed" : "pointer",
                    }}
                  />
                );
              })}
            </Tabs>
          </Grid2>
          <Grid2 size={{ xs: 1 }}>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Grid2>
        </Grid2>

        <List
          sx={{
            width: "100%",
            overflow: "auto",
            maxHeight: 200,
          }}
        >
          {isPending ? (
            <Box sx={{ px: 2 }}>
              <Skeleton />
              <Skeleton animation='wave' />
              <Skeleton animation={false} />
            </Box>
          ) : (
            rephraseData?.map((sentence, index) => {
              return (
                <Fragment key={index}>
                  <ListItem
                    sx={{ p: 0 }}
                    onClick={() => replaceSentence(sentence)}
                  >
                    <ListItemButton>
                      <ListItemText>
                        {sentence &&
                          sentence?.map((segment, i, arr) => (
                            <Typography
                              component='span'
                              key={i}
                              sx={{
                                color: /NP/.test(segment.type)
                                  ? adJectiveVerbAdverbColor
                                  : /VP/.test(segment.type)
                                  ? nounColor
                                  : /PP|CP|AdvP|AdjP/.test(segment.type)
                                  ? phraseColor
                                  : /freeze/.test(segment.type)
                                  ? freezeColor
                                  : undefined,
                                cursor: "pointer",
                                transition: "all 0.1s ease-in-out",
                                "&:hover": {
                                  color: hoverColor,
                                },
                              }}
                            >
                              {arr.length - 1 === i ||
                              segment.word === "," ||
                              segment?.word?.endsWith("'")
                                ? ""
                                : " "}
                              {segment.word?.length > 1
                                ? segment.word
                                    ?.replace(/[{}]/g, "")
                                    .replace(/[.।]+$/, "")
                                : segment.word}
                            </Typography>
                          ))}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </Fragment>
              );
            })
          )}
        </List>
      </Box>
    </Popper>
  );
}
