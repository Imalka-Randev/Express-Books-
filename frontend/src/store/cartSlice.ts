import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from './bookSlice';

export interface CartItem {
  book: Book;
  type: 'buy' | 'rent';
  rentDays?: number; // Added to support rental duration
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Helper to load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const serializedState = localStorage.getItem('expressBooks_cart');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load cart from local storage", err);
    return [];
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  isOpen: false,
};

// Helper to save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
  try {
    const serializedState = JSON.stringify(items);
    localStorage.setItem('expressBooks_cart', serializedState);
  } catch (err) {
    console.error("Could not save cart to local storage", err);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      // Check if book is already in cart, if so, update its type, otherwise push new item
      const existingIndex = state.items.findIndex(item => item.book._id === action.payload.book._id);
      if (existingIndex >= 0) {
        state.items[existingIndex].type = action.payload.type;
        // Optionally update other fields if they were passed
        Object.assign(state.items[existingIndex], action.payload);
      } else {
        state.items.push(action.payload);
      }
      saveCartToStorage(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      // action.payload is the book._id
      state.items = state.items.filter(item => item.book._id !== action.payload);
      saveCartToStorage(state.items);
    },
    toggleItemType: (state, action: PayloadAction<string>) => {
      // action.payload is the book._id
      const item = state.items.find(i => i.book._id === action.payload);
      if (item) {
        item.type = item.type === 'buy' ? 'rent' : 'buy';
        if (item.type === 'rent' && !item.rentDays) {
          item.rentDays = 7; // default rent days
        }
        saveCartToStorage(state.items);
      }
    },
    updateRentDays: (state, action: PayloadAction<{ id: string; days: number }>) => {
      const item = state.items.find(i => i.book._id === action.payload.id);
      if (item && item.type === 'rent') {
        item.rentDays = action.payload.days;
        saveCartToStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    }
  },
});

export const { setCartOpen, addItem, removeItem, toggleItemType, updateRentDays, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
