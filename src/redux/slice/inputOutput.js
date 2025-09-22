import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paraphrase: { input: {}, output: {} },
  humanize: { input: {}, output: {} },
  grammarFix: { input: {}, output: {} },
  summarize: { input: {}, output: {} },
  translator: { input: {}, output: {} },
};

const inputOutputSlice = createSlice({
  name: "inputOutput",
  initialState,
  reducers: {
    setParaphraseValues: (state, action) => {
      state.paraphrase[action.payload.type] = { ...action.payload.values };
    },
    setHumanizedValues: (state, action) => {
      state.humanize[action.payload.type] = { ...action.payload.values };
    },
    setGrammarFixValues: (state, action) => {
      state.grammarFix[action.payload.type] = { ...action.payload.values };
    },
    setSummarizeValues: (state, action) => {
      state.summarize[action.payload.type] = { ...action.payload.values };
    },
    setTranslatorValues: (state, action) => {
      state.translator[action.payload.type] = { ...action.payload.values };
    },
  },
});

export const {
  setParaphraseValues,
  setHumanizedValues,
  setGrammarFixValues,
  setSummarizeValues,
  setTranslatorValues,
} = inputOutputSlice.actions;
export default inputOutputSlice.reducer;
