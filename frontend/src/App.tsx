import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import BookDetailPage from './pages/BookDetailPage';
import Layout from './components/layout/Layout';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibrary } from './store/librarySlice';
import { type RootState, type AppDispatch } from './store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchLibrary());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <BrowserRouter>
      <div className="font-body-md">
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          
          {/* Main App Routes wrapped in Layout (Navbar included) */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/book/:id" element={<Layout><BookDetailPage /></Layout>} />
          
          {/* Fallback routes for other nav items for now */}
          <Route path="/search" element={<Layout><div className="text-center mt-24">Search Coming Soon</div></Layout>} />
          <Route path="/library" element={<Layout><div className="text-center mt-24">Library Coming Soon</div></Layout>} />
          <Route path="/community" element={<Layout><div className="text-center mt-24">Community Coming Soon</div></Layout>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;