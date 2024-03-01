import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: localStorage.getItem('token') ? true : false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: state => {
    //   localStorage.setItem('token');
      state.isLoggedIn = true;
    },
    logoutUser: state => {
      localStorage.removeItem('token');
    //   localStorage.removeItem('userID');
      state.isLoggedIn = false;
    }
  }
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;