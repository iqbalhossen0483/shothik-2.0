import { createSlice } from "@reduxjs/toolkit";

let accessToken = null;
if (typeof window !== "undefined") {
  try {
    accessToken = localStorage.getItem("accessToken");
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
}

const initialState = {
  accessToken: accessToken ? accessToken : null,
  user: {},
  userLimit: [],
  isNewRegistered: false,
  showLoginModal: false,
  showRegisterModal: false,
  showForgotPasswordModal: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = {};
      localStorage.removeItem("accessToken");
    },
    getUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLimit: (state, action) => {
      state.userLimit = action.payload;
    },
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = { ...state.user, ...action.payload };
    },
    setIsNewRegistered: (state, action) => {
      state.isNewRegistered = action.payload;
    },
    setShowLoginModal: (state, action) => {
      state.showLoginModal = action.payload;
    },
    setShowRegisterModal: (state, action) => {
      state.showRegisterModal = action.payload;
    },
    setShowForgotPasswordModal: (state, action) => {
      state.showForgotPasswordModal = action.payload;
    },
  },
});

export const {
  loggedIn,
  logout,
  getUser,
  setUserLimit,
  setUser,
  updateUser,
  setIsNewRegistered,
  setShowLoginModal,
  setShowRegisterModal,
  setShowForgotPasswordModal,
} = authSlice.actions;

export default authSlice.reducer;
