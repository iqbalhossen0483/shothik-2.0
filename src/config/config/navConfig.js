import SvgColor from "../../resource/SvgColor";
import { PATH_ACCOUNT, PATH_TOOLS } from "./route";

const icon = (name) => (
  <SvgColor src={`/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  humanize: icon("bypass-svgrepo-com"),
  ai_detector: icon("ai_detector_icon"),
  paraphrase: icon("paraphrase"),
  summarize: icon("summarize"),
  grammar: icon("grammar"),
  translator: icon("translator"),
  agents: icon("agents"),
  user: icon("user"),
};

const navConfig = [
  {
    subheader: "Services",
    items: [
      {
        title: "Paraphrase",
        path: PATH_TOOLS.paraphrase,
        icon: ICONS.paraphrase,
        id:"paraphrase_nav_item",
        iconColor: "#FF595E",
      },
      {
        title: "Humanize GPT",
        path: PATH_TOOLS.humanize,
        icon: ICONS.humanize,
        iconColor: "#FF595E",
      },
      {
        title: "AI Detector",
        path: PATH_TOOLS.ai_detector,
        icon: ICONS.ai_detector,
        iconColor: "#f29b18",
      },
      {
        title: "Grammar Fix",
        path: PATH_TOOLS.grammar,
        icon: ICONS.grammar,
        iconColor: "#8AC926",
      },
      {
        title: "Summarize",
        path: PATH_TOOLS.summarize,
        icon: ICONS.summarize,
        iconColor: "#FFAB00",
      },
      {
        title: "Translator",
        path: PATH_TOOLS.translator,
        icon: ICONS.translator,
        iconColor: "#A07EFB",
      },
      // {
      //   title: "AI Agents",
      //   path: PATH_TOOLS.agents,
      //   icon: ICONS.agents,
      //   iconColor: "#f29b18",
      // },
    ],
  },
  // ----------------------------------------------------------------------
  {
    subheader: "account",
    roles: ["user", "admin"],
    items: [
      {
        title: "Your account",
        path: PATH_ACCOUNT.settings.root,
        icon: ICONS.user,
        iconColor: "#3498DB",
      },
    ],
  },
];

const tools = [
  {
    icon: ICONS.paraphrase,
    title: "Paraphrase",
    description: "Text transformation",
    label: null,
    link: "/paraphrase",
    iconColor: "#FF595E",
  },
  {
    icon: ICONS.humanize,
    title: "Humanize GPT",
    description: "Overcome limitations",
    label: null,
    link: "/humanize-gpt",
    iconColor: "#FF595E",
  },
  {
    icon: ICONS.ai_detector,
    title: "AI Detector",
    description: "Authenticity checker",
    link: "/ai-detector",
    label: null,
    iconColor: "#f29b18",
  },
  {
    icon: ICONS.grammar,
    title: "Grammar Fix",
    description: "Error correction",
    label: null,
    link: "/grammar-check",
    iconColor: "#8AC926",
  },
  {
    icon: ICONS.summarize,
    title: "Summarize",
    description: "Content rephrasing",
    label: null,
    link: "/summarize",
    iconColor: "#FFAB00",
  },
  {
    icon: ICONS.translator,
    title: "Translator",
    description: "Language converter",
    label: null,
    link: "/translator",
    iconColor: "#A07EFB",
  },
  // {
  //   icon: ICONS.agents,
  //   title: "AI Agents",
  //   description: "Agentic Solutions",
  //   label: null,
  //   link: "/agents",
  //   iconColor: "#f29b18",
  // },
];

// export
export { navConfig as default, ICONS, tools };
