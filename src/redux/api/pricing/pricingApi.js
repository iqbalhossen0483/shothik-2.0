import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../config";

export const pricingApiSlice = createApi({
  reducerPath: "pricingApi",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (!result) {
      console.error("Unexpected API response:", result);
      return {
        error: { status: "CUSTOM_ERROR", message: "Invalid API response" },
      };
    }
    return result;
  },
  tagTypes: ["Pricing"],
  endpoints: (builder) => ({
    getPricingPlans: builder.query({
      query: () => {
        return {
          url: "/pricing/feature/list",
          method: "GET",
        };
      },
    }),
    getAppMode: builder.query({
      query: () => {
        return {
          url: "/dashboard/get-app-mode",
          method: "GET",
        };
      },
    }),
    bkashPayment: builder.mutation({
      query: (payload) => {
        return {
          url: "/payment/bkash/create",
          method: "POST",
          body: payload,
        };
      },
    }),
    razorPayment: builder.mutation({
      query: (payload) => {
        return {
          url: "/payment/razor/create",
          method: "POST",
          body: payload,
        };
      },
    }),
    stripePayment: builder.mutation({
      query: (payload) => {
        return {
          url: "/payment/stripe/create",
          method: "POST",
          body: payload,
        };
      },
    }),
    getTransaction: builder.query({
      query: (user) => {
        const { userId, packageName } = user;
        if (!userId || !packageName) {
          return null;
        }
        return {
          url: `/transection/check-package-expiry/${userId}/${packageName}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetPricingPlansQuery,
  useGetTransactionQuery,
  useGetAppModeQuery,
  useBkashPaymentMutation,
  useRazorPaymentMutation,
  useStripePaymentMutation,
} = pricingApiSlice;
