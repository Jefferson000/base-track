import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    validate: builder.query({
      query: (token) => ({
        url: `auth/validate/${token}`,
        method: "GET",
      })
    }),
    recovery: builder.mutation({
      query: (email) => ({
        url: `auth/recovery/${email}`,
        method: "POST",
      })
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login/1",
        method: "POST",
        body: credentials,
      }),
    }),
    reset: builder.mutation({
      query: (credentials) => ({
        url: "auth/reset",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useValidateQuery,
  useRecoveryMutation,
  useLoginMutation,
  useResetMutation,
  useLogoutMutation,
} = authApi;