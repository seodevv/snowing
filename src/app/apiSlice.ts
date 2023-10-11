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

export interface ProductSubject {
  id: number;
  type?: number;
  subject: string;
  show_main: boolean;
  image: string;
}

export interface ProductList {
  id?: number;
  subject?: number;
  subjectName?: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  order?: number;
  regist?: string;
  sell?: number;
}

export interface InstaFeeds {
  id: number | string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  username: string;
  caption: string;
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

export interface bannerResponse extends MessageResponse {
  data: ProductType[] | ProductSubject[];
}

export interface InstaFeedsResponse extends MessageResponse {
  data: {
    feeds: InstaFeeds[];
    isEnd: boolean;
  };
}

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProductType: builder.query<ProductTypeResponse, void>({
      query: () => `/get/product/type`,
    }),
    getProductSubject: builder.query<ProductSubjectResponse, void>({
      query: () => `/get/product/subject`,
    }),
    getProductsList: builder.query<ProductListResponse, { type: string }>({
      query: ({ type }) => `/get/product/list?type=${type}`,
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
    getBanner: builder.query<bannerResponse, { type: string }>({
      query: ({ type }) => `/get/product/banner?type=${type}`,
    }),
    getInstaFeed: builder.query<InstaFeedsResponse, number>({
      query: (page) => `/get/insta/feeds?page=${page}`,
    }),
  }),
});

export const {
  useGetProductTypeQuery,
  useGetProductSubjectQuery,
  useGetProductsListQuery,
  useGetBannerQuery,
  useGetInstaFeedQuery,
} = apiSlice;
