import { Box, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import Slider from "react-slick";
import { useGetAppModeQuery } from "../../redux/api/pricing/pricingApi";
import DotFlashing from "../../resource/DotFlashing";
import PricingButton from "./PricingButton";

const PricingSlider = ({ paymentMethod, country, data, yearly, user }) => {
  const payload = [];

  data?.forEach((plan, index) => {
    const { bn, global } = plan;
    const {
      amount_monthly: priceMonthly,
      amount_yearly: priceYearly,
      yearly_plan_available,
    } = country === "bangladesh" ? bn : country === "india" ? plan.in : global;

    const price = yearly ? priceYearly : priceMonthly;
    if (yearly) {
      if (yearly_plan_available) {
        payload.push({
          price: price,
          currency:
            country === "bangladesh" ? "৳" : country === "india" ? "₹" : "$",
          plan: yearly ? "yearly" : "monthly",
          description: index === 0 ? "Features you’ll love" : "",
          caption: plan.title,
          subscription: plan.type,
          id: plan._id,
          yearly_plan_available,
        });
      }
    } else {
      payload.push({
        price: price,
        currency:
          country === "bangladesh" ? "৳" : country === "india" ? "₹" : "$",
        plan: yearly ? "yearly" : "monthly",
        description: index === 0 ? "Features you’ll love" : "",
        caption: plan.title,
        subscription: plan.type,
        id: plan._id,
        yearly_plan_available,
      });
    }
  });

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { data: modeResult, isLoading } = useGetAppModeQuery();

  let modePrice;
  if (country === "bangladesh" || country === "india") {
    modePrice = 1;
  } else {
    modePrice = 0.5;
  }

  if (isLoading)
    return (
      <Box
        sx={{
          height: "60vh",
        }}
      >
        <DotFlashing />
      </Box>
    );

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <Box className='pricing_slider'>
      <Slider {...settings}>
        {payload?.map((item, index) => (
          <Box
            key={index}
            sx={{
              boxShadow: "0px 8px 16px 0px #919EAB29",
              marginRight: "24px",
              flexShrink: 0,
              p: 3,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: "12px",
                  textTransform: "capitalize",
                  color:
                    item.subscription === "free"
                      ? "#637381"
                      : item.subscription === "value plan"
                      ? "#00A76F"
                      : item.subscription === "pro plan"
                      ? "#8E33FF"
                      : "#FFAB00",
                }}
              >
                {item.caption}
              </Typography>
              <Typography
                variant='h3'
                fontSize={22}
                fontWeight={700}
                sx={{ mb: 2 }}
              >
                <Typography variant='h3' component='sup' fontWeight={400}>
                  {item.currency}
                </Typography>
                {/dev|test/.test(modeResult?.data?.appMode)
                  ? modePrice
                  : item.price}
                <Typography component='sub' color='text.secondary'>
                  / {item.plan}
                </Typography>
              </Typography>
              <Typography
                sx={{ height: 26, mt: -1 }}
                color='text.secondary'
                fontSize={14}
              >
                {item.description}
              </Typography>
              <PricingButton
                user={user}
                caption={item.caption}
                id={item.id}
                paymentMethod={paymentMethod}
                redirect={redirect}
                subscription={item.subscription}
                yearly={yearly}
                yearly_plan_available={item.yearly_plan_available}
                outline={true}
              />
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default PricingSlider;
