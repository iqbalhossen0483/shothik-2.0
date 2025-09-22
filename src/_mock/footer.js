import { PATH_PAGE, PATH_TOOLS } from "../config/config/route";

export const LINKS = [
  {
    headline: "AI Writing Tools",
    children: [
      { name: "Paraphrasing", href: PATH_TOOLS.paraphrase },
      { name: "Humanize GPT", href: PATH_TOOLS.humanize },
      { name: "Summarizer", href: PATH_TOOLS.summarize },
      { name: "Grammar Checker", href: PATH_TOOLS.grammar },
      { name: "Translator", href: PATH_TOOLS.translator },
    ],
  },
  {
    headline: "Legal",
    children: [
      { name: "Terms of service ", href: PATH_PAGE.terms },
      { name: "Privacy policy", href: PATH_PAGE.privacy },
      { name: "Refund policy", href: PATH_PAGE.refundPolicy },
      { name: "Payment policy", href: PATH_PAGE.paymentPolicy },
    ],
  },

  {
    headline: "For Business",
    children: [
      { name: "Reseller Program", href: PATH_PAGE.resellerPanel },
      { name: "Affiliate Program", href: PATH_PAGE.affiliateMarketing },
      { name: "B2B Portfolios", href: "/b2b" },
    ],
  },
  {
    headline: "Company",
    children: [
      { name: "About us", href: PATH_PAGE.about },
      { name: "Our Team", href: PATH_PAGE.about },
      { name: "Career", href: PATH_PAGE.career },
      { name: "Blogs", href: PATH_PAGE.community },
      { name: "Contact us", href: PATH_PAGE.contact },
    ],
  },
  {
    headline: "Content Analysis",
    children: [{ name: "AI Detector", href: PATH_TOOLS.ai_detector }],
  },

  {
    headline: "Support",
    children: [
      { name: "Help center", href: "mailto:support@shothik.ai" },
      { name: "Tutorials", href: PATH_PAGE.tutorials },
      { name: "FAQs", href: PATH_PAGE.faqs },
      { name: "Join us on Discord", href: PATH_PAGE.discord },
    ],
  },
];
