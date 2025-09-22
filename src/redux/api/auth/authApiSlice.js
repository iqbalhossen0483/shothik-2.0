import { createApi } from "@reduxjs/toolkit/query/react";
import { logout } from "../../slice/auth";
import { baseQuery } from "../config";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      api.dispatch(logout());
      localStorage.clear();
    }
    return result;
  },
  tagTypes: ["user-limit", "User"],
  endpoints: (builder) => ({}),
});
