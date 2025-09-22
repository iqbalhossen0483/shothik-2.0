import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => ({
  showAlert: false,
  alertMessage: "",
});

const toolsSlice = createSlice({
  name: "tools",
  initialState: getInitialState(),
  reducers: {
    setShowAlert: (state, action) => {
      state.showAlert = action.payload;
    },
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload;
    },
  },
});

export const { setShowAlert, setAlertMessage } = toolsSlice.actions;

export default toolsSlice.reducer;
