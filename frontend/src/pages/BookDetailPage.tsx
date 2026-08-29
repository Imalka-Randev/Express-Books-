import { type FC, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../store/store';
import { fetchBookById, fetchBooks } from '../store/bookSlice';

import BookGallery from '../components/book/BookGallery';
import BookInfo from '../components/book/BookInfo';
import BookReviews from '../components/book/BookReviews';
import RelatedBooks from '../components/book/RelatedBooks';
import StandardPayment from '../components/payment/StandardPayment';
import RentExtensionPayment from '../components/payment/RentExtensionPayment';

const BookDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const defaultPaymentType = location.state?.defaultPaymentType || 'rent';

  const { currentBook, isCurrentBookLoading, error, books } = useSelector(
    (state: RootState) => state.books
  );
  
  const { purchasedBooks, rentedBooks } = useSelector((state: RootState) => state.library);
  
  const [showExtension, setShowExtension] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));
    }
    // Fetch all books if we don't have them yet (for the related books section)
    if (books.length === 0) {
      dispatch(fetchBooks(undefined));
    }
  }, [dispatch, id, books.length]);

  if (isCurrentBookLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-primary dark:border-primary-fixed border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !currentBook) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <span className="material-symbols-outlined text-error text-5xl">error</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-surface">Book not found</h2>
        <p className="text-gray-600 dark:text-surface-variant">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-primary dark:bg-primary-fixed text-white dark:text-on-primary-fixed rounded-lg font-bold"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  // Find books by same author or genre
  const relatedBooks = [...books]
    .filter((b) => b._id !== currentBook._id)
    .sort((a, b) => {
      // Prioritize same author
      if (a.author === currentBook.author && b.author !== currentBook.author) return -1;
      if (a.author !== currentBook.author && b.author === currentBook.author) return 1;
      
      // Then prioritize same genre
      const aHasGenre = a.genres?.some(g => currentBook.genres?.includes(g));
      const bHasGenre = b.genres?.some(g => currentBook.genres?.includes(g));
      if (aHasGenre && !bHasGenre) return -1;
      if (!aHasGenre && bHasGenre) return 1;
      
      return 0.5 - Math.random();
    })
    .slice(0, 6);

  return (
    <main className="flex-1 p-4 pt-24 md:p-12 md:pt-28 max-w-7xl mx-auto w-full flex flex-col gap-12">
      
      {/* Back Button */}
      <div className="w-full flex items-center mb-[-24px]">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed transition-colors font-bold text-sm uppercase tracking-wider"
        >
          <span className="material-symbols-outlined">arrow_back</span> Back
        </button>
      </div>

      {/* Top Section: Hero Gallery & Details */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        <BookGallery coverImage={currentBook.coverImageUrl} title={currentBook.title} />
        <BookInfo book={currentBook} />
      </section>

      {/* Payment Section Conditionally Rendered */}
      {(() => {
        const isOwned = purchasedBooks.some(p => p._id === currentBook._id || (p.book && p.book._id === currentBook._id));
        const rentedItem = rentedBooks.find(r => r.book._id === currentBook._id);
        const isRented = !!rentedItem;

        if (isOwned) {
          return (
            <div className="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 p-6 rounded-2xl flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
              <div>
                <h3 className="font-bold text-lg">You own this book!</h3>
                <p className="text-sm opacity-80">It is available in your private library.</p>
              </div>
            </div>
          );
        }

        if (isRented) {
          const dueDate = new Date(rentedItem.dueDate);
          return (
            <div className="flex flex-col gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
                  <div>
                    <h3 className="font-bold text-lg">You are currently renting this book.</h3>
                    <p className="text-sm opacity-80">Due date: {dueDate.toLocaleDateString()}</p>
                  </div>
                </div>
                {!showExtension && (
                  <button 
                    onClick={() => setShowExtension(true)}
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors"
                  >
                    Extend Due Date
                  </button>
                )}
              </div>
              
              {showExtension && (
                <RentExtensionPayment 
                  bookId={currentBook._id} 
                  onSuccess={() => setShowExtension(false)} 
                  onCancel={() => setShowExtension(false)}
                />
              )}
            </div>
          );
        }

        return <StandardPayment book={currentBook} defaultPaymentType={defaultPaymentType} />;
      })()}

      <BookReviews />
      <RelatedBooks books={relatedBooks} />
      
    </main>
  );
};

export default BookDetailPage;
