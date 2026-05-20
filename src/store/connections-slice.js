import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    setConnections: (state, action) => action.payload,
    removeConnections: () => null,
  },
});

export default connectionSlice.reducer;
export const { setConnections, removeConnections } = connectionSlice.actions;
