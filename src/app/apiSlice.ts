import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setSecret, setUser } from './slice';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL,
  credentials: 'include',
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

export interface StringResponse extends MessageResponse {
  data: string;
}

export interface LoginResponse extends MessageResponse {
  data: User;
}

export interface DuplicatedResponse extends MessageResponse {
  data: Duplcated;
}

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Product'],
  endpoints: (builder) => ({
    getUserInfo: builder.query<LoginResponse, void>({
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
    getSecret: builder.query<StringResponse, void>({
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
    postSubscribe: builder.mutation<StringResponse, string>({
      query: (email) => ({
        url: '/post/mail/subscribe',
        method: 'post',
        body: { email },
      }),
    }),
    postLoginApp: builder.mutation<
      LoginResponse,
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
      LoginResponse,
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
    postLogout: builder.mutation<MessageResponse, void>({
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
    }),
    postDuplicated: builder.mutation<DuplicatedResponse, string>({
      query: (email) => ({
        url: '/auth/user/signup/duplicated',
        method: 'post',
        body: {
          email,
        },
      }),
    }),
    postAuthCode: builder.mutation<StringResponse, string>({
      query: (email) => ({
        url: '/auth/user/signup/code',
        method: 'post',
        body: {
          email,
        },
      }),
    }),
    postUserRegist: builder.mutation<
      LoginResponse,
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
  }),
});

export const {
  useGetUserInfoQuery,
  useGetSecretQuery,
  useGetProductTypeQuery,
  useGetProductSubjectQuery,
  useGetProductsListQuery,
  useGetBannerQuery,
  useGetInstaFeedQuery,
  usePostSubscribeMutation,
  usePostLoginAppMutation,
  usePostLoginGoogleMutation,
  usePostLogoutMutation,
  usePostDuplicatedMutation,
  usePostAuthCodeMutation,
  usePostUserRegistMutation,
} = apiSlice;
