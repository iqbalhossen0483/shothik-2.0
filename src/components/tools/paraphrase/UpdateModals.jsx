import { Chip, Grid2, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";

export function MessageTemplate({
  title,
  chipLabels,
  chipBgColors,
  inputText,
  paraphrasedText,
}) {
  return (
    <Box
      sx={{
        "& .MuiChip-label": {
          fontSize: "14px",
          fontWeight: 500,
        },
        height: "100%",
        width: "100%",
        padding: 2,
        paddingTop: 5,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "background.paper",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          gutterBottom
          variant='subtitle1'
          sx={{
            overflow: "hidden",
            textAlign: "start",
            fontSize: "18px",
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          {title}
        </Typography>
        <Grid2 spacing={1}>
          <Grid2 size={{ xs: 12 }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {chipLabels.map((label, index) => (
                <Chip
                  key={index}
                  label={label}
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark"
                        ? ""
                        : chipBgColors[index] || "#e8f4ff",
                    borderRadius: "16px",
                    border: ".5px solid #00A76F",
                    color: (theme) =>
                      theme.palette.mode === "dark"
                        ? theme.palette.common.white
                        : theme.palette.common.black,
                  }}
                />
              ))}
            </Box>
          </Grid2>
        </Grid2>
      </Box>

      <Box
        sx={{
          display: "flex",
          mb: { xs: 2, sm: 2, md: 2 },
          gap: { xs: 2, sm: 0, md: 2 },
          flexDirection: { sm: "column", md: "column", lg: "row" },
          position: "relative",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant='subtitle1'
            sx={{
              fontWeight: 700,
              color: (theme) =>
                theme.palette.mode === "dark" ? "#34C759" : "#00A76F",
            }}
          >
            Input text
          </Typography>
          <Typography>{inputText}</Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: { xs: 0, md: 0, lg: 0 },
            right: { xs: "10%", md: "40%", lg: "42%", xl: "43%" },
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
          }}
        >
          <Box
            sx={{
              display: { xs: "block", sm: "none", md: "none", lg: "block" },
              transform: {
                xs: "scaleX(-1)",
                sm: "none",
                md: "none",
                lg: "none",
              },
            }}
          >
            <Image src='/fromTo.svg' alt='arrow' width={100} height={100} />
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant='subtitle1'
            sx={{
              fontWeight: 700,
              color: (theme) =>
                theme.palette.mode === "dark" ? "#34C759" : "#00A76F",
            }}
          >
            Paraphrased Text
          </Typography>
          <Typography>{paraphrasedText}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export function FormalMessage() {
  return (
    <MessageTemplate
      title='Formal Mode Uses'
      inputText='Joyful crowds gathered for the parade, cheering as floats and bands passed.'
      paraphrasedText='Delighted individuals gathered to witness the parade, offering applause as colorful floats and musical groups advanced.'
      chipLabels={[
        "Rephrasing for Formality",
        "Rewriting for Objectivity",
        "Avoiding Colloquialisms",
        "Rewriting for Professionalism",
      ]}
      chipBgColors={["#e8f4ff", "#e8f7f0", "#fff4e8", "#f3f0ff"]}
    />
  );
}

export function AcademicMessage() {
  return (
    <MessageTemplate
      title='Academic Mode Uses'
      mode='Academic'
      inputText='Joyful crowds gathered for the parade, cheering as floats and bands passed.'
      paraphrasedText='Enthusiastic attendees assembled for the event, expressing approval as vivid floats and musical ensembles proceeded.'
      chipLabels={[
        "Rephrasing for Academic Tone",
        "Rewriting for Clarity",
        "Avoiding Colloquialisms",
        "Rewriting for Professionalism",
      ]}
      chipBgColors={["#e8f4ff", "#e8f7f0", "#fff4e8", "#f3f0ff"]}
    />
  );
}

export function NewsMessage() {
  return (
    <MessageTemplate
      title='News Mode Uses'
      inputText='Joyful crowds gathered for the parade, cheering as floats and bands passed.'
      paraphrasedText='Excited crowds gathered for the parade, cheering while multicolored floats and energetic bands moved past.'
      chipLabels={[
        "Rephrasing for Newsworthiness",
        "Rewriting for Objectivity",
        "Rewriting for Journalistic Standards",
      ]}
      chipBgColors={["#e8f4ff", "#e8f7f0", "#fff4e8", "#f3f0ff"]}
    />
  );
}

export function SimpleMessage() {
  return (
    <MessageTemplate
      title='Simple Mode Uses'
      inputText='Joyful crowds gathered for the parade, cheering as floats and bands passed.'
      paraphrasedText='Happy people watched the parade, clapping as bright floats and bands went by.'
      chipLabels={[
        "Writing for Clarity",
        "Rewriting for Simplicity",
        "Using Simple Language",
        "Rewriting for Readability",
      ]}
      chipBgColors={["#e8f4ff", "#e8f7f0", "#fff4e8", "#f3f0ff"]}
    />
  );
}

export function CreativeMessage() {
  return (
    <MessageTemplate
      title='Creative Mode Uses'
      inputText='Joyful crowds gathered for the parade, cheering as floats and bands passed.'
      paraphrasedText='Radiant crowds filled the streets, celebrating each colorful float and every band’s rhythmic performance.'
      chipLabels={[
        "Writing for Clarity",
        "Rewriting for Creativity",
        "Using Engaging Language",
        "Rewriting for Emotional Connection",
      ]}
      chipBgColors={["#e8f4ff", "#e8f7f0", "#fff4e8", "#f3f0ff"]}
    />
  );
}

export function ShortMessage() {
  return (
    <MessageTemplate
      title='Short Mode Uses'
      inputText='Joyful crowds gathered for the parade, cheering as floats and bands passed.'
      paraphrasedText='Crowds cheered as floats and bands paraded through the streets with joy.'
      chipLabels={[
        "Writing for Clarity",
        "Rewriting for Brevity",
        "Using Clear Language",
        "Rewriting for Readability",
      ]}
      chipBgColors={["#e8f4ff", "#e8f7f0", "#fff4e8", "#f3f0ff"]}
    />
  );
}

export function LongMessage() {
  return (
    <MessageTemplate
      title='Long Mode Uses'
      inputText='Joyful crowds gathered for the parade, cheering as floats and bands passed.'
      paraphrasedText='Joyful and excited crowds thronged the streets for the grand parade, eagerly cheering as brightly decorated floats rolled by and spirited bands performed lively music, creating an atmosphere of celebration and unity.'
      chipLabels={[
        "Writing for Clarity",
        "Rewriting for Detail",
        "Avoiding Informal Tones",
        "Rewriting for Professionalism",
      ]}
      chipBgColors={["#e8f4ff", "#e8f7f0", "#fff4e8", "#f3f0ff"]}
    />
  );
}
