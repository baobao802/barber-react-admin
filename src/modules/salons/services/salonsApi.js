import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { salonMapper, salonsMapper } from '../utils/mappers';

export const salonsApi = createApi({
  reducerPath: 'salonsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}/account/salon`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.data?.accessToken;

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSalons: builder.query({
      query: (page) => ({
        url: `/?page=${page}&size=10`,
      }),
      transformResponse: (res) => salonsMapper(res.data),
    }),
    getSalonById: builder.query({
      query: (id) => ({
        url: `/${id}/`,
      }),
      transformResponse: (res) => salonMapper(res),
    }),
    deleteSalonById: builder.mutation({
      query: (id) => ({
        url: `/${id}/`,
        method: 'DELETE',
      }),
    }),
    getSalonServices: builder.query({
      query: (salonId) => ({
        url: `/services/`,
        body: {
          salon_id: salonId,
        },
      }),
      // transformResponse: (res) => salonServicesMapper(res),
    }),
  }),
});

export const {
  useGetSalonsQuery,
  useGetSalonByIdQuery,
  useGetSalonServicesQuery,
  useDeleteSalonByIdMutation,
} = salonsApi;
