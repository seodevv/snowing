import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import reducer from './slice';

const store = configureStore({
  reducer: {
    common: reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
  devTools: process.env.REACT_APP_TYPE === 'development' ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
