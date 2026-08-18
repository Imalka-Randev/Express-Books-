import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// 1. Define the shape of our User data using TypeScript
interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

// 2. Define the shape of our Redux Auth State
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// 3. Set the default values when the app first opens
const storedUser = localStorage.getItem('user');
const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
};

// 4. Create the Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // REDUCER: The logic that runs when the 'loginSuccess' action ticket arrives
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    
    // REDUCER: The logic that runs when the 'logout' action ticket arrives
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

// 5. Export the actions and the reducer
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;