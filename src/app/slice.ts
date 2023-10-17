import { createSlice } from '@reduxjs/toolkit';
import { InstaFeeds, User } from './apiSlice';
import { RootState } from './store';

export interface commonState {
  selector: 'main';
  secret: string;
  user: User | null;
  feed: { flag: boolean } & InstaFeeds;
  newsletter: { flag: boolean; email: string };
  signup: { flag: boolean; isSign: boolean };
}

export const initialCommonState: commonState = {
  selector: 'main',
  secret: '',
  user: null,
  feed: {
    flag: false,
    id: -1,
    media_type: 'IMAGE',
    media_url: `${process.env.REACT_APP_SERVER_URL}/files/loading.png`,
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
    setSelector: (state, action: { payload: commonState['selector'] }) => {
      state.selector = action.payload;
    },
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
    closeFeed: (state, action: {}) => {
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
    closeNewsletter: (state, action: {}) => {
      bodyScrollDisableHandler(false);
      state.newsletter = initialCommonState.newsletter;
    },
    showSignup: (state, action: {}) => {
      bodyScrollDisableHandler(true);
      state.signup.flag = true;
    },
    closeSignup: (state, action: {}) => {
      bodyScrollDisableHandler(false);
      state.signup = initialCommonState.signup;
    },
  },
});

const reducer = slice.reducer;
export default reducer;
export const {
  setUser,
  setSelector,
  setSecret,
  showFeed,
  closeFeed,
  showNewsletter,
  closeNewsletter,
  showSignup,
  closeSignup,
} = slice.actions;
export const selectCommon = (state: RootState) => state.common;
export const selectUser = (state: RootState) => state.common.user;
export const selectSelector = (state: RootState) => state.common.selector;
export const selectSecret = (state: RootState) => state.common.secret;
export const selectFeed = (state: RootState) => state.common.feed;
export const selectNewsletter = (state: RootState) => state.common.newsletter;
export const selectSignup = (state: RootState) => state.common.signup;
