import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL,
});

interface Product {
  data: {
    id: number;
    subject: number;
    name: string;
    price: number;
    image: string;
    size: string;
    order: number;
    regist: string;
  }[];
  message: string;
}

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getNewProducts: builder.query<Product, void>({
      query: () => `/get/product/new`,
      // transformResponse: (response: { data: Product }, meta, arg) => {
      //   return response.data;
      // },
      // transformErrorResponse: (
      //   response: { status: string | number },
      //   meta,
      //   arg
      // ) => response.status,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((item) => ({
                type: 'Product' as const,
                id: item.id,
              })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const { useGetNewProductsQuery } = apiSlice;
