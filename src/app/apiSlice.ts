import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL,
});

export interface MessageResponse {
  message?: string;
}

export interface ProductType {
  id: number;
  type: string;
  image: string;
}

export const initialProductType: ProductType = {
  id: -1,
  type: 'LOADING',
  image: 'LOADING.png',
};

export interface ProductSubject {
  id: number;
  type?: number;
  subject: string;
  show_main: boolean;
  image: string;
}

export const initialProductSubject: ProductSubject = {
  id: -1,
  subject: 'Loading',
  show_main: true,
  image: 'LOADING.png',
};

export interface ProductList {
  id?: number;
  subject?: number;
  name: string;
  price: number;
  image: string;
  size?: string;
  order?: number;
  regist?: string;
}

export const initialProductList: ProductList[] = Array(4)
  .fill(undefined)
  .map((_, i) => ({
    id: i,
    name: 'Loading Product',
    image: 'LOADING.png',
    price: 999999,
  }));

export interface ProductListXSubject extends ProductList {
  subjectName: string;
}

export interface ProductTypeResponse extends MessageResponse {
  data: ProductType[];
}

export interface ProductSubjectResponse extends MessageResponse {
  data: ProductSubject[];
}

export interface ProductListResponse extends MessageResponse {
  data: ProductList[];
}

export interface ProductMainListResponse extends MessageResponse {
  data: { subject: ProductSubject; list: ProductListXSubject[] };
}

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Type', 'Product'],
  endpoints: (builder) => ({
    getType: builder.query<ProductTypeResponse, void>({
      query: () => `/get/product/type`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((item) => ({
                type: 'Type' as const,
                id: item.id,
              })),
              { type: 'Type', id: 'LIST' },
            ]
          : [{ type: 'Type', id: 'LIST' }],
    }),
    getNewProducts: builder.query<ProductListResponse, void>({
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
    getMainProducts: builder.query<ProductMainListResponse, void>({
      query: () => `/get/product/list/main`,
      providesTags: (result) =>
        result?.data.list
          ? [
              ...result.data.list.map((item) => ({
                type: 'Product' as const,
                id: item.id,
              })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTypeQuery,
  useGetNewProductsQuery,
  useGetMainProductsQuery,
} = apiSlice;
