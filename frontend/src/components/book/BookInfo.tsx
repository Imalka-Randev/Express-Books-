import { type FC } from 'react';
import { type Book } from '../../store/bookSlice';
import CartButton from '../ui/CartButton';

interface BookInfoProps {
  book: Book;
}

const BookInfo: FC<BookInfoProps> = ({ book }) => {

  return (
    <div className="lg:col-span-7 flex flex-col h-full gap-6">
      {/* Title & Author Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="font-headline-lg text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {book.title}
          </h1>
          <p className="font-title-md text-xl text-gray-600 dark:text-gray-300 font-medium">
            by {book.author}
          </p>
        </div>
        <CartButton 
          book={book} 
          type="buy" 
          iconSize={22}
          className="w-12 h-12 flex-shrink-0 bg-white dark:bg-[#112240] border border-gray-200 dark:border-white/10 rounded-full shadow-md hover:scale-110 active:scale-95 mt-1" 
        />
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-1">
        <div className="flex text-primary dark:text-primary-fixed">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              {i < Math.floor(book.averageRating || 5) ? 'star' : 'star_half'}
            </span>
          ))}
        </div>
        <span className="text-gray-600 dark:text-gray-300 font-label-md ml-2 font-medium">
          {book.averageRating || '4.8'} ({book.totalReviews ? book.totalReviews.toLocaleString() : '0'} reviews)
        </span>
      </div>

      {/* Synopsis */}
      <div className="font-body-md text-lg text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed flex-1">
        <p>{book.synopsis}</p>

        {/* Extra Book Details to balance the layout */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Product Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400 block mb-1">Publisher</span>
              <span className="font-medium text-gray-900 dark:text-white">{book.publisher || 'Express Publishing House'}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400 block mb-1">Publication Date</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400 block mb-1">Print Length</span>
              <span className="font-medium text-gray-900 dark:text-white">{book.pageCount || 300} pages</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400 block mb-1">Language</span>
              <span className="font-medium text-gray-900 dark:text-white">{book.language || 'English'}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400 block mb-1">ISBN</span>
              <span className="font-medium text-gray-900 dark:text-white">{book.isbn || '978-0-00-000000-0'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
