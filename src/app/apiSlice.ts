import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setSecret, setUser } from './slice';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL,
  credentials: 'include',
});

export interface Product {
  id: number;
}

export interface Banner extends Product {
  type?: number;
  banner: string;
  image: string;
  show_main?: boolean;
}

export interface Brands extends Product {
  brand: string;
  logo: string;
}

export interface ProductType extends Product {
  type: string;
  image: string;
}

export interface ProductSubject extends Product {
  type?: number;
  subject: string;
  show_main: boolean;
  image: string;
}

export interface ProductList extends Product {
  subjectName?: string;
  brandName?: string;
  brandLogo?: string | null;
  name: string;
  desc: string;
  price: number;
  image: string;
  size: string;
  order?: number;
  regist?: string;
  sell?: number;
}

export interface ProductNavigator extends Product {
  type: string;
  subject: string;
  name: string;
}

export interface ProductSize extends Product {
  sizeId: number;
  size: string;
  quantity: number;
}

export interface ProductDetail extends Product {
  detail: number;
  text: string;
}

export interface Wish {
  result: boolean;
}

export interface Size extends Product {
  size: string;
  order?: number;
}

export interface InstaFeeds {
  id: number | string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  username: string;
  caption: string;
  timestamp: string;
}

export interface User {
  id: number;
  type: 'app' | 'google';
  email: string;
  nick: string;
  picture: string;
  phone: string | null;
  address: string | null;
  regist: string;
  result?: boolean;
}

export interface Duplcated {
  duplicated: boolean;
}

export interface Response<T> {
  data: T;
  message: string;
}

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Product', 'Wish'],
  endpoints: (builder) => ({
    getUserInfo: builder.query<Response<User>, void>({
      query: () => `/auth/user/login/info`,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
      providesTags: [{ type: 'User', id: 'LIST' }],
    }),
    getSecret: builder.query<Response<string>, void>({
      query: () => `/get/secret`,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(setSecret(data));
        } catch (error) {}
      },
    }),
    getProductType: builder.query<Response<ProductType[]>, void>({
      query: () => `/get/product/type`,
    }),
    getProductSubject: builder.query<Response<ProductSubject[]>, void>({
      query: () => `/get/product/subject`,
    }),
    getProductsList: builder.query<
      Response<ProductList[]>,
      {
        type: string;
        limit?: number;
        brand?: string;
        price?: number;
        size?: number[];
      }
    >({
      query: ({ type, limit = 12, brand = '', price = '', size = [] }) =>
        `/get/product/list?type=${type}&limit=${limit}&brand=${brand}&price=${price}&size=${size.toString()}`,
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
    getProductsListById: builder.query<
      Response<ProductList>,
      string | undefined
    >({
      query: (id) => `/get/product/list/${id}`,
      providesTags: (r, e, args) => [{ type: 'Product', id: args }],
    }),
    getProductNavigator: builder.query<
      Response<ProductNavigator>,
      string | undefined
    >({
      query: (id) => `/get/product/navigator?id=${id}`,
    }),
    getProductSize: builder.query<Response<ProductSize[]>, string | undefined>({
      query: (id) => `/get/product/size?id=${id}`,
    }),
    getProductDetail: builder.query<
      Response<ProductDetail[]>,
      string | undefined
    >({
      query: (id) => `/get/product/detail?id=${id}`,
    }),
    getWish: builder.query<Response<Wish>, { userId: number; listId: string }>({
      query: ({ userId, listId }) =>
        `/get/wish?userId=${userId}&listId=${listId}`,
      providesTags: (r, e, args) => [{ type: 'Wish', id: 'LIST' }],
    }),
    getBanner: builder.query<
      Response<Banner[]>,
      { type: 'type' | 'subject' | 'banner'; name?: string }
    >({
      query: ({ type, name }) =>
        `/get/product/banner?type=${type}&name=${name}`,
    }),
    getBrands: builder.query<Response<Brands[]>, void>({
      query: () => `/get/product/brands`,
    }),
    getSizeGroup: builder.query<Response<Size[]>, void>({
      query: () => `/get/product/size/group`,
    }),
    getInstaFeed: builder.query<
      Response<{ feeds: InstaFeeds[]; isEnd: boolean }>,
      number
    >({
      query: (page) => `/get/insta/feeds?page=${page}`,
    }),
    postSubscribe: builder.mutation<Response<string>, string>({
      query: (email) => ({
        url: '/post/mail/subscribe',
        method: 'post',
        body: { email },
      }),
    }),
    postLoginApp: builder.mutation<
      Response<User>,
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: '/auth/user/login/app',
        method: 'post',
        body: { email, password },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          if (data.result) {
            dispatch(setUser(data));
          }
        } catch (error) {}
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    postLoginGoogle: builder.mutation<
      Response<User>,
      { access_token: string; token_type: string }
    >({
      query: ({ access_token, token_type }) => ({
        url: '/auth/user/login/google',
        method: 'post',
        body: { access_token, token_type },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    postLogout: builder.mutation<Response<undefined>, void>({
      query: () => ({
        url: '/auth/user/logout',
        method: 'post',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(setUser(false));
        } catch (error) {}
      },
      invalidatesTags: (r, e, a) => [{ type: 'Wish', id: 'LIST' }],
    }),
    postDuplicated: builder.mutation<Response<Duplcated>, string>({
      query: (email) => ({
        url: '/auth/user/signup/duplicated',
        method: 'post',
        body: {
          email,
        },
      }),
    }),
    postAuthCode: builder.mutation<Response<string>, string>({
      query: (email) => ({
        url: '/auth/user/signup/code',
        method: 'post',
        body: {
          email,
        },
      }),
    }),
    postUserRegist: builder.mutation<
      Response<User>,
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: '/auth/user/signup/regist',
        method: 'post',
        body: {
          email,
          password,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    postWish: builder.mutation<
      Response<undefined>,
      { userId: number; listId: string }
    >({
      query: ({ userId, listId }) => ({
        url: '/post/wish',
        method: 'post',
        body: {
          userId,
          listId,
        },
      }),
      onQueryStarted: async (
        { userId, listId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              'getWish',
              { userId, listId },
              (draft) => {
                draft.data.result = !draft.data.result;
              }
            )
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useGetSecretQuery,
  useGetProductTypeQuery,
  useGetProductSubjectQuery,
  useGetProductsListQuery,
  useGetProductsListByIdQuery,
  useGetProductNavigatorQuery,
  useGetProductSizeQuery,
  useGetProductDetailQuery,
  useGetWishQuery,
  useGetBannerQuery,
  useGetBrandsQuery,
  useGetSizeGroupQuery,
  useGetInstaFeedQuery,
  usePostSubscribeMutation,
  usePostLoginAppMutation,
  usePostLoginGoogleMutation,
  usePostLogoutMutation,
  usePostDuplicatedMutation,
  usePostAuthCodeMutation,
  usePostUserRegistMutation,
  usePostWishMutation,
} = apiSlice;
