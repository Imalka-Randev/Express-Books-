import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { CartItem } from './cartSlice';
import apiClient from '../api/axiosConfig';

import type { Book } from './bookSlice';

interface LibraryState {
  purchasedBooks: Book[]; 
  rentedBooks: { book: Book; dueDate: string }[];
  isLoading: boolean;
  error: string | null;
}

const initialState: LibraryState = {
  purchasedBooks: [],
  rentedBooks: [],
  isLoading: false,
  error: null
};

// Async Thunks
export const fetchLibrary = createAsyncThunk(
  'library/fetchLibrary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/library');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch library');
    }
  }
);

export const checkoutLibrary = createAsyncThunk(
  'library/checkoutLibrary',
  async (
    payload: { items: CartItem[]; amount: number }, 
    { rejectWithValue }
  ) => {
    try {
      const { items, amount } = payload;

      // 1. Create Payment Intent
      const intentPayload = items.map(i => ({
        bookId: i.book._id,
        type: i.type,
        rentDays: i.rentDays
      }));
      
      const intentRes = await apiClient.post('/payment/create-intent', 
        { items: intentPayload, amount }
      );
      
      const paymentIntentId = intentRes.data.paymentIntentId;

      // 2. Separate into purchased and rented for checkout endpoint
      const purchasedBooks = items.filter(i => i.type === 'buy').map(i => i.book._id);
      const rentedBooks = items.filter(i => i.type === 'rent').map(i => ({
        bookId: i.book._id,
        rentDays: i.rentDays || 7
      }));

      // 3. Confirm Checkout with Intent ID
      const response = await apiClient.post('/library/checkout', 
        { purchasedBooks, rentedBooks, paymentIntentId }
      );
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to checkout');
    }
  }
);

export const extendRentalAction = createAsyncThunk(
  'library/extendRental',
  async ({ bookId, daysToExtend }: { bookId: string, daysToExtend: number }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/library/extend', 
        { bookId, daysToExtend }
      );
      
      return { bookId, newDueDate: response.data.newDueDate };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to extend rental');
    }
  }
);

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchLibrary
    builder.addCase(fetchLibrary.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchLibrary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.purchasedBooks = action.payload.purchasedBooks;
      state.rentedBooks = action.payload.rentedBooks;
    });
    builder.addCase(fetchLibrary.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // extendRental
    builder.addCase(extendRentalAction.fulfilled, (state, action) => {
      const { bookId, newDueDate } = action.payload;
      const rentItem = state.rentedBooks.find(r => r.book._id === bookId);
      if (rentItem) {
        rentItem.dueDate = newDueDate;
      }
    });
  }
});

export default librarySlice.reducer;
