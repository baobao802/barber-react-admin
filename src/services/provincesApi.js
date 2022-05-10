import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  districtsMapper,
  provincesMapper,
  wardsMapper,
} from '../utils/mappers/provincesMapper';

export const provincesApi = createApi({
  reducerPath: 'provincesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://provinces.open-api.vn/api',
  }),
  endpoints: (builder) => ({
    getProvinces: builder.query({
      query: () => ({
        url: `/p/`,
      }),
      transformResponse: (res) => provincesMapper(res),
    }),
    getDistrictsByProvinceId: builder.query({
      query: (provinceId) => ({
        url: `/p/${provinceId}?depth=2`,
      }),
      transformResponse: (res) => districtsMapper(res.districts),
    }),
    getWardsByDistrictId: builder.query({
      query: (districtId) => ({
        url: `/d/${districtId}?depth=2`,
      }),
      transformResponse: (res) => wardsMapper(res.wards),
    }),
  }),
});

export const {
  useGetProvincesQuery,
  useLazyGetDistrictsByProvinceIdQuery,
  useLazyGetWardsByDistrictIdQuery,
} = provincesApi;
