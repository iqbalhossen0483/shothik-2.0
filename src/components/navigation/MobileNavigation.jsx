"use client";
import { Box, Tab, Tabs } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import useResponsive from "../../hooks/useResponsive";
import SvgColor from "../../resource/SvgColor";

const links = [
  {
    title: "Paraphrase",
    link: "/paraphrase",
    iconColor: "#FF595E",
    iconSrc: "/navbar/paraphrase.svg",
  },
  {
    title: "Humanize",
    link: "/humanize-gpt",
    iconColor: "#FF595E",
    iconSrc: "/navbar/bypass-svgrepo-com.svg",
  },
  {
    title: "AI Detector",
    link: "/ai-detector",
    iconColor: "#6A4C93",
    iconSrc: "/navbar/ai_detector_icon.svg",
  },
  {
    title: "Grammar",
    link: "/grammar-check",
    iconColor: "#8AC926",
    iconSrc: "/navbar/grammar.svg",
  },
  {
    title: "Summarize",
    link: "/summarize",
    iconColor: "#1982C4",
    iconSrc: "/navbar/summarize.svg",
  },
  {
    title: "Translator",
    link: "/translator",
    iconColor: "#6A4C93",
    iconSrc: "/navbar/translator.svg",
  },
  {
    title: "Research",
    link: "/research",
    iconColor: "#B71D18",
    iconSrc: "/navbar/research.svg",
  },
];

const MobileNavigation = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const isMobile = useResponsive("down", "sm");

  if (!isMobile) return null;


  const validPath = links.some((tab) => tab.link === pathname)
    ? pathname
    : false;

  return (
    <Box>
      <Tabs
        sx={{ mt: -1, paddingX: 2, justifyContent: "center" }}
        onChange={(e, newValue) => push(newValue)}
        scrollButtons={false}
        value={validPath}
      >
        {links.map((tab) => (
          <Tab
            key={tab.link}
            iconPosition='top'
            icon={
              <SvgColor
                sx={{ width: 30, height: 30 }}
                color={tab.iconColor}
                src={tab.iconSrc}
              />
            }
            value={tab.link}
            label={tab.title}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default MobileNavigation;
