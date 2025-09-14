import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => ({
        url: `user/${userId}`,
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
} = userApi;
