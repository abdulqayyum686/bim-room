import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  key: "",
  projects: [],
  openProjects: [],
  userState: true,
  pluginMode: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setOpenProjects: (state, action) => {
      state.openProjects = action.payload;
    },
    setUserState: (state, action) => {
      state.userState = action.payload;
    },
    setPluginMode: (state, action) => {
      state.pluginMode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setKey, setProjects, setOpenProjects, setUserState, setPluginMode } = userSlice.actions;

export default userSlice.reducer;
