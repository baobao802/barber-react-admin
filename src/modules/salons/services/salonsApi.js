import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { salonMapper, salonsMapper } from '../utils/mappers';

export const salonsApi = createApi({
  reducerPath: 'salonsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}/salons`,
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
      query: ({ search, status, page }) => ({
        url: `?page=${page - 1}&size=10&q=${search}&status=${status}`,
      }),
      transformResponse: (res) => salonsMapper(res.data),
    }),
    getSalonById: builder.query({
      query: (id) => ({
        url: `/${id}/`,
      }),
      transformResponse: (res) => salonMapper(res.data),
    }),
    updateSalonById: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
    }),
    deleteSalonById: builder.mutation({
      query: (id) => ({
        url: `/${id}/`,
        method: 'DELETE',
      }),
    }),
    getSalonServices: builder.query({
      query: (salonId) => ({
        url: `/services/${salonId}`,
      }),
      // transformResponse: (res) => salonServicesMapper(res),
    }),
    getSalonImages: builder.query({
      query: (salonId) => ({
        url: `/${salonId}/gallery/`,
      }),
      transformResponse: (res) => res.data,
    }),
    uploadImages: builder.mutation({
      query: ({ salonId, payload }) => ({
        url: `/${salonId}/galleryUpload/`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (res) => res.data.photos,
    }),
  }),
});

export const {
  useGetSalonsQuery,
  useGetSalonByIdQuery,
  useGetSalonServicesQuery,
  useUpdateSalonByIdMutation,
  useDeleteSalonByIdMutation,
  useUploadImagesMutation,
  useGetSalonImagesQuery,
} = salonsApi;
