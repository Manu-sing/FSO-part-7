import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action) {
      const message = action.payload;
      return { ...state, message: message };
    },
    removeNotification(state) {
      return { ...state, message: "" };
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export const handleNotification = (message) => {
  return async (dispatch) => {
    await dispatch(addNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 4000);
  };
};

export default notificationSlice.reducer;
