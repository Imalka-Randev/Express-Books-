import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/axiosConfig';

export interface Book {
  _id: string;
  title: string;
  author: string;
  synopsis: string;
  buyPrice: number;
  rentPrice: number;
  formatsAvailable: string[];
  genres: string[];
  publishedDate: string;
  deliveryInfo: string;
  coverImageUrl: string;
  averageRating: number;
}

interface BookState {
  books: Book[];
  currentBook: Book | null;
  isLoading: boolean;
  isCurrentBookLoading: boolean;
  error: string | null;
}

const initialState: BookState = {
  books: [],
  currentBook: null,
  isLoading: false,
  isCurrentBookLoading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (search: string | undefined, { rejectWithValue }) => {
    try {
      const query = search ? `?search=${search}` : '';
      const response = await apiClient.get(`/books${query}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch books');
    }
  }
);

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/books/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch book details');
    }
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchBooks
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // fetchBookById
      .addCase(fetchBookById.pending, (state) => {
        state.isCurrentBookLoading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.isCurrentBookLoading = false;
        state.currentBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.isCurrentBookLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookSlice.reducer;
