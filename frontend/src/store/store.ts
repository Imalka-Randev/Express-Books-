import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import bookReducer from './bookSlice';
import cartReducer from './cartSlice';
import libraryReducer from './librarySlice';
import { injectStore } from '../api/axiosConfig';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    cart: cartReducer,
    library: libraryReducer,
  },
});

injectStore(store);

// These types help TypeScript understand our complete Store structure
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;