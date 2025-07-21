import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../config";

export const toolsApiSlice = createApi({
  reducerPath: "toolsApi",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    return result;
  },
  tagTypes: ["tools"],
  endpoints: (builder) => ({
    spellChecker: builder.mutation({
      query: (payload) => {
        return {
          url: "/bangla-speel-check",
          method: "POST",
          body: payload,
        };
      },
    }),
    paraphraseForTagging: builder.mutation({
      query: (payload) => ({
        // url: `${process.env.NEXT_PUBLIC_PARAPHRASE_API_URI}/paraphrase-for-tagging`,
        url: `/paraphrase-for-tagging`,
        method: "POST",
        body: payload,
      }),
    }),
    reportForSentence: builder.mutation({
      query: (payload) => {
        return {
          url: "/report/send-report",
          method: "POST",
          body: payload,
        };
      },
    }),
    paraphrased: builder.mutation({
      query: (payload) => ({
        // url: `${process.env.NEXT_PUBLIC_PARAPHRASE_API_URI}/paraphraseV2`,
        url: `/paraphraseV2`,
        method: "POST",
        body: payload,
      }),
    }),
    getUsesLimit: builder.query({
      query: (payload) => {
        return {
          url: "/uses-limit",
          method: "POST",
          body: payload,
        };
      },
    }),
    humanizeContend: builder.mutation({
      query: (payload) => {
        return {
          url: "/humanizerV4",
          method: "POST",
          body: payload,
        };
      },
    }),
    scanAidetector: builder.mutation({
      query: (payload) => {
        return {
          url: "/ai-detector",
          method: "POST",
          body: payload,
        };
      },
    }),
    getShareAidetectorContend: builder.query({
      query: (id) => {
        return {
          url: `/ai-detector/share/${id}`,
          method: "GET",
        };
      },
    }),
    researchTrending: builder.query({
      query: () => {
        return {
          url: "/research/trending-queries",
          method: "GET",
        };
      },
    }),
    getResearchQuestion: builder.mutation({
      query: (payload) => {
        return {
          url: "/research/questions",
          method: "POST",
          body: payload,
        };
      },
    }),
    getResearchMetaData: builder.query({
      query: (payload) => ({
        url: "/research/meta",
        method: "POST",
        body: payload,
      }),
      keepUnusedDataFor: 24 * 60 * 60,
      refetchOnMountOrArgChange: false,
    }),
    getAgentSession: builder.query({
      query: (payload) => ({
        url: "/agent/session",
        method: "POST",
        body: payload,
      }),
    }),
    getAgentSessionById: builder.query({
      query: (session_id) => ({
        url: `/agent/session/${session_id}`,
      }),
    }),
  }),
});

export const {
  useSpellCheckerMutation,
  useParaphraseForTaggingMutation,
  useReportForSentenceMutation,
  useParaphrasedMutation,
  useGetUsesLimitQuery,
  useHumanizeContendMutation,
  useScanAidetectorMutation,
  useGetShareAidetectorContendQuery,
  useResearchTrendingQuery,
  useGetResearchQuestionMutation,
  useGetResearchMetaDataQuery,
  useGetAgentSessionQuery,
  useGetAgentSessionByIdQuery,
} = toolsApiSlice;
