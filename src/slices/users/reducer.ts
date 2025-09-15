import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  success: false,
  error: false,
  loading: false,
  userAdded: false,
  userUpdated: false,
  usersListSuccess: null,
  userData: null,
  userError: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userSuccess(state, action) {
      state.userData = action.payload;
      state.success = true;
      state.error = false;
    },

    userUpdated(state) {
      state.userUpdated = true;
      state.success = true;
      state.error = false;
    },
    userAdded(state) {
      state.userAdded = true;
      state.success = true;
      state.error = false;
    },

    usersListSuccess(state, action) {
      state.usersListSuccess = action.payload;
      state.success = true;
      state.error = false;
    },
    usersListError(state, action) {
      state.userError = action.payload;
      state.success = false;
      state.error = true;
    },
    usersError(state, action) {
      state.userError = action.payload;
      state.success = false;
      state.error = true;
    },
  },
});

export const {
  usersListSuccess,
  usersListError,
  userSuccess,
  usersError,
  userUpdated,
  userAdded,
} = usersSlice.actions;

export default usersSlice.reducer;
