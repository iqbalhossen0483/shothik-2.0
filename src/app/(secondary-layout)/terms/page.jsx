import { Box, Typography } from "@mui/material";
import Breadcrumb from "../../../components/acount/BreadCrumbs";
import BackgroundContainer from "../../../components/secondaryPages/BackgroundContainer";

export async function generateMetadata() {
  return {
    title: "Shothik AI: Terms & Conditions | Shothik AI",
    description: "This is terms and condition page",
  };
}

export default function TermsPage() {
  return (
    <BackgroundContainer>
      <Breadcrumb
        heading='Terms & Conditions'
        links={[{ name: "Legal" }, { name: "Terms & Conditions" }]}
      />

      {/* Main Box for Terms and Conditions */}
      <Box sx={{ py: 3 }}>
        <Typography variant='h4' gutterBottom>
          Shothik AI Terms and Conditions
        </Typography>

        <Typography variant='body1' paragraph>
          These Terms of Service (“Agreement”) are made between Shothik AI
          (referred to as “Company”, “we”, “us”, or “our”) and you (“User”,
          “you”, or “your”), the individual accessing our services. By using the
          Shothik AI platform, you agree to comply with the terms and conditions
          outlined below. If you do not agree, please discontinue using the
          services immediately.
        </Typography>

        <Typography variant='h5' gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography variant='body1' paragraph>
          By using the Shothik AI services, you affirm that you are at least 13
          years of age. Minors (under 18 years of age) must have the consent of
          a parent or guardian to use the services. Shothik AI reserves the
          right to change these terms at any time. You will be notified of any
          changes via email or a notice on our website. Your continued use of
          the services after any modifications indicates your acceptance of the
          updated terms.
        </Typography>

        <Typography variant='h5' gutterBottom>
          2. Services Provided
        </Typography>
        <Typography variant='body1' paragraph>
          Shothik AI offers a wide range of AI-powered writing and translation
          tools designed to assist users in creating, refining, and improving
          content. The services provided include:
        </Typography>
        <Box component='ul' sx={{ pl: 4 }}>
          <Typography component='li'>
            Paraphrasing: Rewriting content while maintaining the original
            meaning.
          </Typography>
          <Typography component='li'>
            Bypass GPT: Advanced paraphrasing and content generation that avoids
            detection by AI detection tools, ideal for academic or content
            creation use cases.
          </Typography>
          <Typography component='li'>
            Grammar Fix: Correcting grammatical errors, improving sentence
            structure, and ensuring content is written clearly.
          </Typography>
          <Typography component='li'>
            Summarizing: Condensing long pieces of text into shorter summaries
            that capture the main points.
          </Typography>
          <Typography component='li'>
            Translator: Translating content between multiple languages,
            providing accurate and context-aware translations.
          </Typography>
          {/* <Typography component="li">Meeting Minutes: Automatically summarizing key points, actions, and decisions from meetings into concise minutes.</Typography> */}
        </Box>

        <Typography variant='h5' gutterBottom>
          3. User Responsibilities
        </Typography>
        <Typography variant='body1' paragraph>
          Users agree to:
        </Typography>
        <Box component='ul' sx={{ pl: 4 }}>
          <Typography component='li'>
            Provide accurate, current, and complete information during
            registration.
          </Typography>
          <Typography component='li'>
            Maintain the confidentiality of account credentials and notify us
            immediately of unauthorized use of your account.
          </Typography>
          <Typography component='li'>
            Comply with all applicable laws and not use our services for any
            unlawful or fraudulent purposes.
          </Typography>
        </Box>

        <Typography variant='h5' gutterBottom>
          4. Prohibited Activities
        </Typography>
        <Typography variant='body1' paragraph>
          Users may not:
        </Typography>
        <Box component='ul' sx={{ pl: 4 }}>
          <Typography component='li'>
            Attempt to breach or bypass security features of the site.
          </Typography>
          <Typography component='li'>
            Use the services to defraud, mislead, or impersonate others.
          </Typography>
          <Typography component='li'>
            Use Shothik AI for any illegal purposes, including sending harassing
            or harmful content.
          </Typography>
          <Typography component='li'>
            Reverse-engineer or misuse any part of the service.
          </Typography>
          <Typography component='li'>
            Share account credentials with unauthorized persons or resell the
            services without permission.
          </Typography>
        </Box>
        <Typography variant='body1' paragraph>
          Violation of any of these prohibitions may result in termination of
          your account and legal action.
        </Typography>

        <Typography variant='h5' gutterBottom>
          5. Intellectual Property
        </Typography>
        <Typography variant='body1' paragraph>
          All content, technology, and trademarks on Shothik AI are owned by the
          Company. Users are granted a limited, non-exclusive license to use the
          services for personal or internal business purposes only. No content
          may be reproduced, distributed, or publicly displayed without our
          express written consent.
        </Typography>

        <Typography variant='h5' gutterBottom>
          6. Payment for Services
        </Typography>
        <Typography variant='body1' paragraph>
          See our Payment Policy below for details on fees, billing, and
          subscription terms.
        </Typography>

        <Typography variant='h5' gutterBottom>
          7. Modifications to the Services
        </Typography>
        <Typography variant='body1' paragraph>
          Shothik AI reserves the right to modify, suspend, or discontinue any
          part of our services at any time, with or without notice.
        </Typography>

        <Typography variant='h5' gutterBottom>
          8. Disclaimer of Warranties
        </Typography>
        <Typography variant='body1' paragraph>
          Shothik AI services are provided “AS IS” and “AS AVAILABLE”. We do not
          guarantee that the services will meet your needs or be error-free. We
          disclaim all warranties, express or implied, including any warranties
          of merchantability or fitness for a particular purpose.
        </Typography>

        <Typography variant='h5' gutterBottom>
          9. Limitation of Liability
        </Typography>
        <Typography variant='body1' paragraph>
          In no event shall Shothik AI be liable for any direct, indirect,
          incidental, special, or consequential damages arising from the use of
          our services. This limitation applies to all claims, including but not
          limited to lost profits, service interruptions, or inaccuracies in
          service content.
        </Typography>

        <Typography variant='h5' gutterBottom>
          10. Governing Law and Dispute Resolution
        </Typography>
        <Typography variant='body1' paragraph>
          These Terms are governed by the laws of Bangladesh. Any disputes
          arising out of or related to these Terms or the use of our services
          will be settled in the courts of Bangladesh.
        </Typography>
      </Box>
    </BackgroundContainer>
  );
}
