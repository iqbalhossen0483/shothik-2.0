import { languages } from "../_mock/tools/languages";

export const detectLanguage = (input) => {
  if (!input) return "Auto Detect";

  const langFrequency = new Map();
  for (let char of input) {
    const code = char.charCodeAt(0);

    for (let lang of languages) {
      if (code >= lang.range[0] && code <= lang.range[1]) {
        langFrequency.set(lang.name, (langFrequency.get(lang.name) || 0) + 1);
        break; // Stop checking after the first match to optimize performance
      }
    }
  }

  if (langFrequency.size === 0) return "Auto Detect";

  // Sort languages by frequency and return the most frequent one
  const mostFrequentLanguage = [...langFrequency.entries()].reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];
  return mostFrequentLanguage;
};
