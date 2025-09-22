import { Box, Typography } from "@mui/material";
import Breadcrumb from "../../../../components/acount/BreadCrumbs";
import BackgroundContainer from "../../../../components/secondaryPages/BackgroundContainer";

export async function generateMetadata() {
  return {
    title: "Shothik AI: Refund Policy | Shothik AI",
    description: "This is Refund Policy page",
  };
}

export default function PaymentPolicy() {
  return (
    <BackgroundContainer>
      <Breadcrumb
        heading='Refund Policy'
        links={[{ name: "Legal" }, { name: "Refund Policy" }]}
      />

      {/* Main Box for Return and Cancellation Policy */}
      <Box sx={{ py: 3 }}>
        <Typography variant='h4' gutterBottom>
          Shothik AI Return and Cancellation Policy
        </Typography>

        <Typography variant='h5' gutterBottom>
          1. Subscription Cancellation
        </Typography>
        <Typography variant='body1'>
          You may cancel your subscription at any time by logging into your
          account and navigating to the “Account Settings” page. Once canceled,
          your subscription will remain active until the end of the current
          billing cycle. No refunds will be issued for the remaining period
          unless otherwise specified in the refund policy below.
        </Typography>

        <Typography variant='h5' gutterBottom>
          2. Refund Policy
        </Typography>
        <Typography variant='body1' paragraph>
          Refunds are only available under the following conditions:
        </Typography>
        <Box component='ul' sx={{ pl: 4, pb: 2 }}>
          <Typography component='li'>
            <strong>Technical Issues</strong>: If Shothik AI services are not
            accessible due to technical problems on our side, users may request
            a refund. These issues must be reported within 3 days of purchase or
            renewal.
          </Typography>
          <Typography component='li'>
            <strong>Accidental Purchase</strong>: Users who accidentally
            purchased a subscription may request a refund within 48 hours of the
            transaction.
          </Typography>
        </Box>
        <Typography variant='body1' paragraph>
          All refund requests must be submitted via email to{" "}
          <a href='mailto:support@shothik.ai'>support@shothik.ai</a>. Refunds
          will be processed within 14 days of receiving the request and will be
          credited to the original payment method.
        </Typography>

        <Typography variant='h5' gutterBottom>
          3. Termination by Shothik AI
        </Typography>
        <Typography variant='body1' paragraph>
          Shothik AI reserves the right to terminate a user’s subscription for
          violations of the Terms and Conditions. No refunds will be issued in
          cases of termination due to misuse or policy violations.
        </Typography>

        <Typography variant='h5' gutterBottom>
          4. Chargebacks
        </Typography>
        <Typography variant='body1' paragraph>
          If a chargeback is initiated for any transaction, access to the
          services will be immediately suspended. Users must resolve the
          chargeback with their payment provider before regaining access to the
          services.
        </Typography>
      </Box>
    </BackgroundContainer>
  );
}
