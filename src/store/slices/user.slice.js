import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("tokenUser"),
  userId: localStorage.getItem("userId"),
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("tokenUser", state.token);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", state.userId);
    },
    removeToken: (state, action) => {
      state.token = action.payload;
      localStorage.removeItem("tokenUser");
      localStorage.removeItem("userId");
    },
  },
});

export const { addToken, removeToken, setUserId } = userSlice.actions;

export default userSlice.reducer;
