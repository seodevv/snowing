import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
  devTools: process.env.REACT_APP_TYPE === 'development' ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
