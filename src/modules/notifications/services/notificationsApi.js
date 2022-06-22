import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { notificationsMapper } from '../utils/mappers';

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}/notifications`,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.data?.accessToken;

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (page) => ({
        url: `/`,
      }),
      transformResponse: (res) => notificationsMapper(res.data),
    }),
    markAsReadNotification: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}/markAsRead/`,
        method: 'POST',
      }),
    }),
    removeNotification: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadNotificationMutation,
  useRemoveNotificationMutation,
} = notificationsApi;
