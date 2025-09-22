// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_ACCOUNT = "/account";
const ROOTS_PAYMENT = "/payment";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  verify: path(ROOTS_AUTH, "/verify"),
  forgotPassword: path(ROOTS_AUTH, "/forgot-password"),
  newPassword: path(ROOTS_AUTH, "/new-password"),
};

export const PATH_PAGE = {
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  career: "career",
  faqs: "/faqs",
  page403: "/403",
  page404: "/404",
  page500: "/500",
  howToVideos: "/how-to-videos",
  resellerPanel: "/reseller-panel",
  affiliateMarketing: "/affiliate-marketing",
  community: "/blogs",
  blogDetail: (id) => `/blogs/${id}`,
  tutorials: "/tutorials",
  privacy: "/privacy",
  terms: "/terms",
  paymentPolicy: "/payment/payment-policy",
  refundPolicy: "/payment/refund-policy",
  discord: "https://discord.gg/pq2wTqXEpj",
};

export const PATH_ACCOUNT = {
  root: ROOTS_ACCOUNT,
  settings: {
    root: path(ROOTS_ACCOUNT, "/settings"),
    general: path(ROOTS_ACCOUNT, "/settings/?section=general"),
    billing: path(ROOTS_ACCOUNT, "/settings/?section=billing"),
  },
};

export const PATH_TOOLS = {
  discord: "https://discord.gg/pq2wTqXEpj",
  paraphrase: "/paraphrase",
  humanize: "/humanize-gpt",
  ai_detector: "/ai-detector",
  upgrade: "/payment/?subscription=RdEZI2hnuOuSgbk9KeT0&tenure=monthly",
  summarize: "/summarize",
  grammar: "/grammar-check",
  translator: "/translator",
  agents: "/agents",
  bangla_grammar: "/bangla-grammar-check",
  get: (name) => `/${name.toLowerCase().replaceAll(" ", "-")}`,
};

export const PAYMENT = {
  root: ROOTS_PAYMENT,
  bkash: path(ROOTS_PAYMENT, "/bkash"),
  stripe: path(ROOTS_PAYMENT, "/stripe"),
  razor: path(ROOTS_PAYMENT, "/razor"),
};
