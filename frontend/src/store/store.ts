import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// These types help TypeScript understand our complete Store structure
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;