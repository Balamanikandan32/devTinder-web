import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: () => null,
    deleteOneFeed: (state, action) =>
      state.filter((feed) => feed._id !== action.payload),
  },
});

export default feedSlice.reducer;
export const { addFeed, removeFeed, deleteOneFeed } = feedSlice.actions;
