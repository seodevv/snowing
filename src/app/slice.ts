import { createSlice } from '@reduxjs/toolkit';
import { InstaFeeds } from './apiSlice';
import { RootState } from './store';

export interface commonState {
  feed: { flag: boolean } & InstaFeeds;
  newsletter: { flag: boolean; email: string };
}

export const initialCommonState: commonState = {
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
};

const slice = createSlice({
  name: 'common',
  initialState: initialCommonState,
  reducers: {
    showFeed: (state, action: { payload: InstaFeeds }) => {
      const body = document.querySelector('body') as HTMLBodyElement;
      body.style.overflow = 'hidden';
      state.feed = {
        flag: true,
        ...action.payload,
      };
    },
    closeFeed: (state, action: {}) => {
      const body = document.querySelector('body') as HTMLBodyElement;
      body.style.overflow = 'unset';
      state.feed = initialCommonState.feed;
    },
    showNewsletter: (state, action: { payload: string }) => {
      const body = document.querySelector('body') as HTMLBodyElement;
      body.style.overflow = 'hidden';
      state.newsletter = {
        flag: true,
        email: action.payload,
      };
    },
    closeNewsletter: (state, action: {}) => {
      const body = document.querySelector('body') as HTMLBodyElement;
      body.style.overflow = 'unset';
      state.newsletter = initialCommonState.newsletter;
    },
  },
});

const reducer = slice.reducer;
export default reducer;
export const { showFeed, closeFeed, showNewsletter, closeNewsletter } =
  slice.actions;
export const selectCommon = (state: RootState) => state.common;
export const selectFeed = (state: RootState) => state.common.feed;
export const selectNewsletter = (state: RootState) => state.common.newsletter;
