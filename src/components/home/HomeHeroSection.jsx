import { SmartToy, Speed, VolumeUp } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Grid2 } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import * as motion from "motion/react-client";
import Image from "next/image";
import BgContainer from "./components/hero/BgContainer";
import Details from "./components/hero/Details";
import VideoImage from "./components/VideoImage";

export default function HomeHeroSection() {
  return (
    <BgContainer image='url(/home/bg.png)'>
      <Grid2
        sx={{
          pt: 4,
          pb: { xs: 2, sm: 2, md: 8, lg: 10, xl: 10 },
          px: { xs: 2, sm: 4, md: 6 },
        }}
        container
        alignItems='center'
        justifyContent='space-between'
      >
        <Details />
        <Grid2
          size={{ xs: 12, md: 6 }}
          sx={{ display: { xs: "none", md: "block", lg: "block" } }}
        >
          <Box
            sx={{
              position: "relative",
              right: { xs: 0, md: -150 },
            }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              sx={{
                position: "absolute",
                bottom: "-50px",
                right: "130px",
                zIndex: 0,
              }}
            >
              <Image
                src='/home/hero/box.svg'
                alt='button'
                width={140}
                height={140}
              />
            </Box>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                position: "absolute",
                bottom: "-50px",
                right: "130px",
                zIndex: 0,
              }}
            >
              <div>
                <Image
                  src='/home/hero/pattern.svg'
                  alt='button'
                  width={140}
                  height={140}
                />
              </div>
            </motion.div>

            {/* Hero Video */}
            <VideoImage
              lightImage='/home/hero/hero-light.webp'
              darkImage='/home/hero/hero-dark.webp'
              width={350}
              height={300}
            />

            {/* Additional Elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper
                elevation={4}
                sx={{
                  position: "absolute",
                  bottom: -60,
                  left: { md: -100, lg: -120 },
                  bgcolor: "rgba(33, 33, 33, 0.9)",
                  color: "white",
                  p: 1.5,
                  borderRadius: 1.5,
                  height: { md: "120px", lg: "140px" },
                  width: { md: "220px", lg: "260px" },
                  zIndex: 1,
                }}
              >
                <List
                  dense
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: { md: "0.8rem", lg: "1rem" },
                    },
                  }}
                >
                  <ListItem>
                    <ListItemIcon
                      sx={{
                        "& svg": {
                          width: { md: 16, lg: 24 },
                          height: { md: 16, lg: 24 },
                        },
                      }}
                    >
                      <VolumeUp
                        sx={{
                          color: "white",
                          borderRadius: "50%",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary='Match the tone' />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon
                      sx={{
                        "& svg": {
                          width: { md: 16, lg: 24 },
                          height: { md: 16, lg: 24 },
                        },
                      }}
                    >
                      <Speed sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary='Enhance your fluency' />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon
                      sx={{
                        "& svg": {
                          width: { md: 16, lg: 24 },
                          height: { md: 16, lg: 24 },
                        },
                      }}
                    >
                      <SmartToy sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary='Identify AI' />
                  </ListItem>
                </List>
              </Paper>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper
                elevation={2}
                sx={{
                  position: "absolute",
                  top: { md: 130, lg: 180, xl: 180 },
                  left: { md: -120 },
                  borderRadius: 2,
                  width: { md: 166, lg: 220, xl: 220 },
                  zIndex: 1,
                }}
              >
                <Image
                  src='/home/hero/button.png'
                  alt='button'
                  width={186}
                  height={48}
                />
              </Paper>
            </motion.div>
          </Box>
        </Grid2>
      </Grid2>
    </BgContainer>
  );
}

// Signin Button Renderer
export function SigninButtonRenderer({ title }) {
  return (
    <>
      <Button
        onClick={() => {
          dispatch(setIsSignUpModalOpen(false));
          dispatch(setIsSignInModalOpen(true));
        }}
        variant='contained'
        size='large'
        sx={{
          maxWidth: 202,
          borderRadius: "0.5rem",
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          "&::after": {
            content: '"›"',
            color: "#00A76F",
            flexShrink: 0,
          },
        }}
      >
        {title}
        <ArrowForwardIcon
          style={{ height: "1.25rem", width: "1.25rem", marginLeft: "0.5rem" }}
        />
      </Button>
    </>
  );
}
