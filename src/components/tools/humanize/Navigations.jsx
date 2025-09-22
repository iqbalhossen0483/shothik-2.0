import { SaveAsOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import { useGetUsesLimitQuery } from "../../../redux/api/tools/toolsApi";
import SvgColor from "../../../resource/SvgColor";

function formatNumber(number) {
  if (!number) return 0;
  const length = number.toString().length;
  if (length >= 4) {
    return number.toLocaleString("en-US");
  }
  return number.toString();
}

const Navigations = ({
  isMobile,
  loadingAi,
  hasOutput,
  handleAiDitectors,
  miniLabel,
  handleSubmit,
  isLoading,
  model,
  wordCount,
  wordLimit,
  userInput,
  userPackage,
  update,
}) => {
  const { data: userLimit, refetch } = useGetUsesLimitQuery({
    service: "bypass",
    model: model.toLowerCase(),
  });

  useEffect(() => {
    refetch();
  }, [update, refetch]);

  const progressPercentage = () => {
    if (!userLimit) return 0;

    const totalWords = userLimit.totalWordLimit;
    const remainingWords = userLimit.remainingWord;
    const progress = (remainingWords / totalWords) * 100;
    return progress;
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems='center'
      justifyContent='space-between'
      spacing={{ xs: 2, sm: 0 }}
      sx={{ my: 2 }}
    >
      <Stack
        direction='row'
        alignItems='center'
        spacing={2}
        sx={{ marginLeft: { xs: 1, md: 0 } }}
      >
        <Button
          color='warning'
          size={isMobile ? "small" : "large"}
          variant='soft'
          disabled={!hasOutput}
          loading={loadingAi}
          onClick={handleAiDitectors}
          startIcon={<SaveAsOutlined />}
          style={{ padding: "5px 15px", height: 40 }}
          sx={{
            borderColor: "primary.warning",
            borderRadius: "5px",
            "&:hover": {
              borderColor: "primary.dark",
            },
          }}
        >
          {miniLabel ? "Check for AI" : "Check AI"}
        </Button>

        <Button
          onClick={handleSubmit}
          size={isMobile ? "small" : "large"}
          style={{ padding: "5px 15px", height: 40 }}
          variant='contained'
          disabled={
            !userInput ||
            wordCount > wordLimit ||
            (!/pro_plan|unlimited/.test(userPackage) && model === "Raven")
          }
          loading={isLoading}
          startIcon={
            isLoading ? (
              <CircularProgress size={16} color='inherit' />
            ) : (
              <SvgColor
                src='/navbar/bypass-svgrepo-com.svg'
                sx={{ width: { xs: 20, md: 20 }, height: { xs: 20, md: 20 } }}
              />
            )
          }
        >
          {!hasOutput ? "Humanize" : "Re humanize"}
        </Button>

        {((model === "Raven" && !/pro_plan|unlimited/.test(userPackage)) ||
          wordCount > wordLimit) && (
          <Link href='/pricing'>
            <Button
              size={isMobile ? "medium" : "medium"}
              variant='contained'
              sx={{
                bgcolor: "primary.main",
                borderRadius: "5px",
              }}
              startIcon={
                <SvgColor
                  src='/navbar/diamond.svg'
                  sx={{ width: { xs: 20, md: 20 }, height: { xs: 20, md: 20 } }}
                />
              }
            >
              Upgrade
            </Button>
          </Link>
        )}
      </Stack>

      {userLimit && (
        <Box
          sx={{
            width: {
              xs: "200px",
              sm: "235px",
              paddingLeft: { xs: 2, sm: 0 },
            },
          }}
        >
          {userLimit?.totalWordLimit === 99999 ? (
            <>
              <LinearProgress
                sx={{ height: 6 }}
                variant='determinate'
                value={100}
              />
              <Typography color='primary' sx={{ fontSize: { xs: 12, sm: 14 } }}>
                Unlimited
              </Typography>
            </>
          ) : (
            <>
              <LinearProgress
                sx={{ height: 6 }}
                variant='determinate'
                value={progressPercentage()}
              />
              <Typography sx={{ fontSize: { xs: 12, sm: 14 } }}>
                {formatNumber(userLimit?.totalWordLimit)} words /{" "}
                {formatNumber(userLimit?.remainingWord)} words left
              </Typography>
            </>
          )}
        </Box>
      )}
    </Stack>
  );
};

export default Navigations;
