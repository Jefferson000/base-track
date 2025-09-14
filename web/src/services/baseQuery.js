import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginSuccess, logoutSuccess } from "../features/authSlice";
import { ERROR_MESSAGES } from "../constants/errorConstants";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL, // Use environment variable for the base URL
  credentials: "include", // Ensures cookies (refresh token) are sent
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;
    const errorCode = result.error.data?.errorCode;

    console.error(`❌ API Error [${status}] - ${errorCode || "Unknown Error"}`);

    // Handle 498 (Ivalid/Expired Token) - Attempt token refresh
    if (status === 498) {
      console.log("🔄 498 detected, attempting token refresh...");

      const refreshResult = await baseQuery(
        { url: "auth/refresh", method: "POST" }, // Call refresh endpoint
        api,
        extraOptions
      );

      if (refreshResult.data) {
        console.log("✅ Token refresh successful. Retrying original request...");

        // Update Redux state with new user data
        api.dispatch(loginSuccess(refreshResult.data?.data));

        // Retry the original request with the new token
        return await baseQuery(args, api, extraOptions);
      } else {
        console.log("❌ Token refresh failed. Redirecting to login.");

        // Clear auth state and redirect to login
        api.dispatch(logoutSuccess());
        window.location.href = "/login";
      }
    }

    // Handle 400 (Client errors - validation, bad request)
    if (status === 400 || status === 404 || status === 498 || status === 401) {
      return {
        error: {
          status,
          message: ERROR_MESSAGES[errorCode] || "Invalid request. Please check your input.",
        },
      };
    }

    // Handle 500+ (Server errors)
    if (status >= 500) {
      return {
        error: {
          status,
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        },
      };
    }
  }
  
  return result;
};
