import { Box, Typography } from "@mui/material";
import Breadcrumb from "../../../../components/acount/BreadCrumbs";
import BackgroundContainer from "../../../../components/secondaryPages/BackgroundContainer";

export async function generateMetadata() {
  return {
    title: "Shothik AI: Payment Policy | Shothik AI",
    description: "This is Payment Policy page",
  };
}

export default function PaymentPolicy() {
  return (
    <BackgroundContainer>
      <Breadcrumb
        heading='Payment Policy'
        links={[{ name: "Legal" }, { name: "Payment Policy" }]}
      />

      {/* Main Box for Payment Policy */}
      <Box sx={{ py: 3 }}>
        <Typography variant='h5' gutterBottom>
          Payment Methods
        </Typography>

        <Typography variant='body1'>
          Shothik AI accepts the following payment methods:
        </Typography>

        <Typography variant='h6' gutterBottom>
          Payment Methods for Bangladesh
        </Typography>
        <Typography variant='body1'>
          For users in Bangladesh, we offer a local and convenient payment
          solution:
        </Typography>
        <Box component='ul' sx={{ pl: 4 }}>
          <Typography component='li'>
            <strong>bKash</strong>: Payments can be made via the widely used
            bKash mobile financial service. All payments will be processed in
            Bangladesh Taka (Taka). Users are required to provide accurate bKash
            transaction details during the checkout process.
          </Typography>
        </Box>

        <Typography variant='h6' gutterBottom>
          Payment Methods for India
        </Typography>
        <Typography variant='body1'>
          For users in India, we offer a local payment gateway:
        </Typography>
        <Box component='ul' sx={{ pl: 4 }}>
          <Typography component='li'>
            <strong>Paytm</strong>: Indian users can pay through Paytm, one of
            the most popular payment gateways in the country. All payments will
            be processed in Indian Rupees (INR). Users will be redirected to the
            Paytm gateway during checkout to complete their payment securely.
          </Typography>
        </Box>

        <Typography variant='h6' gutterBottom>
          Payment Methods for International Users
        </Typography>
        <Typography variant='body1'>
          For international users, we provide the following payment options:
        </Typography>
        <Box component='ul' sx={{ pl: 4 }}>
          <Typography component='li'>
            <strong>Credit Card</strong>: We accept major credit cards,
            including:
          </Typography>
          <Box component='ul' sx={{ pl: 4 }}>
            <Typography component='li'>Visa</Typography>
            <Typography component='li'>Mastercard</Typography>
            <Typography component='li'>American Express</Typography>
          </Box>
        </Box>

        <Typography variant='h5' gutterBottom>
          Pricing and Fees
        </Typography>
        <Typography variant='body1'>
          Our services operate on a subscription model. The following plans are
          available:
        </Typography>
        <Box component='ul' sx={{ pl: 4 }}>
          <Typography component='li'>
            <Typography variant='body1'>
              <strong>Free Plan</strong>: Ideal for freelance writers, bloggers,
              and small business owners. This plan allows you to paraphrase up
              to 1,080 words, translate text up to 1,000 words (basic &
              humanized), fix basic grammar errors up to 1,000 words, summarize
              texts up to 1,000 words, and translate text up to 1,000 words
              (basic). Additionally, you can detect AI-generated content up to
              10,000 words.
            </Typography>
          </Typography>

          <Typography component='li'>
            <Typography variant='body1'>
              <strong>Value Plan</strong>: You'll get unlimited access to our
              paraphrasing tool, humanize GPT up to 5,000 words per day,
              advanced grammar checks without any word limit, summarizer with no
              word limit, and basic & humanized translation without any word
              limit, plus 150,000 words with AI Detector.
            </Typography>
          </Typography>

          <Typography component='li'>
            <Typography variant='body1'>
              <strong>Pro Plan</strong>: You can unlock maximum potential with
              our Pro Plan. Enjoy unlimited access to our paraphrasing tool,
              humanize GPT up to 20,000 words with Raven Model, unlimited Panda
              Model for Humanize GPT, advanced grammar checks without any word
              limit, 300,000 words with the AI Detector, summarizer with no word
              limit, and basic & humanized translation without any word limit.
            </Typography>
          </Typography>

          <Typography component='li'>
            <Typography variant='body1'>
              <strong>Unlimited Plan</strong>: You can unlock maximum potential
              with our Unlimited Plan. Enjoy unlimited access to our
              paraphrasing tool, unlimited Panda Model for Humanize GPT,
              unlimited Raven Model for Humanize GPT, 500,000 words with the AI
              Detector, summarizer with no word limit, advanced grammar checks
              without any word limit, and basic & humanized translation without
              any word limit.
            </Typography>
          </Typography>
        </Box>
        <Typography variant='body1'>
          The cost of each plan is displayed during the purchase process. All
          fees are non-refundable except in specific cases outlined below.
        </Typography>

        <Typography variant='h5' gutterBottom>
          Automatic Renewal
        </Typography>
        <Typography variant='body1'>
          All subscriptions are subject to automatic renewal unless canceled by
          the user at least 10 days before the renewal date. Users will receive
          a reminder email about upcoming renewals, including any changes in the
          subscription fee. The new rate will automatically apply if no action
          is taken by the user.
        </Typography>

        <Typography variant='h5' gutterBottom>
          Changes in Subscription Fees
        </Typography>
        <Typography variant='body1'>
          Shothik AI reserves the right to change the subscription fees at any
          time. Any changes will be communicated at least 10 days before the
          next billing cycle. By continuing to use the services after receiving
          notice, you agree to the updated fees.
        </Typography>

        <Typography variant='h5' gutterBottom>
          Payment Authorization
        </Typography>
        <Typography variant='body1'>
          By subscribing, you authorize Shothik AI to charge your selected
          payment method for the subscription fees. If payment fails, Shothik AI
          may retry the payment method, and if unsuccessful, we reserve the
          right to suspend access to your account until payment is received.
        </Typography>

        <Typography variant='h5' gutterBottom>
          Taxes
        </Typography>
        <Typography variant='body1'>
          All applicable taxes, including VAT or sales tax, will be added to the
          price of purchases as required by law.
        </Typography>
      </Box>
    </BackgroundContainer>
  );
}
