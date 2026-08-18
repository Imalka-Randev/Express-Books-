import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from './cartSlice';
import apiClient from '../api/axiosConfig';
import { type RootState } from './store';

interface LibraryState {
  purchasedBooks: any[]; // Changed from CartItem[] because backend populates book details
  rentedBooks: { book: any; dueDate: string }[];
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
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) return rejectWithValue('No token found');

      const response = await apiClient.get('/library', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch library');
    }
  }
);

export const checkoutLibrary = createAsyncThunk(
  'library/checkoutLibrary',
  async (items: CartItem[], { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) return rejectWithValue('No token found');

      // Separate into purchased and rented
      const purchasedBooks = items.filter(i => i.type === 'buy').map(i => i.book._id);
      const rentedBooks = items.filter(i => i.type === 'rent').map(i => ({
        bookId: i.book._id,
        rentDays: i.rentDays || 7
      }));

      const response = await apiClient.post('/library/checkout', 
        { purchasedBooks, rentedBooks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return response.data; // Will re-fetch or rely on the returned data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to checkout');
    }
  }
);

export const extendRentalAction = createAsyncThunk(
  'library/extendRental',
  async ({ bookId, daysToExtend }: { bookId: string, daysToExtend: number }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) return rejectWithValue('No token found');

      const response = await apiClient.post('/library/extend', 
        { bookId, daysToExtend },
        { headers: { Authorization: `Bearer ${token}` } }
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
