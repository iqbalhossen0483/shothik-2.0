import { Extension } from "@tiptap/core";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { Node } from "@tiptap/react";
import { Plugin, PluginKey, TextSelection } from "prosemirror-state";

// ---------------------- user input box  extension start ----------------------
function processDecorations(doc, { limit, frozenWords, frozenPhrases }) {
  const decorations = [];
  const sentenceMap = new Map();
  const decoratedPositions = new Set();
  let wordCount = 0;

  doc.descendants((node, pos) => {
    if (!node.isText) return;
    const text = node.text;
    const lowerText = text.toLowerCase();

    // === 1. Word Limit ===
    const wordRegex = /\b\w+\b/g;
    let match;
    while ((match = wordRegex.exec(text)) !== null) {
      wordCount++;
      if (wordCount > limit) {
        const from = pos + match.index;
        const to = from + match[0].length;
        decorations.push(
          Decoration.inline(from, to, { class: "word-limit-exceeded" })
        );
      }
    }

    // === 2. Frozen Phrases ===
    const sortedPhrases = Array.from(frozenPhrases || []).sort(
      (a, b) => b.length - a.length
    );
    for (const phrase of sortedPhrases) {
      const phraseLower = phrase.toLowerCase().trim();
      const escaped = phraseLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "gi");
      let match;
      while ((match = regex.exec(lowerText)) !== null) {
        const from = pos + match.index;
        const to = from + match[0].length;
        if (!isOverlapping(from, to, decoratedPositions)) {
          markDecorated(from, to, decoratedPositions);
          decorations.push(
            Decoration.inline(from, to, { class: "frozen-word" })
          );
        }
      }
    }

    // === 3. Frozen Words ===
    wordRegex.lastIndex = 0; // reset regex
    while ((match = wordRegex.exec(lowerText)) !== null) {
      const word = match[0];
      if (frozenWords?.has(word)) {
        const from = pos + match.index;
        const to = from + word.length;
        if (!isOverlapping(from, to, decoratedPositions)) {
          markDecorated(from, to, decoratedPositions);
          decorations.push(
            Decoration.inline(from, to, { class: "frozen-word" })
          );
        }
      }
    }

    // === 4. Duplicate Sentences (collect for now) ===
    const sentenceRegex = /[^.!?]+[.!?]+/g;
    while ((match = sentenceRegex.exec(text)) !== null) {
      const sentence = match[0].trim().toLowerCase();
      if (!sentence) continue;
      const from = pos + match.index;
      const to = from + match[0].length;
      if (!sentenceMap.has(sentence)) sentenceMap.set(sentence, []);
      sentenceMap.get(sentence).push({ from, to });
    }
  });

  // === 5. Apply duplicate sentence highlights ===
  for (const [, ranges] of sentenceMap.entries()) {
    if (ranges.length > 1) {
      for (const { from, to } of ranges) {
        decorations.push(
          Decoration.inline(from, to, { class: "duplicate-sentence" })
        );
      }
    }
  }

  return DecorationSet.create(doc, decorations);
}
function isOverlapping(from, to, set) {
  for (let i = from; i < to; i++) {
    if (set.has(i)) return true;
  }
  return false;
}
function markDecorated(from, to, set) {
  for (let i = from; i < to; i++) set.add(i);
}
export const CombinedHighlighting = Extension.create({
  name: "combinedHighlighting",

  addOptions() {
    return {
      limit: 100,
      frozenWords: new Set(),
      frozenPhrases: new Set(),
    };
  },

  // addProseMirrorPlugins() {
  //   return [
  //     new Plugin({
  //       key: new PluginKey("combinedHighlighting"),

  //       props: {
  //         decorations: (state) => {
  //           return processDecorations(state.doc, this.options);
  //         },
  //       },
  //     }),
  //   ];
  // },
  addProseMirrorPlugins() {
    const pluginKey = new PluginKey("combinedHighlighting");

    return [
      new Plugin({
        key: pluginKey,

        state: {
          init: (_, state) => ({
            frozenWords: this.options.frozenWords,
            frozenPhrases: this.options.frozenPhrases,
            decorations: processDecorations(state.doc, {
              limit: this.options.limit,
              frozenWords: this.options.frozenWords,
              frozenPhrases: this.options.frozenPhrases,
            }),
          }),

          apply: (tr, pluginState, oldState, newState) => {
            const meta = tr.getMeta("combinedHighlighting");

            let frozenWords = pluginState.frozenWords;
            let frozenPhrases = pluginState.frozenPhrases;

            if (meta?.frozenWords) frozenWords = meta.frozenWords;
            if (meta?.frozenPhrases) frozenPhrases = meta.frozenPhrases;

            if (tr.docChanged || meta) {
              return {
                frozenWords,
                frozenPhrases,
                decorations: processDecorations(newState.doc, {
                  limit: this.options.limit,
                  frozenWords,
                  frozenPhrases,
                }),
              };
            }

            return pluginState;
          },
        },

        props: {
          decorations: (state) =>
            pluginKey.getState(state)?.decorations || DecorationSet.empty,
        },
      }),
    ];
  },
});
export const EnterWatcher = Extension.create({
  name: "enterWatcher",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { state, view } = editor;
        const { tr, selection, doc, schema } = state;
        const { from } = selection;

        // === Step 1: Count current sentenceNode to generate index ===
        let maxIndex = 0;
        doc.descendants((node) => {
          if (node.type.name === "spanNode") {
            const index = parseInt(node.attrs["data-sentence-index"]);
            if (!isNaN(index) && index > maxIndex) {
              maxIndex = index;
            }
          }
        });

        const nextSentenceIndex = maxIndex + 1;

        const sentenceNode = schema.nodes.spanNode.create(
          {
            "data-sentence-index": nextSentenceIndex,
            class: "sentence-span",
          },
          []
        );

        const paragraphNode = schema.nodes.paragraph.create({}, [sentenceNode]);

        const newTr = tr.insert(from, paragraphNode);

        // === Step 3: Move cursor into the new wordNode ===
        const resolvedPos = newTr.doc.resolve(from + 3); // Rough offset
        const newSelection = TextSelection.near(resolvedPos);

        view.dispatch(newTr.setSelection(newSelection).scrollIntoView());

        return true;
      },
    };
  },
});
export const CursorWatcher = Extension.create({
  name: "cursorWatcher",

  addOptions() {
    return {
      enabled: true,
      onActiveSentenceChange: () => {},
    };
  },

  addProseMirrorPlugins() {
    const { onActiveSentenceChange, enabled } = this.options;
    return [
      new Plugin({
        props: {
          decorations(state) {
            // Check if extension is enabled
            if (!enabled) {
              return DecorationSet.empty;
            }

            const { from, empty } = state.selection;
            if (!empty) return null;

            const decorations = [];
            let foundIndex = -1;

            state.doc.descendants((node, pos) => {
              if (node.type.name === "spanNode") {
                const sentenceStart = pos;
                const sentenceEnd = pos + node.nodeSize;

                if (from >= sentenceStart && from <= sentenceEnd) {
                  foundIndex =
                    parseInt(node.attrs["data-sentence-index"]) || -1;
                  decorations.push(
                    Decoration.node(sentenceStart, sentenceEnd, {
                      class: "active-sentence",
                    })
                  );
                }
              }
            });
            // ✅ Call the React callback
            onActiveSentenceChange?.(foundIndex);

            return DecorationSet.create(state.doc, decorations);
          },
        },
      }),
    ];
  },
});

export const SpanNode = Node.create({
  name: "spanNode",

  group: "inline",
  inline: true,
  content: "text*",

  addAttributes() {
    return {
      "data-sentence-index": {
        default: null,
      },
      class: {
        default: "sentence-span",
      },
    };
  },

  parseHTML() {
    return [{ tag: "span.sentence-span" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0];
  },
});

// --------------------- user input box extension end ---------------------------

// --------------------- output editor extension start --------------------------
const getColorStyle = (type, dark = false) => {
  const adJectiveVerbAdverbColor = dark ? "#ef5c47" : "#d95645";
  const nounColor = dark ? "#b6bdbd" : "#530a78";
  const phraseColor = dark ? "#b6bdbd" : "#051780";
  const freezeColor = "#006ACC";

  if (/NP/.test(type)) return adJectiveVerbAdverbColor;
  if (/VP/.test(type)) return nounColor;
  if (/PP|CP|AdvP|AdjP/.test(type)) return phraseColor;
  if (/freeze/.test(type)) return freezeColor;
  return "inherit";
};
export const wordSentenceDecorator = (data, activeSentenceIndexes = []) => {
  return new Plugin({
    key: new PluginKey("wordSentenceDecorator"),
    props: {
      decorations(state) {
        const decorations = [];
        let pos = 1; // starting inside paragraph node

        data.forEach((sentence, sIndex) => {
          const sentenceStart = pos;
          sentence.forEach((wordObj, wIndex) => {
            const word = wordObj.word;
            const space = /^[.,;]$/.test(word) || word.endsWith("'") ? "" : " ";

            // Add the space *before* the word
            pos += space.length;

            const from = pos;
            const to = from + word.length;

            decorations.push(
              Decoration.inline(from, to, {
                nodeName: "span",
                class: `word-span ${
                  activeSentenceIndexes.includes(sIndex)
                    ? "active-sentence"
                    : ""
                }`,
                "data-word": word,
                "data-type": wordObj.type,
                "data-sentence-index": sIndex,
                "data-word-index": wIndex,
                style: `color:${getColorStyle(wordObj.type)}; cursor:pointer;`,
              })
            );

            pos = to;
          });
          const sentenceEnd = pos;
          decorations.push(
            Decoration.inline(sentenceStart, sentenceEnd, {
              nodeName: "span",
              class: "sentence-span",
              "data-sentence-index": sIndex,
            })
          );
        });

        return DecorationSet.create(state.doc, decorations);
      },
    },
  });
};

export const SentenceNode = Node.create({
  name: "sentenceNode",

  group: "inline",
  inline: true,
  content: "wordNode*",

  addAttributes() {
    return {
      "data-sentence-index": {
        default: null,
      },
      class: {
        default: "sentence-span",
      },
    };
  },

  parseHTML() {
    return [{ tag: "span.sentence-span" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0];
  },
});
export const WordNode = Node.create({
  name: "wordNode",

  group: "inline",
  inline: true,
  content: "text*",

  addAttributes() {
    return {
      "data-sentence-index": { default: null },
      "data-word-index": { default: null },
      "data-type": { default: null },
      class: { default: "word-span" },
      style: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: "span.word-span" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0];
  },
});
export const EnterHandler = Extension.create({
  name: "enterHandler",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { state, view } = editor;
        const { tr, selection, doc, schema } = state;
        const { from } = selection;

        // === Step 1: Count current sentenceNode to generate index ===
        let maxIndex = 0;
        doc.descendants((node) => {
          if (node.type.name === "sentenceNode") {
            const index = parseInt(node.attrs["data-sentence-index"]);
            if (!isNaN(index) && index > maxIndex) {
              maxIndex = index;
            }
          }
        });

        const nextSentenceIndex = maxIndex + 1;

        // === Step 2: Create new sentenceNode with one wordNode ===
        const wordNode = schema.nodes.wordNode.create(
          {
            "data-sentence-index": nextSentenceIndex,
            "data-word-index": 1,
            "data-type": "",
            class: "word-span",
            style: "color:inherit;cursor:pointer",
          },
          schema.text(" ") // <-- Use non-breaking space to avoid RangeError
        );

        const sentenceNode = schema.nodes.sentenceNode.create(
          {
            "data-sentence-index": nextSentenceIndex,
            class: "sentence-span",
          },
          [wordNode]
        );

        const paragraphNode = schema.nodes.paragraph.create({}, [sentenceNode]);

        const newTr = tr.insert(from, paragraphNode);

        // === Step 3: Move cursor into the new wordNode ===
        const resolvedPos = newTr.doc.resolve(from + 3); // Rough offset
        const newSelection = TextSelection.near(resolvedPos);

        view.dispatch(newTr.setSelection(newSelection).scrollIntoView());

        return true;
      },
    };
  },
});

export const CursorHandler = Extension.create({
  name: "cursorHandler",

  addOptions() {
    return {
      onActiveSentenceChange: () => {},
      activeSentence: -1,
      enabled: true,
    };
  },

  addProseMirrorPlugins() {
    const { onActiveSentenceChange, activeSentence, enabled } = this.options;

    return [
      new Plugin({
        props: {
          decorations: (state) => {
            // Check if extension is enabled
            if (!enabled) {
              return DecorationSet.empty;
            }

            const { from, empty } = state.selection;
            if (!empty) return DecorationSet.empty;

            const decorations = [];
            let foundIndex = -1;

            state.doc.descendants((node, pos) => {
              if (
                activeSentence &&
                node.type.name === "sentenceNode" &&
                parseInt(node.attrs["data-sentence-index"]) === activeSentence
              ) {
                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    class: "active-sentence",
                  })
                );
              } else if (node.type.name === "sentenceNode") {
                const sentenceStart = pos;
                const sentenceEnd = pos + node.nodeSize;

                if (from >= sentenceStart && from <= sentenceEnd) {
                  foundIndex =
                    parseInt(node.attrs["data-sentence-index"]) || -1;
                  decorations.push(
                    Decoration.node(sentenceStart, sentenceEnd, {
                      class: "active-sentence",
                    })
                  );
                }
              }
            });

            onActiveSentenceChange?.(foundIndex);
            return DecorationSet.create(state.doc, decorations);
          },
        },
      }),
    ];
  },
});
// -------------------- output editor extension end -----------------------------

export const protectedSingleWords = [
  "affidavit",
  "alibi",
  "arraignment",
  "bail",
  "civil",
  "contract",
  "conviction",
  "defendant",
  "evidence",
  "felony",
  "indictment",
  "injunction",
  "jurisdiction",
  "litigation",
  "misdemeanor",
  "negligence",
  "parole",
  "plaintiff",
  "precedent",
  "probation",
  "statute",
  "subpoena",
  "tort",
  "verdict",
  "warrant",
  "testimony",
  "appeal",
  "acquittal",
  "prosecutor",
  "discovery",
  "settlement",
  "pleading",
  "hearsay",
  "damages",
  "liable",
  "indemnity",
  "algorithm",
  "api",
  "bandwidth",
  "binary",
  "bit",
  "blockchain",
  "cache",
  "compiler",
  "cybersecurity",
  "database",
  "debugging",
  "encryption",
  "firewall",
  "frontend",
  "backend",
  "function",
  "hashing",
  "http",
  "https",
  "inheritance",
  "latency",
  "query",
  "recursion",
  "runtime",
  "server",
  "sql",
  "nosql",
  "syntax",
  "token",
  "variable",
  "websocket",
  "container",
  "docker",
  "pipeline",
  "dns",
  "jwt",
  "oauth",
  "middleware",
  "callback",
  "throttle",
  "debounce",
  "webrtc",
  "endpoint",
  "webhook",
  "acetaminophen",
  "antibiotic",
  "aspirin",
  "biopsy",
  "cardiovascular",
  "cholesterol",
  "diabetes",
  "diagnosis",
  "dosage",
  "epidural",
  "fever",
  "hypertension",
  "ibuprofen",
  "infection",
  "injection",
  "insulin",
  "intubation",
  "nausea",
  "neurosurgery",
  "paracetamol",
  "penicillin",
  "pharmacy",
  "placebo",
  "prescription",
  "radiology",
  "respiratory",
  "surgery",
  "symptom",
  "tablet",
  "therapy",
  "ultrasound",
  "vaccine",
  "x-ray",
  "anesthesia",
  "allergy",
  "oncology",
  "dermatology",
  "hematology",
  "nephrology",
  "cardiology",
  "neurology",
  "gynecology",
  "psychiatry",
  "pathology",
  "urinalysis",
  "eczema",
  "psoriasis",
  "bronchitis",
  "migraine",
  "sinusitis",
  "covid",
  "flu",
  "hepatitis",
  "arthritis",
  "cancer",
  "tumor",
  "glucose",
  "metformin",
  "omeprazole",
  "amoxicillin",
  "morphine",
  "insomnia",
  "depression",
  "anxiety",
  "bmi",
  "javascript",
  "typescript",
  "python",
  "php",
  "ruby",
  "java",
  "go",
  "rust",
  "swift",
  "kotlin",
  "dart",
  "html",
  "css",
  "scss",
  "graphql",
  "mongodb",
  "mysql",
  "postgresql",
  "sqlite",
  "redis",
  "firebase",
  "supabase",
  "typeorm",
  "prisma",
  "vite",
  "webpack",
  "babel",
  "eslint",
  "prettier",
  "jest",
  "mocha",
  "cypress",
  "vitest",
  "expo",
  "graphql",
];
export const protectedPhrases = [
  "common law",
  "plea bargain",
  "defense attorney",
  "due process",
  "cross-examination",
  "voir dire",
  "case law",
  "data structure",
  "cloud computing",
  "machine learning",
  "neural network",
  "object-oriented",
  "load balancer",
  "microservice",
  "rest api",
  "ci/cd",
  "ip address",
  "rate limiting",
  "event loop",
  "peer-to-peer",
  "ct scan",
  "blood pressure",
  "heart rate",
  "node js",
  "react js",
  "next js",
  "vue js",
  "express js",
  "spring boot",
  "nuxt js",
  "nest js",
  "tailwind css",
  "material ui",
  "react native",
];

export const data = [
  [
    {
      word: "This",
      type: "NP",
      synonyms: [
        "That",
        "It",
        "These",
        "Those",
        "Such",
        "Here",
        "There",
        "Thing",
        "Item",
        "One",
      ],
    },
    {
      word: "is",
      type: "VP",
      synonyms: [
        "be",
        "exists",
        "appears",
        "remains",
        "seems",
        "acts",
        "becomes",
        "stays",
        "lies",
        "occurs",
      ],
    },
    {
      word: "a",
      type: "NP",
      synonyms: [
        "one",
        "an",
        "any",
        "each",
        "some",
        "the",
        "this",
        "that",
        "certain",
        "particular",
      ],
    },
    {
      word: "sentence",
      type: "NP",
      synonyms: [
        "statement",
        "phrase",
        "clause",
        "expression",
        "utterance",
        "remark",
        "comment",
        "declaration",
        "assertion",
        "note",
      ],
    },
    {
      word: ".",
      type: "dot",
      synonyms: [],
    },
  ],
  [
    {
      word: "Another",
      type: "NP",
      synonyms: [
        "Additional",
        "Extra",
        "Second",
        "New",
        "Different",
        "Spare",
        "Alternative",
        "Further",
        "More",
        "Fresh",
      ],
    },
    {
      word: "line",
      type: "NP",
      synonyms: [
        "row",
        "string",
        "text",
        "phrase",
        "sentence",
        "series",
        "stream",
        "sequence",
        "stroke",
        "boundary",
      ],
    },
    {
      word: "here",
      type: "AdvP",
      synonyms: [
        "there",
        "nearby",
        "around",
        "in this place",
        "at this location",
        "on site",
        "locally",
        "right here",
        "present",
        "this side",
      ],
    },
    {
      word: ".",
      type: "dot",
      synonyms: [],
    },
  ],
  [
    {
      word: "The",
      type: "NP",
      synonyms: [
        "A",
        "An",
        "This",
        "That",
        "Each",
        "Every",
        "One",
        "Some",
        "Any",
        "Certain",
      ],
    },
    {
      word: "quick",
      type: "AdjP",
      synonyms: [
        "fast",
        "swift",
        "rapid",
        "speedy",
        "brisk",
        "nimble",
        "hasty",
        "prompt",
        "agile",
        "fleet",
      ],
    },
    {
      word: "brown",
      type: "AdjP",
      synonyms: [
        "tan",
        "beige",
        "khaki",
        "umber",
        "bronze",
        "chestnut",
        "sepia",
        "russet",
        "tawny",
        "brunette",
      ],
    },
    {
      word: "fox",
      type: "NP",
      synonyms: [
        "vixen",
        "canid",
        "predator",
        "animal",
        "creature",
        "beast",
        "sly-boots",
        "trickster",
        "varmint",
        "reynard",
      ],
    },
    {
      word: "jumps",
      type: "VP",
      synonyms: [
        "leaps",
        "bounds",
        "springs",
        "hops",
        "vaults",
        "skips",
        "bounces",
        "pounces",
        "clears",
        "hurdles",
      ],
    },
    {
      word: ".",
      type: "dot",
      synonyms: [],
    },
  ],
  [
    {
      word: "JavaScript",
      type: "NP",
      synonyms: [
        "JS",
        "ECMAScript",
        "TypeScript",
        "Node.js",
        "React",
        "Angular",
        "Vue",
        "jQuery",
        "script",
        "code",
      ],
    },
    {
      word: "is",
      type: "VP",
      synonyms: [
        "be",
        "exists",
        "appears",
        "remains",
        "seems",
        "acts",
        "becomes",
        "stays",
        "proves",
        "stands",
      ],
    },
    {
      word: "very",
      type: "AdvP",
      synonyms: [
        "extremely",
        "highly",
        "greatly",
        "immensely",
        "truly",
        "exceedingly",
        "remarkably",
        "intensely",
        "acutely",
        "awfully",
      ],
    },
    {
      word: "popular",
      type: "AdjP",
      synonyms: [
        "widespread",
        "common",
        "famous",
        "well-liked",
        "fashionable",
        "trendy",
        "prevalent",
        "in-demand",
        "celebrated",
        "favored",
      ],
    },
    {
      word: ".",
      type: "dot",
      synonyms: [],
    },
  ],
  [
    {
      word: "Good",
      type: "AdjP",
      synonyms: [
        "Excellent",
        "Fine",
        "Quality",
        "Superior",
        "Great",
        "Beneficial",
        "Valuable",
        "Positive",
        "Helpful",
        "Effective",
      ],
    },
    {
      word: "data",
      type: "NP",
      synonyms: [
        "information",
        "facts",
        "figures",
        "statistics",
        "details",
        "input",
        "evidence",
        "records",
        "intelligence",
        "material",
      ],
    },
    {
      word: "requires",
      type: "VP",
      synonyms: [
        "needs",
        "demands",
        "necessitates",
        "entails",
        "involves",
        "calls for",
        "warrants",
        "commands",
        "obliges",
        "compels",
      ],
    },
    {
      word: "careful",
      type: "AdjP",
      synonyms: [
        "meticulous",
        "thorough",
        "cautious",
        "prudent",
        "diligent",
        "attentive",
        "scrupulous",
        "conscientious",
        "thoughtful",
        "precise",
      ],
    },
    {
      word: "thought",
      type: "NP",
      synonyms: [
        "consideration",
        "reflection",
        "contemplation",
        "deliberation",
        "reasoning",
        "analysis",
        "idea",
        "concept",
        "meditation",
        "planning",
      ],
    },
    {
      word: ".",
      type: "dot",
      synonyms: [],
    },
  ],
  [
    {
      word: "Can",
      type: "VP",
      synonyms: [
        "Could",
        "May",
        "Might",
        "Will",
        "Would",
        "Shall",
        "Should",
        "Able to",
        "Permitted to",
        "Capable of",
      ],
    },
    {
      word: "you",
      type: "NP",
      synonyms: [
        "yourself",
        "one",
        "the user",
        "the reader",
        "the recipient",
        "thee",
        "thou",
        "y'all",
        "ye",
        "viewer",
      ],
    },
    {
      word: "generate",
      type: "VP",
      synonyms: [
        "create",
        "produce",
        "make",
        "form",
        "originate",
        "devise",
        "formulate",
        "develop",
        "construct",
        "build",
      ],
    },
    {
      word: "some",
      type: "NP",
      synonyms: [
        "a few",
        "several",
        "any",
        "certain",
        "various",
        "multiple",
        "a bit of",
        "a little",
        "a quantity of",
        "part of",
      ],
    },
    {
      word: "code",
      type: "NP",
      synonyms: [
        "script",
        "program",
        "instructions",
        "source",
        "text",
        "syntax",
        "commands",
        "algorithm",
        "logic",
        "markup",
      ],
    },
    {
      word: "?",
      type: "dot",
      synonyms: [],
    },
  ],
  [
    {
      word: "She",
      type: "NP",
      synonyms: [
        "Her",
        "Herself",
        "This woman",
        "That lady",
        "The female",
        "One",
        "The individual",
        "The person",
        "Girl",
        "Gal",
      ],
    },
    {
      word: "writes",
      type: "VP",
      synonyms: [
        "composes",
        "authors",
        "drafts",
        "pens",
        "scribes",
        "creates",
        "records",
        "documents",
        "inscribes",
        "types",
      ],
    },
    {
      word: "with",
      type: "PP",
      synonyms: [
        "using",
        "by",
        "through",
        "via",
        "possessing",
        "having",
        "employing",
        "alongside",
        "in",
        "by means of",
      ],
    },
    {
      word: "great",
      type: "AdjP",
      synonyms: [
        "immense",
        "tremendous",
        "considerable",
        "significant",
        "profound",
        "superb",
        "excellent",
        "remarkable",
        "outstanding",
        "exceptional",
      ],
    },
    {
      word: "clarity",
      type: "NP",
      synonyms: [
        "clearness",
        "lucidity",
        "precision",
        "simplicity",
        "coherence",
        "perspicuity",
        "transparency",
        "intelligibility",
        "explicitness",
        "legibility",
      ],
    },
    {
      word: ".",
      type: "dot",
      synonyms: [],
    },
  ],
];

export const formatedSen = [
  "This is a sentence.",
  "Another line here.",
  "The quick brown fox jumps.",
  "JavaScript is very popular.",
  "Good data requires careful thought.",
  "Can you generate some code?",
  "She writes with great clarity.",
];
