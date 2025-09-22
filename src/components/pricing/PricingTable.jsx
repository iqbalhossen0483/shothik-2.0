import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useSearchParams } from "next/navigation";
import { useGetAppModeQuery } from "../../redux/api/pricing/pricingApi";
import PricingButton from "./PricingButton";

function PricingTable({ user, data, yearly, paymentMethod, country }) {
  const payload = {
    pricing: { title: "Pricing", data: [] },
    features: [],
  };

  payload.features = data[0]
    ? data[0].features
        .map((feature) => feature.type)
        .filter((type, index, self) => self.indexOf(type) === index)
        .map((type) => [type])
    : [];

  data?.forEach((plan, index) => {
    const { features, bn, global } = plan;
    const {
      amount_monthly: priceMonthly,
      amount_yearly: priceYearly,
      yearly_plan_available,
    } = country === "bangladesh" ? bn : country === "india" ? plan.in : global;

    const price = yearly ? priceYearly : priceMonthly;

    payload.pricing.data.push({
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
    let service = "";
    features.forEach((feature) => {
      const index = payload.features.findIndex(
        (item) => item[0] === feature.type
      );
      if (index !== -1) {
        if (feature.type === service) {
          const lastElement =
            payload.features[index][payload.features[index].length - 1];
          payload.features[index].pop();
          payload.features[index].push(`${lastElement} || ${feature.title}`);
        } else {
          payload.features[index].push(feature.title);
        }
        service = feature.type;
      }
    });
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

  function getItem(item) {
    if (item === "bypass") {
      return "Humanize GPT";
    }
    return item;
  }

  if (isLoading) return null;

  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "0px 0px 8px 0px #919EAB36" }}
    >
      <Table>
        <TableBody sx={{ p: 3 }}>
          <TableRow
            sx={{
              py: 3,
              px: "36px",
              display: { xs: "none", sm: "table-row" },
            }}
          >
            <TableCell
              sx={{
                py: 3,
                whiteSpace: "nowrap",
                fontWeight: 600,
                fontSize: "20px",
                pl: "36px",
              }}
              component='th'
              scope='row'
            >
              {payload.pricing.title}
            </TableCell>
            {payload.pricing.data?.map((item, index) => (
              <TableCell
                key={index}
                sx={{
                  whiteSpace: "nowrap",
                  py: 3,
                }}
              >
                <Typography
                  variant='h3'
                  fontSize={12}
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
              </TableCell>
            ))}
          </TableRow>
          {payload.features.map((feature, index) => {
            return (
              <TableRow key={index}>
                {feature.map((item, index) => (
                  <TableCell
                    sx={{
                      verticalAlign: "top",
                      ...(index === 0
                        ? {
                            fontWeight: 600,
                            fontSize: "20px",
                            pl: { xs: "10px", sm: "36px" },
                            textTransform: "capitalize",
                            whiteSpace: "nowrap",
                          }
                        : {
                            color: "text.secondary",
                            whiteSpace: "pre-line",
                            fontSize: 16,
                            minWidth: "200px",
                          }),
                    }}
                    key={index}
                  >
                    <div>
                      {item.includes("||")
                        ? item
                            .split("||")
                            .map((value) => {
                              return value.trim();
                            })
                            .join(", \n")
                        : getItem(item)}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PricingTable;

// <TableCell
//   sx={{
//     maxWidth: '216px',
//     whiteSpace: 'nowrap',
//     py: 3,
//     fontWeight: 400,
//     color: '#637381',
//     fontSize: '18px',
//     verticalAlign: 'top',
//   }}
// >
//   Daily word limit of <br /> 1,080 words
// </TableCell>
// <TableCell
//   sx={{
//     maxWidth: '216px',
//     whiteSpace: 'nowrap',
//     py: 3,
//     fontWeight: 400,
//     color: '#637381',
//     fontSize: '18px',
//     verticalAlign: 'top',
//   }}
// >
//   Unlimited input words <br /> and usage
// </TableCell>
// <TableCell
//   sx={{
//     maxWidth: '216px',
//     whiteSpace: 'nowrap',
//     py: 3,
//     fontWeight: 400,
//     color: '#637381',
//     fontSize: '18px',
//     verticalAlign: 'top',
//   }}
// >
//   Same as Value plan
// </TableCell>
// <TableCell
//   sx={{
//     maxWidth: '216px',
//     whiteSpace: 'nowrap',
//     py: 3,
//     fontWeight: 400,
//     color: '#637381',
//     fontSize: '18px',
//     verticalAlign: 'top',
//   }}
// >
//   Same as Pro plan
// </TableCell>

{
  /* <TableRow sx={{ py: 3, px: '36px' }}>
            <TableCell
              sx={{
                maxWidth: '216px',
                whiteSpace: 'nowrap',
                py: 3,
                fontWeight: 700,

                fontSize: '20px',
                verticalAlign: 'top',
                pl: '36px',
              }}
              component="th"
              scope="row"
            >
              Grammar Fix
            </TableCell>
            <TableCell
              sx={{
                maxWidth: '216px',
                whiteSpace: 'nowrap',
                py: 3,
                fontWeight: 400,
                color: '#637381',
                fontSize: '18px',
                verticalAlign: 'top',
              }}
            >
              Input limit of 250 words, <br /> up to 1,000 words/day
            </TableCell>
            <TableCell
              sx={{
                maxWidth: '216px',
                whiteSpace: 'nowrap',
                py: 3,
                fontWeight: 400,
                color: '#637381',
                fontSize: '18px',
                verticalAlign: 'top',
              }}
            >
              Unlimited input
            </TableCell>
            <TableCell
              sx={{
                maxWidth: '216px',
                whiteSpace: 'nowrap',
                py: 3,
                fontWeight: 400,
                color: '#637381',
                fontSize: '18px',
                verticalAlign: 'top',
              }}
            >
              Unlimited input
            </TableCell>
            <TableCell
              sx={{
                maxWidth: '216px',
                whiteSpace: 'nowrap',
                py: 3,
                fontWeight: 400,
                color: '#637381',
                fontSize: '18px',
                verticalAlign: 'top',
              }}
            >
              Unlimited input
            </TableCell>
          </TableRow>
          <TableRow sx={{ py: 3, px: '36px' }}>
            <TableCell
              sx={{
                maxWidth: '216px',
                whiteSpace: 'nowrap',
                py: 3,
                fontWeight: 700,
                fontSize: '20px',
                verticalAlign: 'top',
                pl: '36px',
              }}
              component="th"
              scope="row"
            >
              Summarize
            </TableCell>
            <TableCell
              sx={{
                maxWidth: '216px',
                whiteSpace: 'nowrap',
                py: 3,
                fontWeight: 400,
                color: '#637381',
                fontSize: '18px',
                verticalAlign: 'top',
              }}
            >
              Input limit of 500 words, <br />
              up to 1,000 words/day.
            </TableCell>
            <TableCell
              sx={{
                maxWidth: '216px',
                whiteSpace: 'nowrap',
                py: 3,
                fontWeight: 400,
                color: '#637381',
                fontSize: '18px',
                verticalAlign: 'top',
              }}
            >
              Unlimited input.
            </TableCell>
            <TableCell
              sx={{
                maxWidth: '216px',
                whiteSpace: 'nowrap',
                py: 3,
                fontWeight: 400,
                color: '#637381',
                fontSize: '18px',
                verticalAlign: 'top',
              }}
            >
              Unlimited input.
            </TableCell>
            <TableCell
              sx={{
                maxWidth: '216px',
                whiteSpace: 'nowrap',
                py: 3,
                fontWeight: 400,
                color: '#637381',
                fontSize: '18px',
                verticalAlign: 'top',
              }}
            >
              Unlimited input.
            </TableCell>
          </TableRow>
          <TableRow sx={{ py: 3, px: '36px' }}>
            <TableCell
              sx={{
                maxWidth: '216px',
                whiteSpace: 'nowrap',
                py: 3,
                fontWeight: 700,
                fontSize: '20px',
                verticalAlign: 'top',
                pl: '36px',
              }}
              component="th"
              scope="row"
            >
              Translation
            </TableCell>
            <TableCell
              sx={{
                maxWidth: '216px',
                whiteSpace: 'nowrap',
                py: 3,
                fontWeight: 400,
                color: '#637381',
                fontSize: '18px',
                verticalAlign: 'top',
              }}
            >
              {/* Basic, up to 1,000 <br /> words */
}
//     Input limit of 250 words,
//     <br />
//     up to 1,000 words/day.
//     <br /> Humanized translation is
//     <br />
//     unavailable.
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Unlimited input, including <br /> humanized translation.
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Same as Value Plan
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Same as Pro Plan
//   </TableCell>
// </TableRow>
// <TableRow sx={{ py: 3, px: '36px' }}>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 700,
//       fontSize: '20px',
//       verticalAlign: 'top',
//       pl: '36px',
//     }}
//     component="th"
//     scope="row"
//   >
//     Humanize GPT
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     {/* Up to 1,500  <br /> words */}
//     Input limit of 300 words,
//     <br /> up to 1,500 words/day.
//     <br /> Includes access to Panda
//     <br />
//     Model only.
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Input limit of 500 words,
//     <br /> up to 5000 words/day.
//     <br /> Includes access to Panda
//     <br />
//     Model only.
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Input limit of 1000 words,
//     <br /> Panda Model: Unlimited <br /> usage. Raven Model:
//     <br /> 20,000 words/month{' '}
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Unlimited access to both <br /> Panda and Raven models.
//   </TableCell>
// </TableRow>
// <TableRow sx={{ py: 3, px: '36px' }}>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 700,

//       fontSize: '20px',
//       verticalAlign: 'top',
//       pl: '36px',
//     }}
//     component="th"
//     scope="row"
//   >
//     AI Detector
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Maximum of 1,000 <br /> words/day
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Maximum of 5,000 <br /> words/month.
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Maximum of 50,000
//     <br /> words/month.
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Maximum of 100,000 <br />
//     words/month.
//   </TableCell>
// </TableRow>
// <TableRow sx={{ py: 3, px: '36px' }}>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 700,

//       fontSize: '20px',
//       verticalAlign: 'top',
//       pl: '36px',
//     }}
//     component="th"
//     scope="row"
//   >
//     Customer Support
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Basic
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Standard
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Priority
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Priority
//   </TableCell>
// </TableRow>
// <TableRow sx={{ py: 3, px: '36px' }}>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 700,

//       fontSize: '20px',
//       verticalAlign: 'top',
//       pl: '36px',
//     }}
//     component="th"
//     scope="row"
//   >
//     Beta Features
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Not included
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Not included
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Not included
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Included
//   </TableCell>
// </TableRow>
// <TableRow sx={{ py: 3, px: '36px' }}>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 700,

//       fontSize: '20px',
//       verticalAlign: 'top',
//       pl: '36px',
//     }}
//     component="th"
//     scope="row"
//   >
//     Private Community <br /> Access
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Not included
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Not included
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Not included
//   </TableCell>
//   <TableCell
//     sx={{
//       maxWidth: '216px',
//       whiteSpace: 'nowrap',
//       py: 3,
//       fontWeight: 400,
//       color: '#637381',
//       fontSize: '18px',
//       verticalAlign: 'top',
//     }}
//   >
//     Included
//   </TableCell>
// </TableRow> */}
