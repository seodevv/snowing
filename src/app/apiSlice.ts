import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setSecret, setUser } from './slice';
import { ContactInfo } from '../pages/contact/Contact';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL,
  credentials: 'include',
});

export interface index {
  id: number;
}

export interface Banner extends index {
  category?: string;
  type?: string;
  banner: string;
  image: string;
  show_main?: boolean;
}

export interface Brands extends index {
  brand: string;
  logo: string;
  image: string | null;
  category: string;
  desc: string;
}

export interface Category extends index {
  category: string;
  type: string;
  subject: string;
  order: number;
}

export interface ProductType extends index {
  category: string;
  type: string;
  image: string;
}

export interface ProductSubject extends index {
  category: string;
  type: string;
  subject: string;
  show_main: boolean;
  image: string;
}

export interface ProductList extends index {
  subjectName?: string;
  brandName?: string;
  brandLogo?: string | null;
  name: string;
  desc: string;
  price: number;
  image: string;
  order?: number;
  regist?: string;
  sell?: number;
}

export interface ProductNavigator extends index {
  category: string;
  type: string;
  subject: string;
  name: string;
}

export interface ProductSize extends index {
  sizeId: number;
  size: string;
  quantity: number;
}

export interface ProductDetail extends index {
  detail: number;
  text: string;
}

export interface Wish {
  result: boolean;
}

export interface Cart
  extends Pick<ProductList, 'id' | 'name' | 'image' | 'price'> {
  sizeId: number;
  size: string;
  quantity: number;
}

export interface CartItems extends Cart {
  user: number;
}

export interface Contact extends index {
  key: keyof ContactInfo;
  value: string;
}

export interface Size extends index {
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

export interface Enquire {
  result: boolean;
}

export interface Addresses extends index {
  userId: number;
  countryId: number;
  country: string;
  provinceId: number;
  province: string;
  lastName: string;
  firstName: string;
  postal_code: number;
  city: string;
  address: string;
  etc: string;
  phone: string;
  isDefault: boolean;
}

export interface Country {
  countryId: number;
  country: string;
}

export interface Province extends Country {
  provinceId: number;
  province: string;
}

export interface Response<T> {
  data: T;
  message: string;
}

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Product', 'Wish', 'Addresses'],
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
    getProductCategory: builder.query<Response<Category[]>, string>({
      query: (category) => `/get/product/category?category=${category}`,
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
        order: string;
        limit?: number;
        brand?: string;
        price?: number;
        size?: number[];
        category?: string;
        type?: string;
        subjects?: string[];
      }
    >({
      query: ({
        order,
        limit = 12,
        brand = '',
        price = '',
        size = [],
        category = '',
        type = '',
        subjects = [],
      }) => {
        let url = `/get/product/list?order=${order}&limit=${limit}`;
        url += brand ? `&brand=${brand}` : '';
        url += price ? `&price=${price}` : '';
        url += size.length !== 0 ? `&size=${size.toString()}` : '';
        url += category ? `&category=${category}` : '';
        url += type ? `&type=${type}` : '';
        url += subjects.length !== 0 ? `&subjects=${subjects.toString()}` : '';
        return url;
      },
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
    getCart: builder.query<Response<CartItems[]>, number>({
      query: (user) => `/get/product/cart?user=${user}`,
    }),
    getContact: builder.query<Response<Contact[]>, { key?: string[] }>({
      query: ({ key }) =>
        `/get/product/contact${key ? `?key=${key.toString()}` : ''}`,
    }),
    getBanner: builder.query<
      Response<Banner[]>,
      { type: 'type' | 'subject' | 'banner'; name?: string }
    >({
      query: ({ type, name }) => {
        let url = `/get/product/banner?type=${type}`;
        if (name) url += `&name=${name}`;
        return url;
      },
    }),
    getBrands: builder.query<
      Response<Brands[]>,
      { category?: string; brand?: string }
    >({
      query: ({ category, brand }) => {
        let url = '/get/product/brands?';
        url += category ? `category=${category}&` : '';
        url += brand ? `brand=${brand}` : '';
        return url;
      },
    }),
    getSizeGroup: builder.query<Response<Size[]>, void>({
      query: () => `/get/product/size/group`,
    }),
    getCountry: builder.query<Response<Country[]>, void>({
      query: () => '/get/my/country',
    }),
    getProvince: builder.query<Response<Province[]>, number>({
      query: (countryId) => `/get/my/province?countryId=${countryId}`,
    }),
    getAddresses: builder.query<Response<Addresses[]>, number>({
      query: (user) => `/get/my/address?user=${user}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((v) => ({
                type: 'Addresses' as const,
                id: v.id,
              })),
              { type: 'Addresses', id: 'LIST' },
            ]
          : [{ type: 'Addresses', id: 'LIST' }],
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
      invalidatesTags: () => [{ type: 'Wish', id: 'LIST' }],
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
    postCart: builder.mutation<
      Response<undefined>,
      {
        type: 'add' | 'delete' | 'increase' | 'decrease';
        items: Cart[];
        user: number;
      }
    >({
      query: (body) => ({
        url: '/post/product/cart',
        method: 'post',
        body,
      }),
      onQueryStarted: async (
        { type, items, user },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData('getCart', user, (draft) => {
              items.map((v) => {
                const index = draft.data.findIndex(
                  (d) => d.id === v.id && d.sizeId === v.sizeId
                );
                switch (type) {
                  case 'add':
                    if (index !== -1) {
                      draft.data[index].quantity++;
                    } else {
                      draft.data.push({ user, ...v });
                    }
                    break;
                  case 'delete':
                    if (index !== -1) draft.data.splice(index, 1);
                    break;
                  case 'increase':
                    if (index !== -1) draft.data[index].quantity++;
                    break;
                  case 'decrease':
                    if (index !== -1 && draft.data[index].quantity > 1)
                      draft.data[index].quantity--;
                    break;
                }
              });
            })
          );
        } catch (error) {}
      },
    }),
    postEnquire: builder.mutation<
      Response<Enquire>,
      {
        first: string;
        last: string;
        email: string;
        phone: string;
        message: string;
      }
    >({
      query: (body) => ({
        url: '/post/product/enquire',
        method: 'post',
        body,
      }),
    }),
    postAddress: builder.mutation<
      Response<void>,
      Omit<Addresses, 'country' | 'province'> & { type: 'add' | 'edit' }
    >({
      query: (body) => ({
        url: `/post/my/address/${body.type}`,
        method: 'post',
        body,
      }),
      invalidatesTags: [{ type: 'Addresses', id: 'LIST' }],
    }),
    deleteAddress: builder.mutation<Response<void>, number>({
      query: (id) => ({
        url: `/post/my/address/delete`,
        method: 'post',
        body: {
          id,
        },
      }),
      invalidatesTags: [{ type: 'Addresses', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useGetSecretQuery,
  useGetProductCategoryQuery,
  useGetProductTypeQuery,
  useGetProductSubjectQuery,
  useGetProductsListQuery,
  useGetProductsListByIdQuery,
  useGetProductNavigatorQuery,
  useGetProductSizeQuery,
  useGetProductDetailQuery,
  useGetWishQuery,
  useGetCartQuery,
  useGetContactQuery,
  useGetBannerQuery,
  useGetBrandsQuery,
  useGetSizeGroupQuery,
  useGetCountryQuery,
  useGetProvinceQuery,
  useGetAddressesQuery,
  useGetInstaFeedQuery,
  usePostSubscribeMutation,
  usePostLoginAppMutation,
  usePostLoginGoogleMutation,
  usePostLogoutMutation,
  usePostDuplicatedMutation,
  usePostAuthCodeMutation,
  usePostUserRegistMutation,
  usePostWishMutation,
  usePostCartMutation,
  usePostEnquireMutation,
  usePostAddressMutation,
  useDeleteAddressMutation,
} = apiSlice;
