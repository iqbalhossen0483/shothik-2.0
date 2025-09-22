import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./api/auth/authApiSlice";
import { blogApiSlice } from "./api/blog/blogApiSlice";
import { pricingApiSlice } from "./api/pricing/pricingApi";
import { toolsApiSlice } from "./api/tools/toolsApi";
import auth from "./slice/auth";
import inputOutput from "./slice/inputOutput";
import settings from "./slice/settings";
import tools from "./slice/tools";

const store = configureStore({
  reducer: {
    auth,
    inputOutput,
    settings,
    tools,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [blogApiSlice.reducerPath]: blogApiSlice.reducer,
    [pricingApiSlice.reducerPath]: pricingApiSlice.reducer,
    [toolsApiSlice.reducerPath]: toolsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApiSlice.middleware,
      blogApiSlice.middleware,
      pricingApiSlice.middleware,
      toolsApiSlice.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
