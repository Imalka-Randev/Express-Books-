import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from './cartSlice';

interface LibraryState {
  purchasedBooks: CartItem[];
  rentedBooks: CartItem[];
}

const loadLibraryFromStorage = (): LibraryState => {
  try {
    const serializedState = localStorage.getItem('expressBooks_library');
    if (serializedState === null) {
      return { purchasedBooks: [], rentedBooks: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load library from local storage", err);
    return { purchasedBooks: [], rentedBooks: [] };
  }
};

const initialState: LibraryState = loadLibraryFromStorage();

const saveLibraryToStorage = (state: LibraryState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('expressBooks_library', serializedState);
  } catch (err) {
    console.error("Could not save library to local storage", err);
  }
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addItemsToLibrary: (state, action: PayloadAction<CartItem[]>) => {
      const items = action.payload;
      
      items.forEach(item => {
        if (item.type === 'buy') {
          // Check if already purchased to prevent duplicates
          if (!state.purchasedBooks.find(b => b.book._id === item.book._id)) {
            state.purchasedBooks.push(item);
          }
        } else if (item.type === 'rent') {
          // Check if already rented
          const existingRent = state.rentedBooks.find(b => b.book._id === item.book._id);
          if (existingRent) {
            existingRent.rentDays = (existingRent.rentDays || 7) + (item.rentDays || 7);
          } else {
            state.rentedBooks.push(item);
          }
        }
      });
      
      saveLibraryToStorage(state);
    }
  },
});

export const { addItemsToLibrary } = librarySlice.actions;
export default librarySlice.reducer;
