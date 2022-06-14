import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { bookingDetailsMapper, bookingsMapper } from '../utils/mappers';

export const bookingsApi = createApi({
  reducerPath: 'bookingsApi',
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
    getBookings: builder.query({
      query: ({ search, status, page }) => ({
        url: `/salonBookings/?page=${
          page - 1
        }&size=10&search=${search}&status=${status}`,
      }),
      transformResponse: (res) => bookingsMapper(res.data),
    }),
    getBookingById: builder.query({
      query: (id) => ({
        url: `/bookings/${id}/`,
      }),
      transformResponse: (res) => bookingDetailsMapper(res.data),
    }),
  }),
});

export const { useGetBookingsQuery, useGetBookingByIdQuery } = bookingsApi;
