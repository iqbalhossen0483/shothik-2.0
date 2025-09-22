import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

export default function ToolsSepecigFaq({ tag, data }) {
  return (
    <Box>
      <Typography variant='h3' align='center'>
        Frequently Asked Questions
      </Typography>

      <Typography
        variant='body1'
        align='center'
        color='text.secondary'
        sx={{ mb: 5 }}
      >
        {tag}
      </Typography>

      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        {data.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 3 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                "&.Mui-expanded": {
                  minHeight: { xs: 64, sm: 64 },
                },
              }}
            >
              <Typography variant='subtitle1'>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                component='div'
                variant='body1'
                color='text.secondary'
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
