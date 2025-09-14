import { createSlice } from "@reduxjs/toolkit";
import { useLogoutMutation } from "../services/authService";
import { decrypt } from "../utils/encript";

const storedUser = localStorage.getItem("image") ? decrypt(localStorage.getItem("image")) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser || null,
    isAuthenticated: !!storedUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const decryptedUser = decrypt(action.payload);
      if (decryptedUser) {
        state.user = decryptedUser;
        state.isAuthenticated = true;
        localStorage.setItem("image", action.payload); // Store encrypted data
      } else {
        console.error("Decryption failed during login.");
      }
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("image");
    },
  },
});

// Export the logout API call as a thunk
export const logoutUser = () => async (dispatch) => {
  try {
    await useLogoutMutation(); // Call the logout API
    dispatch(logoutSuccess()); // Clear Redux state and local storage
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
