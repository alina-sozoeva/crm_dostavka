import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("tokenUser"),
  userId: localStorage.getItem("userId"),
  userPos: localStorage.getItem("userPos"),
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
    setUserPos: (state, action) => {
      state.userPos = action.payload;
      localStorage.setItem("userPos", state.userPos);
    },
    removeToken: (state) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem("tokenUser");
      localStorage.removeItem("userId");
      localStorage.removeItem("userPos");
    },
  },
});

export const { addToken, removeToken, setUserId, setUserPos } =
  userSlice.actions;

export default userSlice.reducer;
