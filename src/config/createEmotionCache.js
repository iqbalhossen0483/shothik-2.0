import createCache from "@emotion/cache";

export default function createEmotionCache() {
  // This is a fix for MUI with Next.js 15+ and React 19
  // Using insertionPoint: '' ensures that styles are inserted in a way that's compatible with SSR
  return createCache({
    key: "css",
    prepend: true,
    // Adding this option helps prevent the 'insertBefore' error
    insertionPoint: typeof document !== "undefined" ? document.head : undefined,
  });
}
