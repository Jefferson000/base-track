import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => ({
        url: "company/",
      }),
    }),
  }),
});

export const {
    useGetCompanyQuery
} = companyApi;
