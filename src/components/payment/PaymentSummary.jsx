import { ShieldRounded } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { trackEvent } from "../../analysers/eventTracker";
import {
  useGetAppModeQuery,
  useGetTransactionQuery,
} from "../../redux/api/pricing/pricingApi";
import DotFlashing from "../../resource/DotFlashing";
import { Label } from "../acount/AccountGeneral";

export default function PaymentSummary({
  plan,
  monthly,
  handleMonthly,
  onSubmit,
  isSubmitting,
  setTotalBill,
  country,
}) {
  const { data: modeResult, isLoading } = useGetAppModeQuery();

  const { title, bn, global, amount_monthly, amount_yearly } = plan;

  let {
    amount_monthly: price = 0,
    amount_yearly: priceYearly = 0,
    yearly_plan_available,
  } = (country === "bangladesh"
    ? bn
    : country === "india"
    ? plan.in
    : global) || {
    amount_monthly,
    amount_yearly,
  };

  let modePrice;
  if (country === "bangladesh" || country === "india") {
    modePrice = 1;
  } else {
    modePrice = 0.5;
  }

  const { user } = useSelector((state) => state.auth);
  const { data: transection } = useGetTransactionQuery({
    userId: user._id,
    packageName: user.package,
  });

  const paidAmount = transection?.amount || 0;
  const billtopaid = /dev|test/.test(modeResult?.data?.appMode)
    ? modePrice
    : monthly === "monthly"
    ? price - paidAmount
    : priceYearly - paidAmount;

  useEffect(() => {
    setTotalBill(billtopaid);
  }, [monthly]);

  if (isLoading)
    return (
      <Box
        sx={{
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <DotFlashing />
      </Box>
    );

  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 2,
        bgcolor: "background.neutral",
        width: { xs: "100%", sm: "500px" },
      }}
    >
      <Typography variant='h6' sx={{ mb: 5 }}>
        Summary
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            Subscription
          </Typography>

          <Label fontColor='error.dark' color='error.lighter'>
            {title}
          </Label>
        </Stack>

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant='body2' sx={{ color: "text.secondary" }}>
            Billed by
          </Typography>

          <RadioGroup
            row
            aria-labelledby='demo-controlled-radio-buttons-group'
            name='controlled-radio-buttons-group'
            value={monthly}
            onChange={handleMonthly}
          >
            <FormControlLabel
              value='monthly'
              control={<Radio />}
              label='Monthly'
            />
            {yearly_plan_available && (
              <FormControlLabel
                style={{ marginRight: 0 }}
                value='yearly'
                control={<Radio />}
                label='Yearly'
              />
            )}
          </RadioGroup>
        </Stack>

        {transection && (
          <Box>
            <Typography
              variant='subtitle1'
              sx={{
                color: "primary.main",
                backgroundColor: "primary.lighter",
                paddingX: 2,
                paddingY: 1,
                borderRadius: 1,
              }}
            >
              You have already purchase the{" "}
              {transection.package.replace("_", " ")}
            </Typography>
          </Box>
        )}

        <Stack spacing={1} direction='row' justifyContent='flex-end'>
          {price > 0 && (
            <Typography variant='h5'>
              {country === "bangladesh" ? "৳" : country === "india" ? "₹" : "$"}
            </Typography>
          )}
          <Typography variant='h2'>{billtopaid}</Typography>

          {price > 0 && (
            <Typography
              component='span'
              sx={{ mb: 1, alignSelf: "center", color: "text.secondary" }}
            >
              {monthly === "monthly" ? "/mo" : "/yr"}
            </Typography>
          )}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        {monthly !== "monthly" && (
          <Typography variant='h6'>2 months free</Typography>
        )}

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant='h6'>Total Billed</Typography>

          <Typography variant='h6'>
            {country === "bangladesh" ? "৳" : country === "india" ? "₹" : "$"}{" "}
            {billtopaid}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />
      </Stack>

      <Typography
        component='div'
        variant='caption'
        sx={{ color: "text.secondary", mt: 1 }}
      >
        * Plus applicable taxes
      </Typography>

      <Button
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        sx={{ mt: 5, mb: 3 }}
        onClick={(e) => {
          onSubmit(e);
          trackEvent("click", "payment", `${type}-checkout`, billtopaid);
        }}
        disabled={isSubmitting || billtopaid < 0}
      >
        {isSubmitting ? "Please wait..." : "Upgrade My Plan"}
      </Button>

      <Stack alignItems='center' spacing={1}>
        <Stack direction='row' alignItems='center' spacing={1}>
          <ShieldRounded sx={{ color: "primary.main" }} />
          <Typography variant='subtitle2'>
            Secure{" "}
            {country === "bangladesh"
              ? "Bkash"
              : country === "india"
              ? "razorpay"
              : "Stripe"}{" "}
            payment
          </Typography>
        </Stack>

        <Typography
          variant='caption'
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
    </Box>
  );
}
