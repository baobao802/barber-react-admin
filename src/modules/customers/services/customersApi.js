import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { customerDetailsMapper, customersMapper } from '../utils/mappers';

export const customersApi = createApi({
  reducerPath: 'customersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}/account/user`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.data?.accessToken;

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: (page) => ({
        url: `?page=${page}&size=10`,
      }),
      transformResponse: (res) => customersMapper(res),
    }),
    getCustomerById: builder.query({
      query: (id) => ({
        url: `/${id}/`,
      }),
      transformResponse: (res) => customerDetailsMapper(res.data),
    }),
    deleteCustomerById: builder.mutation({
      query: (id) => ({
        url: `/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useDeleteCustomerByIdMutation,
} = customersApi;
