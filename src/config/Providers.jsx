"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "../redux/store";
import MUIProvider from "./MUIProvider";
import { NotificationProvider } from "./NotificationProvider";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <MUIProvider>
        <NotificationProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          >
            {children}
          </GoogleOAuthProvider>
        </NotificationProvider>
      </MUIProvider>
    </Provider>
  );
}
