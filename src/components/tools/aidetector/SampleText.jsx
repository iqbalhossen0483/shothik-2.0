import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const gptModel = [
  {
    name: "Chat GPT",
    icon: "/tools/chatgpt.svg",
    text: "chatgpt",
  },
  {
    name: "Claude",
    icon: "/tools/claude.svg",
    text: "claude",
  },
  {
    name: "Llama",
    icon: "/tools/llama.svg",
    text: "llama",
  },
  {
    name: "Human",
    icon: "/tools/human.svg",
    text: "human",
  },
];

function SampleTextForMobile({ setOpen, isMini }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const height = window.innerHeight;
      const scrollHeight = window.scrollY;
      if (scrollHeight + height - 100 > height) setShow(false);
      else setShow(true);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!show) return null;
  return (
    <Stack
      sx={{
        position: "fixed",
        bottom: 2,
        left: { xs: 0, sm: isMini ? 105 : 290 },
        right: 5,
        zIndex: 100,
      }}
    >
      <Card
        onClick={() => setOpen(true)}
        sx={{
          paddingX: 3,
          paddingY: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderRadius: 50,
          mt: 3,
        }}
      >
        <Box sx={{ width: 24, height: 24 }}>
          <img src='/tools/sample.svg' alt='sample' />
        </Box>
        <Typography>Sample Text</Typography>
      </Card>
    </Stack>
  );
}

const SampleTextForLarge = ({
  isDrawer = false,
  setOpen,
  handleSampleText,
}) => {
  const handleClick = (text) => {
    handleSampleText(text);
    if (isDrawer) {
      setOpen(false);
    }
  };

  return (
    <Stack
      justifyContent='center'
      sx={{
        height: "100%",
        paddingX: 3,
        paddingY: isDrawer ? 3 : 0,
        position: "relative",
      }}
    >
      {isDrawer && (
        <IconButton
          sx={{ position: "absolute", top: 2, right: 2, zIndex: 50 }}
          onClick={() => setOpen(false)}
        >
          <Close />
        </IconButton>
      )}

      <Box sx={{ marginLeft: isDrawer ? 0 : 4 }}>
        <Card
          sx={{
            width: isDrawer ? "100%" : 250,
            boxShadow: isDrawer ? "none" : undefined,
          }}
        >
          <Stack direction='column' spacing={0.5} sx={{ paddingY: 1 }}>
            {gptModel.map((item, index) => (
              <Button
                variant='soft'
                color='inherit'
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 2,
                  paddingY: 1,
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                onClick={() => handleClick(item.text)}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    filter: (theme) =>
                      theme.palette.mode === "dark" ? "invert(1)" : "none",
                  }}
                >
                  <img src={item.icon} alt={item.name} />
                </Box>
                <Typography variant='body2'>{item.name}</Typography>
              </Button>
            ))}
          </Stack>
        </Card>
        <Stack
          direction='column'
          alignItems={isDrawer ? "center" : "flex-start"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isDrawer ? "center" : "flex-start",
              gap: 0.5,
              mt: 3,
            }}
          >
            <img src='/tools/language.svg' alt='language' />
            <Typography fontWeight={600}>Supported languages:</Typography>
          </Box>
          <Typography sx={{ mt: 0.5, mb: 1 }}>
            English, French and Spanish
          </Typography>
          <Typography
            fontSize={15}
            sx={{
              borderBottom: "1px solid #333",
              width: "fit-content",
              cursor: "pointer",
              ...(isDrawer && {
                color: "text.secondary",
              }),
            }}
          >
            Request more languages
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

function SampleText({
  isMobile,
  isDrawer = false,
  setOpen,
  handleSampleText,
  isMini,
}) {
  if (isMobile)
    return (
      <>
        <Dialog
          maxWidth='xs'
          fullWidth
          open={isDrawer}
          onClose={() => setOpen(false)}
        >
          <SampleTextForLarge
            isDrawer={true}
            setOpen={setOpen}
            handleSampleText={handleSampleText}
          />
        </Dialog>
        <SampleTextForMobile setOpen={setOpen} isMini={isMini} />
      </>
    );
  else
    return (
      <SampleTextForLarge
        handleSampleText={handleSampleText}
        setOpen={setOpen}
        isDrawer={isDrawer}
      />
    );
}

export default SampleText;
