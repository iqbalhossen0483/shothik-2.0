import { Box, Typography } from "@mui/material";
import * as motion from "motion/react-client";
import React from "react";
import { VideoPlayer } from "./VideoPlayer";

export const TestimonialsSection = () => {
  const slides = {
    src: "/b2b/men.jpeg",
    videoSrc: "https://storage.googleapis.com/shothik-core/400%2B_1.mp4",
    width: { xs: "80%", md: "40%" },
    height: "100%",
    name: "",
    title: "",
    vertical: false,
  };

  return (
    <Box>
      <Typography
        component={motion.p}
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        variant='body1'
        sx={{
          textAlign: "center",
          fontSize: { xs: "2rem", md: "3rem" },
          fontWeight: 600,
          lineHeight: { xs: "2.5rem", md: "3.9rem" },
          width: { xs: "100%", md: "60.625rem" },
          margin: "0 auto",
          mb: { xs: "2rem", md: "3rem" },
        }}
      >
        <Typography
          component='span'
          variant='h2'
          fontWeight={600}
          color='primary.darker'
        >
          Success Stories Worth Sharing:{" "}
        </Typography>
        See What Our B2B Client Says about Us
      </Typography>

      <Box
        sx={{
          width: { xs: "100%", md: "65.5625rem" },
          height: { xs: "auto", md: "37.5rem" },
          position: "relative",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "2rem", md: "0" },
        }}
      >
        <Box
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          sx={{
            position: { xs: "static", md: "absolute" },
            left: { md: "15rem" },
            top: { md: "0" },
            width: { xs: "100%", md: "22.5rem" },
            height: { xs: "15rem", md: "37.5rem" },
            background: "#005249",
            order: { xs: 2, md: 1 },
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <Box
            sx={{
              width: "6.1875rem",
              height: "4.51519rem",
              flexShrink: 0,
              position: "absolute",
              top: { xs: "1rem", md: "2.7rem" },
              right: { xs: "1rem", md: "2.38rem" },
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='99'
              height='74'
              viewBox='0 0 99 74'
              fill='none'
            >
              <path
                d='M76.4988 29.6268C77.5994 29.6268 78.6555 29.7909 79.7068 29.9405C79.3662 28.8209 79.0158 27.682 78.4532 26.6589C77.8906 25.1726 77.0121 23.8841 76.1385 22.5859C75.4081 21.1816 74.12 20.2309 73.1724 19.0292C72.1804 17.8614 70.8281 17.0844 69.7572 16.1144C68.7059 15.101 67.329 14.5943 66.2334 13.88C65.0884 13.2382 64.0914 12.5288 63.0254 12.191L60.3653 11.1196L58.0259 10.1689L60.4196 0.816406L63.3659 1.51133C64.3086 1.74297 65.4585 2.01322 66.7664 2.33655C68.1038 2.57785 69.5301 3.23899 71.1193 3.84222C72.6887 4.5275 74.5049 4.99078 76.1928 6.09108C77.8906 7.14312 79.8499 8.02143 81.5772 9.43058C83.2503 10.8832 85.2688 12.1427 86.7593 13.991C88.388 15.7187 89.9969 17.5332 91.2455 19.5987C92.6916 21.5676 93.6737 23.7296 94.7101 25.8675C95.6478 28.0053 96.4029 30.1915 97.0198 32.3148C98.1895 36.5713 98.7126 40.6153 98.915 44.0755C99.0828 47.5405 98.9841 50.4215 98.7768 52.5063C98.7028 53.4907 98.5646 54.4463 98.4659 55.1074L98.3425 55.9182L98.2142 55.8892C97.3364 59.8987 95.3156 63.5832 92.3857 66.5166C89.4558 69.45 85.7365 71.5124 81.658 72.4652C77.5794 73.418 73.3084 73.2223 69.3389 71.9006C65.3694 70.579 61.8636 68.1855 59.2271 64.997C56.5907 61.8085 54.9313 57.9553 54.4408 53.8831C53.9504 49.8109 54.649 45.6861 56.4559 41.986C58.2627 38.2858 61.1039 35.1614 64.6508 32.9743C68.1978 30.7871 72.3055 29.6266 76.4988 29.6268ZM22.2104 29.6268C23.311 29.6268 24.3671 29.7909 25.4183 29.9405C25.0778 28.8209 24.7274 27.682 24.1648 26.6589C23.6021 25.1726 22.7237 23.8841 21.8501 22.5859C21.1197 21.1816 19.8316 20.2309 18.884 19.0292C17.892 17.8614 16.5397 17.0844 15.4688 16.1144C14.4175 15.101 13.0406 14.5943 11.9449 13.88C10.8 13.2382 9.80302 12.5288 8.73699 12.191L6.07686 11.1196L3.73753 10.1689L6.13115 0.816406L9.07753 1.51133C10.0202 1.74297 11.1701 2.01322 12.478 2.33655C13.8154 2.57785 15.2417 3.23899 16.8309 3.84222C18.3954 4.53232 20.2165 4.99078 21.9044 6.0959C23.6021 7.14794 25.5615 8.02625 27.2888 9.4354C28.9619 10.888 30.9804 12.1475 32.4709 13.991C34.0996 15.7187 35.7085 17.5332 36.9571 19.5987C38.4031 21.5676 39.3853 23.7296 40.4217 25.8675C41.3594 28.0053 42.1145 30.1915 42.7314 32.3148C43.9011 36.5713 44.4242 40.6153 44.6266 44.0755C44.7944 47.5405 44.6957 50.4215 44.4884 52.5063C44.4144 53.4907 44.2762 54.4463 44.1775 55.1074L44.0541 55.9182L43.9258 55.8892C43.048 59.8987 41.0272 63.5832 38.0973 66.5166C35.1674 69.45 31.4481 71.5124 27.3696 72.4652C23.291 73.418 19.02 73.2223 15.0505 71.9006C11.081 70.579 7.5752 68.1855 4.93874 64.997C2.30228 61.8085 0.642853 57.9553 0.152428 53.8831C-0.337997 49.8109 0.360603 45.6861 2.16743 41.986C3.97427 38.2858 6.81549 35.1614 10.3624 32.9743C13.9094 30.7871 18.0171 29.6266 22.2104 29.6268Z'
                fill='white'
              />
            </svg>
          </Box>
        </Box>
        <Box
          component={motion.div}
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          sx={{
            position: { xs: "static", md: "absolute" },
            left: { md: "0" },
            top: { md: "6.14rem" },
            width: { xs: "100%", md: "25.125rem" },
            height: { xs: "15rem", md: "28rem" },
            maxWidth: { xs: "100%", md: "25.125rem" },
            maxHeight: { xs: "15rem", md: "28rem" },
            order: { xs: 1, md: 2 },
          }}
        >
          <VideoPlayer
            videoSrc={slides.videoSrc}
            thumbnailSrc={slides.src}
            name={slides.name}
            title={slides.title}
            sx={{
              width: "100%",
              height: "100%",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
              flexShrink: 0,
              borderRadius: "0.75rem",
              border: "1px solid #005249",
            }}
          />
        </Box>
        <Box
          component={motion.div}
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          sx={{
            position: { xs: "static", md: "absolute" },
            right: { md: "0" },
            top: { md: "10.14rem" },
            width: { xs: "100%", md: "38.625rem" },
            padding: "2rem",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1rem",
            borderRadius: "0.75rem",
            border: "1px solid #005249",
            background: "#FBFBFF",
            boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.05)",
            order: { xs: 3, md: 3 },
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              alignSelf: "stretch",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "0.125rem",
                alignItems: "center",
                gap: "0.5rem",
                alignSelf: "stretch",
                background: "#005249",
              }}
            />
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  alignSelf: "stretch",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.25rem",
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='16'
                    viewBox='0 0 18 16'
                    fill='none'
                  >
                    <path
                      d='M8.56442 0.589194C8.75568 0.249872 9.24432 0.249871 9.43558 0.589194L11.7443 4.68523C11.8156 4.81182 11.9385 4.9011 12.081 4.92984L16.6899 5.8598C17.0718 5.93684 17.2228 6.40156 16.9591 6.68831L13.777 10.1498C13.6787 10.2567 13.6317 10.4012 13.6484 10.5456L14.1882 15.2163C14.2329 15.6033 13.8376 15.8905 13.4834 15.7284L9.20808 13.7716C9.07595 13.7112 8.92405 13.7112 8.79192 13.7716L4.51655 15.7284C4.16238 15.8905 3.76706 15.6033 3.81178 15.2163L4.35159 10.5456C4.36828 10.4012 4.32134 10.2567 4.22299 10.1498L1.04086 6.68831C0.777243 6.40156 0.92824 5.93684 1.31006 5.8598L5.91904 4.92984C6.06149 4.9011 6.18438 4.81182 6.25573 4.68523L8.56442 0.589194Z'
                      fill='#005249'
                    />
                  </svg>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='16'
                    viewBox='0 0 18 16'
                    fill='none'
                  >
                    <path
                      d='M8.56442 0.589194C8.75568 0.249872 9.24432 0.249871 9.43558 0.589194L11.7443 4.68523C11.8156 4.81182 11.9385 4.9011 12.081 4.92984L16.6899 5.8598C17.0718 5.93684 17.2228 6.40156 16.9591 6.68831L13.777 10.1498C13.6787 10.2567 13.6317 10.4012 13.6484 10.5456L14.1882 15.2163C14.2329 15.6033 13.8376 15.8905 13.4834 15.7284L9.20808 13.7716C9.07595 13.7112 8.92405 13.7112 8.79192 13.7716L4.51655 15.7284C4.16238 15.8905 3.76706 15.6033 3.81178 15.2163L4.35159 10.5456C4.36828 10.4012 4.32134 10.2567 4.22299 10.1498L1.04086 6.68831C0.777243 6.40156 0.92824 5.93684 1.31006 5.8598L5.91904 4.92984C6.06149 4.9011 6.18438 4.81182 6.25573 4.68523L8.56442 0.589194Z'
                      fill='#005249'
                    />
                  </svg>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='16'
                    viewBox='0 0 18 16'
                    fill='none'
                  >
                    <path
                      d='M8.56442 0.589194C8.75568 0.249872 9.24432 0.249871 9.43558 0.589194L11.7443 4.68523C11.8156 4.81182 11.9385 4.9011 12.081 4.92984L16.6899 5.8598C17.0718 5.93684 17.2228 6.40156 16.9591 6.68831L13.777 10.1498C13.6787 10.2567 13.6317 10.4012 13.6484 10.5456L14.1882 15.2163C14.2329 15.6033 13.8376 15.8905 13.4834 15.7284L9.20808 13.7716C9.07595 13.7112 8.92405 13.7112 8.79192 13.7716L4.51655 15.7284C4.16238 15.8905 3.76706 15.6033 3.81178 15.2163L4.35159 10.5456C4.36828 10.4012 4.32134 10.2567 4.22299 10.1498L1.04086 6.68831C0.777243 6.40156 0.92824 5.93684 1.31006 5.8598L5.91904 4.92984C6.06149 4.9011 6.18438 4.81182 6.25573 4.68523L8.56442 0.589194Z'
                      fill='#005249'
                    />
                  </svg>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='16'
                    viewBox='0 0 18 16'
                    fill='none'
                  >
                    <path
                      d='M8.56442 0.589194C8.75568 0.249872 9.24432 0.249871 9.43558 0.589194L11.7443 4.68523C11.8156 4.81182 11.9385 4.9011 12.081 4.92984L16.6899 5.8598C17.0718 5.93684 17.2228 6.40156 16.9591 6.68831L13.777 10.1498C13.6787 10.2567 13.6317 10.4012 13.6484 10.5456L14.1882 15.2163C14.2329 15.6033 13.8376 15.8905 13.4834 15.7284L9.20808 13.7716C9.07595 13.7112 8.92405 13.7112 8.79192 13.7716L4.51655 15.7284C4.16238 15.8905 3.76706 15.6033 3.81178 15.2163L4.35159 10.5456C4.36828 10.4012 4.32134 10.2567 4.22299 10.1498L1.04086 6.68831C0.777243 6.40156 0.92824 5.93684 1.31006 5.8598L5.91904 4.92984C6.06149 4.9011 6.18438 4.81182 6.25573 4.68523L8.56442 0.589194Z'
                      fill='#005249'
                    />
                  </svg>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='16'
                    viewBox='0 0 18 16'
                    fill='none'
                  >
                    <path
                      d='M7.56442 1.58919C7.75568 1.24987 8.24432 1.24987 8.43558 1.58919L10.4269 5.1221C10.4982 5.24869 10.6211 5.33797 10.7636 5.36671L14.7389 6.16882C15.1207 6.24586 15.2717 6.71058 15.0081 6.99733L12.2634 9.98289C12.1651 10.0899 12.1182 10.2343 12.1348 10.3787L12.6004 14.4073C12.6452 14.7943 12.2498 15.0815 11.8957 14.9194L8.20808 13.2316C8.07595 13.1712 7.92405 13.1712 7.79192 13.2316L4.10434 14.9194C3.75016 15.0815 3.35484 14.7943 3.39956 14.4073L3.86516 10.3787C3.88185 10.2343 3.83491 10.0899 3.73656 9.98289L0.991913 6.99733C0.728299 6.71058 0.879296 6.24586 1.26111 6.16882L5.23645 5.36671C5.37889 5.33797 5.50178 5.24869 5.57313 5.1221L7.56442 1.58919Z'
                      fill='#005249'
                    />
                    <mask
                      id='mask0_1168_1141'
                      maskUnits='userSpaceOnUse'
                      x='0'
                      y='1'
                      width='16'
                      height='14'
                    >
                      <path
                        d='M7.56442 1.58919C7.75568 1.24987 8.24432 1.24987 8.43558 1.58919L10.4269 5.1221C10.4982 5.24869 10.6211 5.33797 10.7636 5.36671L14.7389 6.16882C15.1207 6.24586 15.2717 6.71058 15.0081 6.99733L12.2634 9.98289C12.1651 10.0899 12.1182 10.2343 12.1348 10.3787L12.6004 14.4073C12.6452 14.7943 12.2498 15.0815 11.8957 14.9194L8.20808 13.2316C8.07595 13.1712 7.92405 13.1712 7.79192 13.2316L4.10434 14.9194C3.75016 15.0815 3.35484 14.7943 3.39956 14.4073L3.86516 10.3787C3.88185 10.2343 3.83491 10.0899 3.73656 9.98289L0.991913 6.99733C0.728299 6.71058 0.879296 6.24586 1.26111 6.16882L5.23645 5.36671C5.37889 5.33797 5.50178 5.24869 5.57313 5.1221L7.56442 1.58919Z'
                        fill='#F5C252'
                      />
                    </mask>
                    <g mask='url(#mask0_1168_1141)'>
                      <rect
                        y='0.816406'
                        width='16'
                        height='15'
                        fill='#D9D9D9'
                      />
                    </g>
                  </svg>
                </Box>
                <Typography
                  sx={{
                    color: "#000",
                    fontFeatureSettings: '"liga" off, "clig" off',
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "1.5rem",
                  }}
                >
                  4/5
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "#1E1E1E",
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "1.5rem",
                }}
              >
                The team took time to understand our vision and delivered a
                sleek, professional site that not only looks great but also
                improved our conversion rates. Their design process was smooth,
                communication was clear, and they met all deadlines. We've
                received numerous compliments on the new site, and it's easier
                for customers to navigate. I can confidently say we'll be
                working with them again in the future."
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                background: "#005249",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#FFF",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "1.25rem",
                }}
              >
                SM
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "#000",
                fontFeatureSettings: '"liga" off, "clig" off',
                fontSize: { xs: "1rem", md: "1.125rem" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "1.875rem",
              }}
            >
              Sudip Majumder
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
