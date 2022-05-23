import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { salonServicesMapper } from '../utils/mappers';

export const salonServicesApi = createApi({
  reducerPath: 'salonServicesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.data?.accessToken;

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSalonServiceOptions: builder.query({
      query: () => ({
        url: `/services/`,
      }),
      transformResponse: (res) => res.data,
    }),
    getSalonServices: builder.query({
      query: () => ({
        url: `/salonServices/`,
      }),
      transformResponse: (res) => salonServicesMapper(res.data),
    }),
    createSalonServices: builder.mutation({
      query: (payload) => ({
        url: `/salonServices/`,
        method: 'POST',
        body: payload,
      }),
    }),
    removeSalonServiceById: builder.mutation({
      query: (id) => ({
        url: `/salonServices/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetSalonServicesQuery,
  useGetSalonServiceOptionsQuery,
  useCreateSalonServicesMutation,
  useRemoveSalonServiceByIdMutation,
} = salonServicesApi;
