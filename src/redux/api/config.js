import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  mode: "cors",
  baseUrl: process.env.NEXT_PUBLIC_API_URI,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token =
      getState()?.auth?.accessToken || localStorage.getItem("accessToken");

    headers.set("Access-Control-Allow-Origin", "*");
    if (endpoint !== "uploadImage") {
      headers.set("Content-Type", "application/json");
    }
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
