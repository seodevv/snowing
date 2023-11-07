import { createSlice } from '@reduxjs/toolkit';
import { InstaFeeds, User } from './apiSlice';
import { RootState } from './store';

export interface commonState {
  secret: string;
  user: User | null;
  feed: { flag: boolean } & InstaFeeds;
  newsletter: { flag: boolean; email: string };
  signup: { flag: boolean; isSign: boolean };
  cart: boolean;
  filter: {
    brand: string;
    page: number;
    price: { flag: boolean; maxPrice: number };
    size: number[];
    sort: number;
    subjects: string[];
  };
  modal: {
    flag: boolean;
    message: string;
    onSubmit: (...args: any[]) => any;
    args: any[];
  };
}

export const loadingImage = `${process.env.REACT_APP_SERVER_URL}/files/loading.png`;

export const initialCommonState: commonState = {
  secret: '',
  user: null,
  feed: {
    flag: false,
    id: -1,
    media_type: 'IMAGE',
    media_url: loadingImage,
    permalink: '/',
    username: 'snowin.g',
    caption: '',
    timestamp: new Date().toISOString(),
  },
  newsletter: {
    flag: false,
    email: '',
  },
  signup: {
    flag: false,
    isSign: false,
  },
  cart: false,
  filter: {
    brand: 'all',
    page: 1,
    price: { flag: false, maxPrice: 1000000 },
    size: [],
    sort: 0,
    subjects: [],
  },
  modal: {
    flag: false,
    message: '',
    onSubmit: () => {},
    args: [],
  },
};

export const bodyScrollDisableHandler = (type: boolean) => {
  const body = document.querySelector('body') as HTMLBodyElement;
  if (type) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = 'unset';
  }
};

const slice = createSlice({
  name: 'common',
  initialState: initialCommonState,
  reducers: {
    setSecret: (state, action: { payload: commonState['secret'] }) => {
      state.secret = action.payload;
    },
    setUser: (state, action: { payload: User | boolean }) => {
      if (typeof action.payload === 'boolean') {
        state.user = null;
      } else {
        state.user = action.payload;
      }
    },
    showFeed: (state, action: { payload: InstaFeeds }) => {
      bodyScrollDisableHandler(true);
      state.feed = {
        flag: true,
        ...action.payload,
      };
    },
    closeFeed: (state) => {
      bodyScrollDisableHandler(false);
      state.feed = initialCommonState.feed;
    },
    showNewsletter: (state, action: { payload: string }) => {
      bodyScrollDisableHandler(true);
      state.newsletter = {
        flag: true,
        email: action.payload,
      };
    },
    closeNewsletter: (state) => {
      bodyScrollDisableHandler(false);
      state.newsletter = initialCommonState.newsletter;
    },
    showSignup: (state) => {
      bodyScrollDisableHandler(true);
      state.signup.flag = true;
    },
    closeSignup: (state) => {
      bodyScrollDisableHandler(false);
      state.signup = initialCommonState.signup;
    },
    showCart: (state) => {
      bodyScrollDisableHandler(true);
      state.cart = true;
    },
    closeCart: (state) => {
      bodyScrollDisableHandler(false);
      state.cart = false;
    },
    setFilter: (
      state,
      action: {
        payload: {
          brand?: string;
          page?: number;
          price?: { flag: boolean; maxPrice: number };
          size?: number[];
          sort?: number;
          subjects?: string[];
        };
      }
    ) => {
      const { brand, page, price, size, sort, subjects } = action.payload;
      state.filter.brand = brand ? brand : state.filter.brand;
      state.filter.page = page ? page : state.filter.page;
      state.filter.price = price ? price : state.filter.price;
      state.filter.size = size ? size : state.filter.size;
      state.filter.sort = typeof sort === 'number' ? sort : state.filter.sort;
      state.filter.subjects = subjects ? subjects : state.filter.subjects;
    },
    resetFilter: (state) => {
      state.filter = initialCommonState.filter;
    },
    showModal: (
      state,
      action: {
        payload: {
          message: commonState['modal']['message'];
          onSubmit: commonState['modal']['onSubmit'];
          args: commonState['modal']['args'];
        };
      }
    ) => {
      bodyScrollDisableHandler(true);
      state.modal = {
        flag: true,
        ...action.payload,
      };
    },
    closeModal: (state) => {
      bodyScrollDisableHandler(false);
      state.modal = initialCommonState.modal;
    },
  },
});

const reducer = slice.reducer;
export default reducer;
export const {
  setUser,
  setSecret,
  showFeed,
  closeFeed,
  showNewsletter,
  closeNewsletter,
  showSignup,
  closeSignup,
  showCart,
  closeCart,
  setFilter,
  resetFilter,
  showModal,
  closeModal,
} = slice.actions;
export const selectCommon = (state: RootState) => state.common;
export const selectUser = (state: RootState) => state.common.user;
export const selectSecret = (state: RootState) => state.common.secret;
export const selectFeed = (state: RootState) => state.common.feed;
export const selectNewsletter = (state: RootState) => state.common.newsletter;
export const selectSignup = (state: RootState) => state.common.signup;
export const selectCart = (state: RootState) => state.common.cart;
export const selectFilter = (state: RootState) => state.common.filter;
export const selectFilterBrand = (state: RootState) =>
  state.common.filter.brand;
export const selectFilterPage = (state: RootState) => state.common.filter.page;
export const selectFilterPrice = (state: RootState) =>
  state.common.filter.price;
export const selectFilterSize = (state: RootState) => state.common.filter.size;
export const selectFilterSort = (state: RootState) => state.common.filter.sort;
export const selectFilterSubjects = (state: RootState) =>
  state.common.filter.subjects;
export const selectModal = (state: RootState) => state.common.modal;
