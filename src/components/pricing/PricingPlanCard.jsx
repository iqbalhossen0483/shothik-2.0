import { Box, Card, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useGetAppModeQuery } from "../../redux/api/pricing/pricingApi";
import { Label } from "../acount/AccountGeneral";
import PricingButton from "./PricingButton";

export default function PricingPlanCard({
  user,
  loading,
  card,
  index,
  yearly,
  sx,
  paymentMethod,
  country,
  ...other
}) {
  const {
    _id: id,
    type: subscription,
    title: caption,
    features: lists,
    bn,
    global,
  } = card;

  const {
    amount_monthly: price,
    amount_yearly: priceYearly,
    yearly_plan_available,
  } = country === "bangladesh" ? bn : country === "india" ? card.in : global;

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { data: modeResult, isLoading } = useGetAppModeQuery();

  let modePrice;
  if (country === "bangladesh" || country === "india") {
    modePrice = 1;
  } else {
    modePrice = 0.5;
  }

  if (isLoading) return null;

  if (yearly && !yearly_plan_available) return null;

  return (
    <Card
      sx={{
        p: 4,
        boxShadow: (theme) => theme.customShadows.z24,
        ...((index === 0 || index === 2) && {
          boxShadow: "0px 0px 8px 0px #919EAB36",
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }),
        bgcolor: "background.default",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 0,
        ...sx,
      }}
      {...other}
    >
      <Box>
        {price ? (
          index === 1 ? (
            <Label
              sx={{
                top: 32,
                right: 32,
                position: "absolute",
                background: "#00A76F29",
                color: "#00A76F",
              }}
            >
              Solid
            </Label>
          ) : index === 2 ? (
            <Label
              sx={{
                top: 32,
                right: 32,
                position: "absolute",
                background: "#8E33FF29",
                color: "#8E33FF",
              }}
            >
              POPULAR
            </Label>
          ) : index === 3 ? (
            <Label
              sx={{
                top: 32,
                right: 32,
                position: "absolute",
                background: "#FFAB0052",
                color: "#B76E00",
              }}
            >
              Best Option
            </Label>
          ) : (
            ""
          )
        ) : null}
        <Stack spacing={1} direction='row'>
          {price !== undefined ? (
            <>
              <Typography variant='h3' fontWeight={700}>
                <Typography variant='h3' component='sup' fontWeight={700}>
                  {country === "bangladesh"
                    ? "৳"
                    : country === "india"
                    ? "₹"
                    : "$"}
                </Typography>
                {/dev|test/.test(modeResult?.data?.appMode)
                  ? modePrice
                  : yearly
                  ? priceYearly
                  : price}
                <Typography component='sub' color='text.secondary'>
                  {yearly ? "/ year" : "/ month"}
                </Typography>
              </Typography>
            </>
          ) : (
            <>
              <Skeleton
                variant='rectangular'
                width={24}
                height={24}
                sx={{ borderRadius: 1 }}
              />
              <Skeleton
                variant='rectangular'
                width={64}
                height={24}
                sx={{ borderRadius: 1 }}
              />
            </>
          )}
        </Stack>

        <Typography
          variant='h4'
          sx={{
            color:
              subscription === "free"
                ? "#637381"
                : subscription === "value plan"
                ? "#00A76F"
                : subscription === "pro plan"
                ? "#8E33FF"
                : "#FFAB00",
            textTransform: "capitalize",
            mt: { xs: 1, md: 0 },
          }}
        >
          {subscription === "free"
            ? "Free Plan"
            : caption || (
                <Skeleton
                  variant='text'
                  sx={{ width: 0.25, color: "#637381" }}
                />
              )}
          {subscription === "free" && (
            <Typography
              component='sub'
              variant='subtitle2'
              sx={{ color: "#00A76F", textTransform: "capitalize", ml: 1 }}
            >
              Forever
            </Typography>
          )}
        </Typography>

        {subscription === "free" && (
          <Typography variant='body2' sx={{ color: "#637381" }}>
            Features you’ll love
          </Typography>
        )}

        <Stack spacing={2.25} sx={{ p: 0, my: 3 }}>
          <Stack component='ul' spacing={2}>
            {(lists || Array.from({ length: 5 })).map((item, index) => (
              <Stack
                key={index}
                component='li'
                direction='row'
                alignItems='flex-start'
                spacing={1}
                sx={{
                  typography: "body2",
                  color: "text.primary",
                }}
              >
                {subscription === "free" ? (
                  <Image
                    src='/black_tick.png'
                    width={24}
                    height={24}
                    alt='pricing_check_mark'
                  />
                ) : (
                  <Image
                    src='/green_tick.svg'
                    width={24}
                    height={24}
                    alt='pricing_check_mark'
                  />
                )}
                <Typography variant='body2' sx={{ color: "text.primary" }}>
                  {item?.title ? (
                    item.title
                  ) : (
                    <Skeleton variant='text' sx={{ width: 200 }} />
                  )}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>

      <PricingButton
        user={user}
        paymentMethod={paymentMethod}
        yearly={yearly}
        yearly_plan_available={yearly_plan_available}
        caption={caption}
        subscription={subscription}
        id={id}
        redirect={redirect}
      />
    </Card>
  );
}
