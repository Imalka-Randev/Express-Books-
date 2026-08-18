import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../store/store';
import { fetchBooks } from '../store/bookSlice';

export const useHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, isLoading, error } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    // Fetch books when the component mounts
    dispatch(fetchBooks(undefined));
  }, [dispatch]);

  const handleSearch = (searchQuery: string) => {
    dispatch(fetchBooks(searchQuery));
  };

  const handleBookAction = (bookId: string) => {
    // In the future, this might navigate to a book detail page or open a modal
    console.log(`Action triggered for book ID: ${bookId}`);
  };

  return {
    books,
    isLoading,
    error,
    handleSearch,
    handleBookAction
  };
};
