import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import feedReducer from "./feed-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default store;
