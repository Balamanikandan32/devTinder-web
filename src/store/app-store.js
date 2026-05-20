import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import feedReducer from "./feed-slice";
import connectionReducer from "./connections-slice";
import requestsReducer from "./requests-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestsReducer,
  },
});

export default store;
