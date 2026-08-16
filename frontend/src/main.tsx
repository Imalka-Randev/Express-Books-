import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 1. Import the plumbing and the store
import { Provider } from 'react-redux'
import { store } from './store/store'

import { ThemeProvider } from './context/ThemeContext';

import './i18n';//for language change

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);